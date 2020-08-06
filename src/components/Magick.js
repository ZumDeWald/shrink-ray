import { execute, buildInputFile } from "wasm-imagemagick";

//ImageMagick
async function Magick(file, rendition) {
  let commandOptions = [];
  let commandString = ``;

  if (rendition.resize !== "off" && !!rendition.reduce) {
    commandString = `convert inputImage.${rendition.fileType} -resize ${rendition.resize} -quality 60 -colors 256 -depth 8 -strip final_v${rendition.position}.${rendition.fileType}`;
  } else if (rendition.resize !== "off" && !rendition.reduce) {
    commandString = `convert inputImage.${rendition.fileType} -resize ${rendition.resize} final_v${rendition.position}.${rendition.fileType}`;
  } else if (rendition.resize === "off" && !!rendition.reduce) {
    commandString = `convert inputImage.${rendition.fileType} -quality 60 -colors 256 -depth 8 -strip final_v${rendition.position}.${rendition.fileType}`;
  } else {
    throw new Error(
      `No processing given for rendition ${rendition.position} of ${file.name}, please refresh and try again`
    );
  }

  commandOptions.push(commandString);

  const { outputFiles, exitCode, stderr } = await execute({
    inputFiles: [
      await buildInputFile(
        URL.createObjectURL(file),
        `inputImage.${rendition.fileType}`
      ),
    ],
    commands: commandOptions,
  });

  if (exitCode) {
    alert(`There was an error with the command: ${stderr.join("\n")}`);
  } else {
    return {
      extensionlessFileName: rendition.fileName,
      fileType: rendition.fileType,
      processedImages: [...outputFiles],
    };
  }
}

export default Magick;

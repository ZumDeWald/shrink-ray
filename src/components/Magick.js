import { execute, buildInputFile } from "wasm-imagemagick";

//ImageMagick
async function Magick(file, rendition) {
  let commandOptions = [];
  let commandString = ``;

  if (rendition.resize !== "off") {
    commandString = `convert inputImage.${rendition.fileType} -resize ${rendition.resize}`;
  }

  if (!!rendition.reduce) {
    commandString = commandString + `-quality 60 -colors 256 -depth 8 -strip`;
  }

  commandString += `final_v${rendition.position}.${rendition.fileType}`;

  commandOptions.push(commandString);

  // commandOptionParams.forEach((param, i) => {
  //   commandOptions.push(
  //     `convert inputImage.${rendition.fileType} -resize ${param.size} -quality ${param.quality} -colors 256 -depth 8 -strip final_v${i}.${rendition.fileType}`
  //   );
  // });

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
      originalFileName: file.name,
      fileType: rendition.fileType,
      processedImages: [...outputFiles],
    };
  }
}

export default Magick;

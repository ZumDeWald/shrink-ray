import { execute, buildInputFile } from "wasm-imagemagick";

//ImageMagick
async function Magick(file, rendition, index) {
  let commandOptions = [];
  let commandString = ``;
  let hasResize = false;
  let hasReduce = false;
  let outputFileName = "";

  if (rendition.resize !== "off" && !!rendition.reduce) {
    hasResize = true;
    hasReduce = true;
    commandString = `convert inputImage.${rendition.fileType} -resize ${rendition.resize} -quality 60 -colors 256 -depth 8 -strip final_v${index}.${rendition.fileType}`;
  } else if (rendition.resize !== "off" && !rendition.reduce) {
    hasResize = true;
    commandString = `convert inputImage.${rendition.fileType} -resize ${rendition.resize} final_v${index}.${rendition.fileType}`;
  } else if (rendition.resize === "off" && !!rendition.reduce) {
    hasReduce = true;
    commandString = `convert inputImage.${rendition.fileType} -quality 60 -colors 256 -depth 8 -strip final_v${index}.${rendition.fileType}`;
  } else {
    throw new Error(
      `No processing given for rendition ${index} of ${file.name}, please refresh and try again`
    );
  }

  if (!!hasResize && !!hasReduce) {
    outputFileName = `${rendition.fileName}_${rendition.resize}_shrunk`;
  } else if (!hasResize && !!hasReduce) {
    outputFileName = `${rendition.fileName}_shrunk`;
  } else if (!!hasResize && !hasReduce) {
    outputFileName = `${rendition.fileName}_${rendition.resize}`;
  } else {
    outputFileName = rendition.fileName;
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
      extensionlessFileName: outputFileName,
      fileType: rendition.fileType,
      processedImages: [...outputFiles],
    };
  }
}

export default Magick;

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
    alert(`No processing given for rendition ${rendition.position}`);
  }

  // commandString = `convert inputImage.${rendition.fileType} `;
  //
  // if (rendition.resize !== "off") {
  //   commandString.concat(`-resize ${rendition.resize}`);
  // }
  //
  // if (!!rendition.reduce) {
  //   commandString = commandString.concat(
  //     `-quality 60 -colors 256 -depth 8 -strip final_v${rendition.position}.${rendition.fileType}`
  //   );
  // } else {
  //   commandString = commandString.concat(
  //     `final_v${rendition.position}.${rendition.fileType}`
  //   );
  // }

  // commandString.concat(`final_v${rendition.position}.${rendition.fileType}`);
  console.log(commandString);
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
      extensionlessFileName: rendition.name,
      fileType: rendition.fileType,
      processedImages: [...outputFiles],
    };
  }
}

export default Magick;

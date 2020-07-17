import { execute, buildInputFile } from "wasm-imagemagick";

let commandOptions = [];

const checkFileType = typeToCheck => {
  //switch statement to preserve original file type for output file
  switch (typeToCheck) {
    case "image/png":
      return "png";
    case "image/jpg":
      return "jpg";
    case "image/jpeg":
      return "jpeg";
    default:
      return "jpg";
  }
};

//ImageMagick
async function Magick(file, commandOptionParams) {
  let fileType = checkFileType(file.type);

  commandOptionParams.forEach((param, i) => {
    commandOptions.push(
      `convert inputImage.${fileType} -resize ${param.size} -quality ${param.quality} -colors 256 -depth 8 -strip final_v${i}.${fileType}`
    );
  });

  const { outputFiles, exitCode, stderr } = await execute({
    inputFiles: [
      await buildInputFile(URL.createObjectURL(file), `inputImage.${fileType}`),
    ],
    commands: commandOptions,
  });
  if (exitCode) {
    alert(`There was an error with the command: ${stderr.join("\n")}`);
  } else {
    return {
      originalFileName: file.name,
      fileType: fileType,
      processedImages: [...outputFiles],
    };
  }
}

export default Magick;

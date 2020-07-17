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
      `convert inputImage.${fileType} -resize ${param.size} image${i}.${fileType}`,
      `convert image${i}.${fileType} -quality ${param.quality} -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 image${i}2.${fileType}`,
      `convert image${i}2.${fileType} -strip final_v${i}.${fileType}`
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

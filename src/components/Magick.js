import { execute, buildInputFile } from "wasm-imagemagick";

let commandOptions = ``;
let fileType = "jpg";

const checkFileType = typeToCheck => {
  //switch statement to preserve original file type for output file
  switch (typeToCheck) {
    case "image/png":
      return (fileType = "png");
    case "image/jpg":
      return (fileType = "jpg");
    case "image/jpeg":
      return (fileType = "jpeg");
    default:
      break;
  }
};

//ImageMagick
async function Magick(file, commandOptionParams) {
  checkFileType(file.type);

  commandOptionParams.forEach((param, i) => {
    commandOptions += `
    convert image1.png -resize ${param.size} image${i}_mod1.png
    convert image${i}_mod1.png -quality ${param.quality} final_v${i}.${fileType}
    `;
  });

  const { outputFiles, exitCode, stderr } = await execute({
    inputFiles: [await buildInputFile(URL.createObjectURL(file), "image1.png")],
    commands: [commandOptions],
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

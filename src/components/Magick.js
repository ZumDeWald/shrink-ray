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
async function Magick(file) {
  checkFileType(file.type);

  commandOptions = `
    convert image1.png -resize '1000' image2.png
    convert image2.png -quality '70' final_v1.${fileType}
    convert image1.png -resize '500' image3.png
    convert image3.png -quality '45' final_v2.${fileType}
  `;

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

import { execute, buildInputFile } from "wasm-imagemagick";
import JSZip from "jszip";

//switch statement to preserve original file type for output file
const checkFileType = typeToCheck => {
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
async function Magick(file) {
  //Find and save original file type for output file
  let fileType = checkFileType(file.type);

  const { outputFiles, exitCode, stderr } = await execute({
    inputFiles: [await buildInputFile(URL.createObjectURL(file), "image1.png")],
    commands: [
      `
        convert image1.png -resize '1000' image2.png
        convert image2.png -quality '70' final_v1.${fileType}
        convert image1.png -resize '500' image3.png
        convert image3.png -quality '45' final_v2.${fileType}
      `,
    ],
  });
  if (exitCode) {
    alert(`There was an error with the command: ${stderr.join("\n")}`);
  } else {
    //Remove file extension from original file name
    const extensionRegExp = /\.(jpe?g|png)/i;
    let extensionlessName = file.name.replace(extensionRegExp, "");

    //Create and attache downloadable zip file
    let downloadLink = document.getElementById("download-link");

    let zip = new JSZip();

    let zipFolder = zip.folder("processed");

    zipFolder.file(
      `${extensionlessName}_v1.${fileType}`,
      outputFiles.find(f => f.name === `final_v1.${fileType}`).blob
    );

    zipFolder.file(
      `${extensionlessName}_v2.${fileType}`,
      outputFiles.find(f => f.name === `final_v2.${fileType}`).blob
    );

    zip.generateAsync({ type: "blob" }).then(blob => {
      let imageBlobURL = URL.createObjectURL(blob);
      downloadLink.href = imageBlobURL;
    });
  }
}

export default Magick;

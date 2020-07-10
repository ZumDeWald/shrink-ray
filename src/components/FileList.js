import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop.js";
import { execute, buildInputFile, loadImageElement } from "wasm-imagemagick";
import JSZip from "jszip";

const FileList = ({ setImageProcessed }) => {
  const [formats] = useState(["jpg", "jpeg", "png"]);

  const [files, setFiles] = useState([]);

  //switch to help set original file type to output file
  const checkFileType = typeToCheck => {
    switch (typeToCheck) {
      case "image/png":
        return "png";
      case "image/jpg":
        return "jpg";
      case "image.jpeg":
        return "jpeg";
      default:
        return;
    }
  };

  //ImageMagick
  async function magick(file) {
    let fileType = checkFileType(file.type);

    const { outputFiles, exitCode, stderr } = await execute({
      inputFiles: [
        await buildInputFile(URL.createObjectURL(file), "image1.png"),
      ],
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
      //Push first output image to the output-image
      await loadImageElement(
        outputFiles.find(f => f.name === `final_v1.${fileType}`),
        document.getElementById("output-image")
      );

      //Trigger image preview / download display
      setImageProcessed(true);

      //Create and attache downloadable zip file
      let downloadLink = document.getElementById("download-link");

      let zip = new JSZip();

      let zipFolder = zip.folder("processed");

      zipFolder.file(
        `${file.name}_v1.${fileType}`,
        outputFiles.find(f => f.name === `final_v1.${fileType}`).blob
      );

      zipFolder.file(
        `${file.name}_v2.${fileType}`,
        outputFiles.find(f => f.name === `final_v2.${fileType}`).blob
      );

      zip.generateAsync({ type: "blob" }).then(blob => {
        let imageBlobURL = URL.createObjectURL(blob);
        downloadLink.href = imageBlobURL;
      });
    }
  }

  const handleDropProp = passedFiles => {
    //Empty array, push new file names here before adding to main fileList
    //This will just hold names of files to display
    let fileList = [];

    //Change passedFiles into array
    let newFiles = [...passedFiles];

    //Check if acceptable file type in formats array
    if (
      formats &&
      newFiles.some(
        file =>
          !formats.some(format =>
            file.name.toLowerCase().endsWith(format.toLowerCase())
          )
      )
    ) {
      alert(
        `Only following file formats are acceptable: ${formats.join(", ")}`
      );
      return;
    }

    for (let i = 0; i < newFiles.length; i++) {
      if (!newFiles[i].name) return;
      fileList.push(newFiles[i].name);
    }

    setFiles(files => files.concat(fileList));

    //Trying the magick
    magick(newFiles[0]);
  };

  return (
    <DragAndDrop handleDropProp={handleDropProp}>
      <ul id="drop-zone">
        <li className="no-bg">The Drop Zone</li>
        {files.length > 0 &&
          files.map((file, i) => <li key={`file ${i}`}>{file}</li>)}
      </ul>
    </DragAndDrop>
  );
};

export default FileList;

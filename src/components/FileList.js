import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop.js";
import {
  execute,
  buildInputFile,
  loadImageElement,
  asOutputFile,
} from "wasm-imagemagick";
import JSZip from "jszip";

const FileList = ({ setImageProcessed }) => {
  const [formats, setFormats] = useState(["jpg", "jpeg", "png"]);

  const [files, setFiles] = useState([]);

  async function magick(file) {
    const { outputFiles, exitCode, stderr } = await execute({
      inputFiles: [
        await buildInputFile(URL.createObjectURL(file), "image1.png"),
      ],
      commands: `
        convert image1.png -resize '1000' image2.png
        convert image2.png -quality '70' final.jpg
      `,
    });
    if (exitCode) {
      alert(`There was an error with the command: ${stderr.join("\n")}`);
    } else {
      await loadImageElement(
        outputFiles.find(f => f.name === "final.jpg"),
        document.getElementById("output-image")
      );

      setImageProcessed(true);

      let downloadLink = document.getElementById("download-link");

      let zip = new JSZip();

      let zipFolder = zip.folder("processed");

      zipFolder.file(
        `${file.name}_out.jpg`,
        outputFiles.find(f => f.name === "final.jpg").blob
      );

      zip.generateAsync({ type: "blob" }).then(blob => {
        let imageBlobURL = URL.createObjectURL(blob);
        downloadLink.href = imageBlobURL;
      });
    }
  }

  const handleDropProp = passedFiles => {
    //Existing file list
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

    //Display first image
    // if (!!newFiles.length) {
    //   document.querySelector("#test-image").src = URL.createObjectURL(newFiles[0])
    // };

    //Trying the magick
    magick(newFiles[0]);
  };

  return (
    <DragAndDrop handleDropProp={handleDropProp}>
      {files.length > 0 ? (
        <ul id="drop-zone">
          {files.map((file, i) => (
            <li key={`file ${i}`}>{file}</li>
          ))}
        </ul>
      ) : (
        <ul id="drop-zone">
          <li className="no-bg">The Drop Zone</li>
        </ul>
      )}
    </DragAndDrop>
  );
};

export default FileList;

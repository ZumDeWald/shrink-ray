import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop.js";
import { execute, buildInputFile, loadImageElement } from "wasm-imagemagick";

const FileList = ({ props }) => {
  const [formats, setFormats] = useState(["jpg", "jpeg", "png"]);

  const [files, setFiles] = useState([]);

  async function magick(file) {
    const { outputFiles, exitCode, stderr } = await execute({
      inputFiles: [
        await buildInputFile(URL.createObjectURL(file), "image1.png"),
      ],
      commands: `
        convert image1.png -resize '500' image2.png
        convert image2.png -quality '70' image3.jpg
      `,
    });
    if (exitCode) {
      alert(`There was an error with the command: ${stderr.join("\n")}`);
    } else {
      await loadImageElement(
        outputFiles.find(f => f.name === "image3.jpg"),
        document.getElementById("output-image")
      );
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
          <li class="no-bg">The Drop Zone</li>
        </ul>
      )}
    </DragAndDrop>
  );
};

export default FileList;

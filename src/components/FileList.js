import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop.js";
import { execute, buildInputFile, loadImageElement } from "wasm-imagemagick";

const FileList = ({ props }) => {
  const [formats, setFormats] = useState(["jpg", "jpeg", "png"]);

  const [files, setFiles] = useState([
    "nice.png",
    "veryCool.jpg",
    "thatPic.png",
    "thisPic.jpeg",
    "theOtherPic.jpg",
    "allTheCats.jpg",
    "catsWithBats.jpeg",
  ]);

  async function magick(file) {
    const { outputFiles, exitCode, stderr } = await execute({
      inputFiles: [
        await buildInputFile(URL.createObjectURL(file), "image1.png"),
      ],
      commands: `
        convert image1.png -bordercolor #ffee44 -background #eeff55 +polaroid image2.png
        convert image2.png -fill #997711 -tint 55 image3.jpg
      `,
    });
    if (exitCode) {
      alert(`There was an error with the command: ${stderr.join("\n")}`);
    } else {
      await loadImageElement(
        outputFiles.find(f => f.name === "image3.jpg"),
        document.getElementById("test-image")
      );
    }
  }

  const handleDropProp = passedFiles => {
    //Existing file list
    let fileList = JSON.parse(JSON.stringify(files));

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

    setFiles(fileList);

    //Display first image
    // if (!!newFiles.length) {
    //   document.querySelector("#test-image").src = URL.createObjectURL(newFiles[0])
    // };

    //Trying the magick
    magick(newFiles[0]);
  };

  return (
    <DragAndDrop handleDropProp={handleDropProp}>
      <ul id="drop-zone">
        {files.map((file, i) => (
          <li key={`file ${i}`}>{file}</li>
        ))}
      </ul>
    </DragAndDrop>
  );
};

export default FileList;

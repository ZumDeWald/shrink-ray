import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop.js";

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

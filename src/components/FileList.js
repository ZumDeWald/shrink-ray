import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop.js";

const FileList = ({ props }) => {
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
    let fileList = JSON.parse(JSON.stringify(files));
    for (let i = 0; i < passedFiles.length; i++) {
      if (!passedFiles[i].name) return;
      fileList.push(passedFiles[i].name);
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

import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop.js";
import Magick from "./Magick.js";

const FileList = ({ startTheMagick, setFilesDropped }) => {
  const [formats] = useState(["jpg", "jpeg", "png"]);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleDropProp = passedFiles => {
    //Empty array to add dropped file names for display in fileList
    let newFileList = [];

    //Change passedFiles into array
    let newFiles = [...passedFiles];

    setDroppedFiles([...droppedFiles, ...newFiles]);

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
      newFileList.push(newFiles[i].name);
    }

    setFileList(fileList => fileList.concat(newFileList));
    setFilesDropped(true);
  };

  if (!!startTheMagick) {
    //Trying the magick
    droppedFiles.forEach((file, i) => {
      Magick(file);

      //If last file then show as complete to user
      if (i === droppedFiles.length - 1) {
        setTimeout(() => {
          document.querySelector("#output-image").src =
            "https://p.kindpng.com/picc/s/79-791926_hook-check-mark-check-completed-finish-to-do.png";
          document
            .querySelector(".download-button")
            .classList.remove("inactive");
        }, 1000);
      }
    });
  }

  return (
    <DragAndDrop handleDropProp={handleDropProp}>
      <ul id="drop-zone">
        <li className="no-bg">The Drop Zone</li>
        {fileList.length > 0 &&
          fileList.map((file, i) => <li key={`file ${i}`}>{file}</li>)}
      </ul>
    </DragAndDrop>
  );
};

export default FileList;

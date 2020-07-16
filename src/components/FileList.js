import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop.js";
import Magick from "./Magick.js";

const FileList = ({ setImageProcessed }) => {
  const [formats] = useState(["jpg", "jpeg", "png"]);

  const [files, setFiles] = useState([]);

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
    Magick(newFiles[0]);

    //Trigger image preview / download display
    setImageProcessed(true);
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

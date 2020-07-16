import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop.js";
import Magick from "./Magick.js";
import JSZip from "jszip";

const FileList = ({ startTheMagick, setFilesDropped }) => {
  const [formats] = useState(["jpg", "jpeg", "png"]);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [commandOptionParams] = useState([
    { size: "1000", quality: "70" },
    { size: "500", quality: "50" },
  ]);

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
    //Create zip and find download link for attachment
    let zip = new JSZip();
    let zipFolder = zip.folder("processed");

    //Trying the magick
    droppedFiles.forEach((file, index) => {
      Magick(file, commandOptionParams)
        .then(({ originalFileName, processedImages, fileType }) => {
          //Remove file extension from original file name
          const extensionRegExp = /\.(jpe?g|png)/i;
          let extensionlessName = originalFileName.replace(extensionRegExp, "");

          for (let i = 0; i < commandOptionParams.length; i++) {
            zipFolder.file(
              `${extensionlessName}_v${i}.${fileType}`,
              processedImages.find(f => f.name === `final_v${i}.${fileType}`)
                .blob
            );
          }
        })
        .then(() => {
          //If last file then show as complete to user
          if (index === droppedFiles.length - 1) {
            let downloadLink = document.getElementById("download-link");

            zip.generateAsync({ type: "blob" }).then(blob => {
              let zipURL = URL.createObjectURL(blob);
              downloadLink.href = zipURL;
            });

            document.querySelector("#output-image").src =
              "https://p.kindpng.com/picc/s/79-791926_hook-check-mark-check-completed-finish-to-do.png";
            document
              .querySelector(".download-button")
              .classList.remove("inactive");
          }
        });
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

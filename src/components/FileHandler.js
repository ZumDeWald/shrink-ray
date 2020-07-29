import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop.js";
import Upload from "@spectrum-icons/illustrations/Upload";
import NotFound from "@spectrum-icons/illustrations/NotFound";
import {
  View,
  IllustratedMessage,
  Heading,
  Content,
} from "@adobe/react-spectrum";
// import Magick from "./Magick.js";
// import JSZip from "jszip";

const FileHandler = ({
  startTheMagick,
  setFilesDropped,
  handleDroppedFiles,
}) => {
  const [formats] = useState(["jpg", "jpeg", "png"]);
  const [fileCount, setFileCount] = useState(0);
  // const [fileList, setFileList] = useState([]);
  // const [commandOptionParams] = useState([
  //   { size: "100%", quality: "60" },
  //   { size: "75%", quality: "60" },
  //   { size: "500", quality: "60" },
  // ]);
  // const [progress, setProgress] = useState(new Set());
  // const [zip] = useState(new JSZip());
  // eslint-disable-next-line
  // const [zipFolder, setZipFolder] = useState(zip.folder("processed"));

  // const completeZip = () => {
  //   //Finalize zip and attach to the download button
  //   let downloadLink = document.getElementById("download-link");
  //
  //   zip.generateAsync({ type: "blob" }).then(blob => {
  //     let zipURL = URL.createObjectURL(blob);
  //     downloadLink.href = zipURL;
  //   });
  //
  //   //Change UI to show complete status
  //   document.querySelector("#output-image").src =
  //     "https://p.kindpng.com/picc/s/79-791926_hook-check-mark-check-completed-finish-to-do.png";
  //   document.querySelector(".download-button").classList.remove("ghost");
  // };

  const handleDropProp = passedFiles => {
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

    //Add new files to state
    newFiles.forEach(newFile => {
      if (fileCount < 5) {
        setFileCount(fileCount => (fileCount += 1));
        handleDroppedFiles(droppedFiles => {
          let copy = [...droppedFiles];
          copy.push(newFile);
          return copy;
        });
      } else {
        alert("Max of 5 files has been exceeded");
      }
    });

    //Empty array to add dropped file names for display in fileList
    // let newFileList = [];

    //Add new file names to fileList to display to user
    // for (let i = 0; i < newFiles.length; i++) {
    //   if (!newFiles[i].name) return;
    //   newFileList.push(newFiles[i].name);
    // }
    // setFileList(fileList => fileList.concat(newFileList));

    //Let the UI know we have some files that could be processed
    // setFilesDropped(true);
  };

  // if (!!startTheMagick) {
  //   //Activate the Magick!!
  //
  //   for (let fileCount = 0; fileCount < droppedFiles.length; fileCount++) {
  //     Magick(droppedFiles[fileCount], commandOptionParams).then(
  //       ({ originalFileName, fileType, processedImages }) => {
  //         // ^ "then" argument = object returned from Magick() destructured
  //         //Remove ".jp(e)g" or ".png" file extension from original file name
  //         const extensionRegExp = /\.(jpe?g|png)/i;
  //         let extensionlessName = originalFileName.replace(extensionRegExp, "");
  //
  //         //For every version created add it to the zip
  //         for (let i = 0; i < commandOptionParams.length; i++) {
  //           setZipFolder(zipFolder =>
  //             zipFolder.file(
  //               `${extensionlessName}_v${i}.${fileType}`,
  //               processedImages.find(f => f.name === `final_v${i}.${fileType}`)
  //                 .blob
  //             )
  //           );
  //
  //           setProgress(progress => {
  //             let newProgress = new Set(progress).add(
  //               `${originalFileName}_v${i}`
  //             );
  //             return (progress = newProgress);
  //           });
  //         }
  //       }
  //     );
  //   }
  // }

  //If last file then show as complete to user
  // if (
  //   droppedFiles.length > 0 &&
  //   progress.size === droppedFiles.length * commandOptionParams.length
  // ) {
  //   completeZip();
  // }

  return (
    <DragAndDrop handleDropProp={handleDropProp}>
      <View
        width="75vw"
        paddingY="10px"
        borderWidth="thick"
        borderColor="mid"
        borderRadius="medium"
      >
        {fileCount < 5 ? (
          <IllustratedMessage>
            <Upload />
            <Heading>Drop JPEG or PNG files here</Heading>
            <Content>Up to 5 files, 5Mb each</Content>
          </IllustratedMessage>
        ) : (
          <IllustratedMessage>
            <NotFound />
            <Heading>Limit of 5 files Reached</Heading>
            <Content>Refresh page to start a new list</Content>
          </IllustratedMessage>
        )}
      </View>
    </DragAndDrop>
  );
};

export default FileHandler;

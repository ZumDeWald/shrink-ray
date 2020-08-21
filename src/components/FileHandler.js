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

const FileHandler = ({
  startTheMagick,
  setFilesDropped,
  handleDroppedFiles,
}) => {
  const [formats] = useState(["jpg", "jpeg", "png"]);
  const [fileCount, setFileCount] = useState(0);

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
  };

  return (
    <>
      {fileCount < 5 ? (
        <DragAndDrop handleDropProp={handleDropProp}>
          <View
            width="75vw"
            paddingY="10px"
            borderWidth="thick"
            borderColor="mid"
            borderRadius="medium"
          >
            <IllustratedMessage>
              <Upload />
              <Heading>Drop JPEG or PNG files here</Heading>
              <Content>Up to 5 files, 5Mb each</Content>
            </IllustratedMessage>
          </View>
        </DragAndDrop>
      ) : (
        <div style={{ display: "inline-block", position: "relative" }}>
          <View
            width="75vw"
            paddingY="10px"
            borderWidth="thick"
            borderColor="mid"
            borderRadius="medium"
          >
            <IllustratedMessage>
              <NotFound />
              <Heading>Limit of 5 files Reached</Heading>
              <Content>Refresh page to start a new list</Content>
            </IllustratedMessage>
          </View>
        </div>
      )}
    </>
  );
};

export default FileHandler;

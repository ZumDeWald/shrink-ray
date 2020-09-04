import React, { useState, useEffect } from "react";
import DragAndDrop from "./DragAndDrop.js";
import Upload from "@spectrum-icons/illustrations/Upload";
import NotFound from "@spectrum-icons/illustrations/NotFound";
import Timeout from "@spectrum-icons/illustrations/Timeout";
import {
  View,
  IllustratedMessage,
  Heading,
  Content,
  Text,
} from "@adobe/react-spectrum";

const FileHandler = ({ droppedFiles, setDroppedFiles, progress }) => {
  const [formats] = useState(["jpg", "jpeg", "png"]);
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    setFileCount(droppedFiles.length);
  }, [droppedFiles, setFileCount]);

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

    //Add files to fileList
    let currentcount = fileCount;

    newFiles.forEach(newFile => {
      if (currentcount < 5) {
        setDroppedFiles(droppedFiles => {
          let copy = [...droppedFiles];
          copy.push(newFile);
          return copy;
        });
        currentcount += 1;
      } else {
        return alert("Max of 5 files has been exceeded");
      }
    });
  };

  return (
    <>
      {progress !== "hold" ? (
        <div style={{ display: "inline-block", position: "relative" }}>
          <View
            width="75vw"
            paddingY="10px"
            borderWidth="thick"
            borderColor="mid"
            borderRadius="medium"
          >
            <IllustratedMessage>
              <Timeout />
              <Heading>Processing Images</Heading>
              <Content>Choose Reset below to start a new batch</Content>
            </IllustratedMessage>
          </View>
        </div>
      ) : !!droppedFiles && droppedFiles.length < 5 ? (
        <DragAndDrop handleDropProp={handleDropProp}>
          <View
            width="75vw"
            paddingY="10px"
            borderWidth="thick"
            borderColor="mid"
            borderRadius="medium"
          >
            <IllustratedMessage UNSAFE_className="color-white">
              <Upload />
              <Heading UNSAFE_className="color-white">
                Drop JPEG or PNG files here
              </Heading>
              <Text>Up to 5 files, 5Mb each</Text>
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

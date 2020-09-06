import React, { useState, useEffect } from "react";
import DragAndDrop from "./DragAndDrop.js";
import Upload from "@spectrum-icons/illustrations/Upload";
import NotFound from "@spectrum-icons/illustrations/NotFound";
import Timeout from "@spectrum-icons/illustrations/Timeout";
import { View, IllustratedMessage, Heading, Text } from "@adobe/react-spectrum";

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
        <div className="drop-zone">
          <View
            width="75vw"
            paddingY="10px"
            borderWidth="thick"
            borderColor="mid"
            borderRadius="medium"
          >
            <IllustratedMessage UNSAFE_className="color-white">
              <Timeout />
              <Heading UNSAFE_className="color-white">
                Processing Images
              </Heading>
              <Text>Choose Reset below to start a new batch</Text>
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
        <div className="drop-zone">
          <View
            width="75vw"
            paddingY="10px"
            borderWidth="thick"
            borderColor="mid"
            borderRadius="medium"
          >
            <IllustratedMessage UNSAFE_className="color-white">
              <NotFound />
              <Heading UNSAFE_className="color-white">
                Limit of 5 files Reached
              </Heading>
              <Text>Refresh page to start a new list</Text>
            </IllustratedMessage>
          </View>
        </div>
      )}
    </>
  );
};

export default FileHandler;

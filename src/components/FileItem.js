import React, { useState, useEffect } from "react";
import {
  Flex,
  View,
  Well,
  Text,
  Divider,
  ActionButton,
  Heading,
} from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import Info from "@spectrum-icons/workflow/Info";
import Rendition from "./Rendition.js";
import ProcessFileName from "./ProcessFileName.js";
import Magick from "./Magick.js";

const FileItem = ({
  file,
  position,
  handleDroppedFiles,
  progress,
  setZipFolder,
}) => {
  const [fileInfo, setFileInfo] = useState({});

  //Get and store filename in state where it can be updated
  useEffect(() => {
    setFileInfo(ProcessFileName(file.name, file.type));
  }, [file]);

  const removeThisFile = () => {
    handleDroppedFiles(files => {
      let copy = [...files];
      copy.splice(position, 1);
      return copy;
    });
  };

  //Array of rendition objects
  const [renditions, setRenditions] = useState([]);

  useEffect(() => {
    if (renditions.length === 0 && !!fileInfo.type) {
      setRenditions([
        {
          //Default rendition
          position: 0,
          fileName: fileInfo.name,
          fileType: fileInfo.type,
          resize: "off",
          reduce: true,
        },
      ]);
    }
  }, [renditions, fileInfo]);

  const updateRenditions = (position, property, value) => {
    let newValue;
    value === "off" ? (newValue = "off") : (newValue = Number(value));
    let copy = [...renditions];
    copy[position][property] = newValue;
    setRenditions(copy);
  };

  const addRendition = () => {
    setRenditions(renditions =>
      renditions.concat({
        position: renditions.length,
        fileName: fileInfo.name,
        fileType: fileInfo.type,
        resize: "off",
        reduce: true,
      })
    );
  };

  const removeRendition = position => {
    let copy = [...renditions];
    copy.splice(position, 1);
    setRenditions(copy);
  };

  useEffect(() => {
    if (progress === "processing") {
      renditions.forEach((rendition, index) => {
        Magick(file, rendition).then(
          ({ extensionlessFileName, fileType, processedImages }) => {
            setZipFolder(zipFolder =>
              zipFolder.file(
                `${extensionlessFileName}_v${index}.${fileType}`,
                processedImages.find(
                  f => f.name === `final_v${index}.${fileType}`
                ).blob
              )
            );
          }
        );
      });
    }
  });

  return (
    <View width="100%" marginY="size-300">
      <Well>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          marginBottom="size-100"
        >
          <Heading level={2}>
            File: {`${fileInfo.name}.${fileInfo.type}`}
          </Heading>
          <ActionButton
            isDisabled={progress !== "hold"}
            onPress={removeThisFile}
          >
            Remove File
          </ActionButton>
        </Flex>

        {!!renditions &&
          renditions.map((rendition, i) => (
            <React.Fragment key={`${file.name} - ${i}`}>
              <Rendition
                data={rendition}
                position={i}
                updateSelf={updateRenditions}
                removeSelf={removeRendition}
                progress={progress}
              />
              <Divider size="S" />
            </React.Fragment>
          ))}

        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          marginTop="size-100"
        >
          {renditions.length < 5 ? (
            <ActionButton
              isQuiet
              aria-label="Add new rendition"
              onPress={addRendition}
              isDisabled={progress !== "hold"}
            >
              <Add size="S" />
              <Text>Add another rendition</Text>
            </ActionButton>
          ) : (
            <ActionButton
              isQuiet
              aria-label="Max renditions reached"
              isDisabled
            >
              <Info size="S" />
              <Text>Limited to 5 renditions per dropped file</Text>
            </ActionButton>
          )}
        </Flex>
      </Well>
    </View>
  );
};

export default FileItem;

import React, { useState, useEffect } from "react";
import {
  Flex,
  View,
  Well,
  Text,
  Divider,
  ActionButton,
} from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";
import Info from "@spectrum-icons/workflow/Info";
import FileName from "./FileName.js";
import Rendition from "./Rendition.js";
import ProcessFileName from "./ProcessFileName.js";
import Magick from "./Magick.js";

const FileItem = ({
  file,
  position,
  handleDroppedFiles,
  progress,
  setZipFolder,
  setFilesComplete,
  filesComplete,
}) => {
  const [fileInfo, setFileInfo] = useState({});

  //Separate and store filename and extension in state where it can be updated
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
  const [complete, setComplete] = useState(0);

  useEffect(() => {
    if (renditions.length === 0 && !!fileInfo.type) {
      setRenditions([
        {
          //Default rendition
          fileName: fileInfo.name,
          fileType: fileInfo.type,
          resize: "off",
          reduce: true,
        },
      ]);
    }
  }, [renditions, fileInfo]);

  useEffect(() => {
    if (renditions.length > 0 && complete === renditions.length) {
      setFilesComplete(filesComplete + 1);
      setComplete(NaN);
    }
  }, [renditions, complete, setComplete, filesComplete, setFilesComplete]);

  const updateRenditions = (renditionPosition, property, value) => {
    let newValue;
    value === "off" ? (newValue = "off") : (newValue = Number(value));
    if (newValue !== "off" && isNaN(newValue)) return;
    let copy = [...renditions];
    copy[renditionPosition][property] = newValue;
    setRenditions(copy);
  };

  const addRendition = () => {
    setRenditions(renditions =>
      renditions.concat({
        fileName: fileInfo.name,
        fileType: fileInfo.type,
        resize: "off",
        reduce: true,
      })
    );
  };

  const removeRendition = renditionPosition => {
    setRenditions(renditions => {
      let copy = [...renditions];
      copy.splice(renditionPosition, 1);
      return copy;
    });
  };

  const updateRenditionsFileName = () => {
    setRenditions(renditions => {
      let copy = [...renditions];
      copy.forEach(rendition => {
        rendition.fileName = fileInfo.name;
      });
      return copy;
    });
  };

  //Watch for the Magick to start
  useEffect(() => {
    if (progress === "processing") {
      //Filter out renditions that have no changes from original
      let finalRenditions = renditions.filter(
        rendition => !(rendition.resize === "off" && !rendition.reduce)
      );

      finalRenditions.forEach((rendition, index) => {
        Magick(file, rendition, index)
          .then(({ extensionlessFileName, fileType, processedImages }) => {
            setZipFolder(zipFolder =>
              zipFolder.file(
                `${extensionlessFileName}.${fileType}`,
                processedImages.find(
                  f => f.name === `final_v${index}.${fileType}`
                ).blob
              )
            );
          })
          .then(() => {
            setComplete(complete + 1);
          })
          .catch(err => {
            setComplete(complete + 1);
            console.error(err);
          });
      });
    }
  }, [progress, file, renditions, setZipFolder, complete]);

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
          <FileName
            fileInfo={fileInfo}
            setFileInfo={setFileInfo}
            updateRenditionsFileName={updateRenditionsFileName}
            progress={progress}
          />
          <ActionButton
            isDisabled={progress !== "hold"}
            onPress={removeThisFile}
          >
            Remove File
          </ActionButton>
        </Flex>

        {!!renditions &&
          renditions.map((rendition, i) => (
            <React.Fragment key={`${file.name} ${i}`}>
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

import React, { useState } from "react";
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

const FileItem = ({ file, position, handleDroppedFiles }) => {
  const removeThisFile = () => {
    handleDroppedFiles(files => {
      let copy = [...files];
      copy.splice(position, 1);
      return copy;
    });
  };

  //Handle Renditions
  const [renditions, setRenditions] = useState([
    {
      resize: 0,
      reduce: true,
    },
  ]);

  const updateRenditions = (position, property, value) => {
    let copy = [...renditions];
    copy[position][property] = value;
    setRenditions(copy);
  };

  const addRendition = () => {
    setRenditions(renditions =>
      renditions.concat({
        resize: 0,
        reduce: true,
      })
    );
  };

  const removeRendition = position => {
    let copy = [...renditions];
    copy.splice(position, 1);
    setRenditions(copy);
  };

  return (
    <View width="100%" marginY="size-600">
      <Well>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          marginBottom="size-100"
        >
          <Heading level={2}>File: {file.name}</Heading>
          <ActionButton onPress={removeThisFile}>Remove File</ActionButton>
        </Flex>

        {!!renditions &&
          renditions.map((rendition, i) => (
            <React.Fragment key={`${file.name} - ${i}`}>
              <Rendition
                name={file.name}
                data={rendition}
                position={i}
                updateSelf={updateRenditions}
                removeSelf={removeRendition}
              />
              <Divider size="S" />
            </React.Fragment>
          ))}

        <Flex
          direction="row"
          alignItems="center"
          justifyContent="start"
          width="100%"
          marginTop="size-100"
        >
          {renditions.length < 5 ? (
            <ActionButton
              isQuiet
              aria-label="Add new rendition"
              onPress={addRendition}
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

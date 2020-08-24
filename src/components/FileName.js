import React, { useState } from "react";
import { Heading, Text, TextField, ActionButton } from "@adobe/react-spectrum";

const FileName = ({
  fileInfo,
  setFileInfo,
  updateRenditionsFileName,
  progress,
}) => {
  const [editing, setEditing] = useState(false);

  const replaceSpaces = value => {
    let spaceFree = value.replace(" ", "_");
    setFileInfo({
      ...fileInfo,
      name: spaceFree,
    });
  };

  return (
    <>
      {!!editing ? (
        <Heading level={2}>
          <Text>
            File:{" "}
            <TextField
              width="size-1500"
              marginStart="size-100"
              type="text"
              onChange={value => {
                replaceSpaces(value);
              }}
              value={fileInfo.name}
              isQuiet
            />
          </Text>
          <Text>.{fileInfo.type}</Text>
          <ActionButton
            marginStart="size-100"
            onPress={() => {
              setEditing(false);
              updateRenditionsFileName();
            }}
          >
            Update
          </ActionButton>
        </Heading>
      ) : (
        <Heading level={2}>
          <Text>File:</Text>
          <Text marginStart="size-100"> {fileInfo.name}</Text>{" "}
          <Text>.{fileInfo.type}</Text>
          <ActionButton
            marginStart="size-100"
            isDisabled={progress !== "hold"}
            onPress={() => {
              setEditing(true);
            }}
          >
            Change
          </ActionButton>
        </Heading>
      )}
    </>
  );
};

export default FileName;

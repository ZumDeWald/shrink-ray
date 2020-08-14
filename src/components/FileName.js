import React, { useState } from "react";
import { Heading, Text, TextField, ActionButton } from "@adobe/react-spectrum";

const FileName = ({ fileInfo, setFileInfo, updateRenditionsFileName }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {!!editing ? (
        <Heading level={2}>
          <Text>
            File:{" "}
            <TextField
              width="size-1500"
              type="text"
              onChange={value => {
                setFileInfo({
                  ...fileInfo,
                  name: value,
                });
              }}
              value={fileInfo.name}
              isQuiet
            />
          </Text>{" "}
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
          <Text>File: {fileInfo.name}</Text> <Text>.{fileInfo.type}</Text>
          <ActionButton
            marginStart="size-100"
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

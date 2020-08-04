import React from "react";
import { Text, ActionButton } from "@adobe/react-spectrum";
import Images from "@spectrum-icons/workflow/Images";
import ImageAutoMode from "@spectrum-icons/workflow/ImageAutoMode";
import ImageCheck from "@spectrum-icons/workflow/ImageCheck";

const BatchButton = ({ progress, startTheMagick }) => {
  return (
    <>
      {progress === "hold" ? (
        <ActionButton aria-label="Process file" onPress={startTheMagick}>
          <Images size="S" />
          <Text>Run Batch</Text>
        </ActionButton>
      ) : progress === "processing" ? (
        <ActionButton aria-label="Process file" isDisabled>
          <ImageAutoMode size="S" />
          <Text>Processing</Text>
        </ActionButton>
      ) : (
        <ActionButton aria-label="Process file" isDisabled>
          <ImageCheck size="S" />
          <Text>Processing</Text>
        </ActionButton>
      )}
    </>
  );
};

export default BatchButton;

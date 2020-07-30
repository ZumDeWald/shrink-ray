import React from "react";
import { Text, ActionButton } from "@adobe/react-spectrum";
import Images from "@spectrum-icons/workflow/Images";
import ImageAutoMode from "@spectrum-icons/workflow/ImageAutoMode";

const BatchButton = ({ runBatch, setRunBatch }) => {
  return (
    <>
      {!runBatch ? (
        <ActionButton aria-label="Process file" onPress={setRunBatch}>
          <Images size="S" />
          <Text>Run Batch</Text>
        </ActionButton>
      ) : (
        <ActionButton aria-label="Process file" isDisabled>
          <ImageAutoMode size="S" />
          <Text>Processing</Text>
        </ActionButton>
      )}
    </>
  );
};

export default BatchButton;

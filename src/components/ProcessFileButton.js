import React from "react";
import { Text, ActionButton } from "@adobe/react-spectrum";
import ImageCheckedOut from "@spectrum-icons/workflow/ImageCheckedOut";
import ImageAutoMode from "@spectrum-icons/workflow/ImageAutoMode";
import CheckmarkCircle from "@spectrum-icons/workflow/CheckmarkCircle";

const ProcessFileButton = ({ progress, beginProcess }) => {
  return (
    <>
      {progress === "hold" ? (
        <ActionButton aria-label="Process file" onPress={beginProcess}>
          <ImageCheckedOut size="S" />
          <Text>Process this file</Text>
        </ActionButton>
      ) : progress === "processing" ? (
        <ActionButton aria-label="Process file" isDisabled>
          <ImageAutoMode size="S" />
          <Text>Processing</Text>
        </ActionButton>
      ) : (
        <ActionButton aria-label="Process file" isDisabled>
          <CheckmarkCircle size="S" />
          <Text>Complete!</Text>
        </ActionButton>
      )}
    </>
  );
};

export default ProcessFileButton;

import React, { useState } from "react";
import {
  Grid,
  Flex,
  Text,
  Switch,
  ActionButton,
  TextField,
} from "@adobe/react-spectrum";
import Back from "@spectrum-icons/workflow/Back";
import Delete from "@spectrum-icons/workflow/Delete";

const Rendition = ({ data, position, updateSelf, removeSelf, progress }) => {
  const [thisWidth, setThisWidth] = useState(500);

  const checkResize = () => {
    if (data.resize === "off") {
      return thisWidth;
    } else {
      return "off";
    }
  };

  const handleUpdateResize = value => {
    updateSelf(position, "resize", value);
    setThisWidth(value);
  };

  return (
    <Grid
      columns={["40px", "1fr", "1fr", "1fr", "40px"]}
      alignItems="center"
      alignContent="center"
      justifyContent="space-around"
      width="100%"
      minHeight="size-500"
      UNSAFE_style={{ backgroundColor: "#181c24" }}
    >
      <Back
        margin="size-100"
        size="S"
        UNSAFE_style={{ transform: "rotate(180deg)" }}
      />
      <Text>
        [file]
        {data.resize !== "off" && `_${data.resize}`}
        {!!data.reduce && `_shrunk`}.{data.fileType}
      </Text>
      <Flex direction="row" alignItems="center">
        <Switch
          isSelected={data.resize !== "off"}
          isDisabled={progress === "processing" || progress === "complete"}
          onChange={() => {
            updateSelf(position, "resize", checkResize());
          }}
          margin="size-0"
        >
          Resize
        </Switch>
        <TextField
          width="size-1000"
          marginEnd="size-100"
          label="width"
          labelPosition="side"
          type="text"
          pattern="[\d]+"
          onChange={value => {
            handleUpdateResize(value);
          }}
          placeholder={data.resize === "off" ? "in px" : thisWidth}
          isDisabled={data.resize === "off"}
          maxLength="4"
          minLength="1"
          isQuiet
        />
      </Flex>
      <Switch
        isSelected={data.reduce}
        isDisabled={progress === "processing" || progress === "complete"}
        onChange={() => {
          updateSelf(position, "reduce", !data.reduce);
        }}
        marginX="size-100"
      >
        Reduce file-size
      </Switch>
      <ActionButton
        isQuiet
        aria-label="Delete This Rendition"
        isDisabled={progress === "processing" || progress === "complete"}
        onPress={() => {
          removeSelf(position);
        }}
      >
        <Delete size="S" margin="size-100" />
      </ActionButton>
    </Grid>
  );
};

export default Rendition;

import React from "react";
import { Grid, Text, Switch } from "@adobe/react-spectrum";
import Back from "@spectrum-icons/workflow/Back";
import Delete from "@spectrum-icons/workflow/Delete";

const Rendition = ({ name, data, position, updateSelf }) => {
  const checkResize = () => {
    if (!!data.resize) {
      return false;
    } else {
      return "500";
    }
  };

  return (
    <Grid
      columns={["40px", "1fr", "1fr", "1fr", "40px"]}
      alignItems="center"
      alignContent="start"
      justifyContent="space-between"
      width="100%"
      UNSAFE_style={{ backgroundColor: "#181c24" }}
    >
      <Back
        margin="size-100"
        size="S"
        UNSAFE_style={{ transform: "rotate(180deg)" }}
      />
      <Text>
        {name}
        {!!data.resize && `_${data.resize}`}
        {!!data.reduce && `_shrunk`}.jpg
      </Text>
      <Switch
        isSelected={!!data.resize}
        onChange={() => {
          updateSelf(position, "resize", checkResize());
        }}
      >
        Resize
      </Switch>
      <Switch
        isSelected={data.reduce}
        onChange={() => {
          updateSelf(position, "reduce", !data.reduce);
        }}
      >
        Reduce file-size
      </Switch>
      <Delete size="S" margin="size-100" />
    </Grid>
  );
};

export default Rendition;

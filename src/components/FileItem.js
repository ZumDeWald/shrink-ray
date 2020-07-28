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
import Rendition from "./Rendition.js";

const FileItem = ({ fileName }) => {
  const [renditions, setRenditions] = useState([
    {
      resize: 0,
      reduce: true,
    },
    {
      resize: 1000,
      reduce: false,
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
          <Heading level={2}>File: {fileName}</Heading>
          <ActionButton>Remove File</ActionButton>
        </Flex>

        {!!renditions &&
          renditions.map((rendition, i) => (
            <React.Fragment key={`${fileName} - ${i}`}>
              <Rendition
                name={fileName}
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
          <ActionButton
            isQuiet
            aria-label="Delete This Rendition"
            onPress={() => {
              addRendition();
            }}
          >
            <Add size="S" />
            <Text>Add another rendition</Text>
          </ActionButton>
        </Flex>
      </Well>
    </View>
  );
};

export default FileItem;

/* Try 1

<div className="list-item-header">
  <h3>File 1: {fileName}.jpg</h3>
  <a href="/">Remove File</a>
</div>
<div className="renditions-list-container">
  <h3>Renditions:</h3>
  <ul className="renditions-list">
    <li className="renditions-list-item">
      <i className="fas fa-level-up-alt rotate-90"></i>
      <h4>{fileName}_500_shrunk.jpg</h4>
      <span>
        Resize width: <u>500</u>
      </span>
      <span>Reduce file-size</span>
      <i className="far fa-trash-alt"></i>
    </li>

    <li className="renditions-list-item">
      <i className="fas fa-level-up-alt rotate-90"></i>
      <h4>{fileName}_1000_shrunk.jpg</h4>
      <span>
        Resize width: <u>1000</u>
      </span>
      <span>Reduce file-size</span>
      <i className="far fa-trash-alt"></i>
    </li>

    <li className="renditions-list-item desaturate">
      <i className="fas fa-plus"></i>
      <h4>Add another rendition</h4>
    </li>
  </ul>
</div>

*/

/* Try 2

<table className="spectrum-Table">
  <thead className="spectrum-Table-head">
    <tr>
      <th className="spectrum-Table-headCell">File: {fileName}</th>
    </tr>
  </thead>
  <tbody className="spectrum-Table-body">
    <tr className="spectrum-Table-row">
      <td className="spectrum-Table-cell">
        <i className="fas fa-level-up-alt rotate-90"></i>
      </td>
      <td className="spectrum-Table-cell">
        <h4>{fileName}_500_shrunk.jpg</h4>
      </td>
      <td className="spectrum-Table-cell">
        Resize width: <u>500</u>
      </td>
      <td className="spectrum-Table-cell">
        <Switch>Reduce file-size</Switch>
      </td>
      <td className="spectrum-Table-cell">
        <i className="far fa-trash-alt"></i>
      </td>
    </tr>
  </tbody>
</table>

*/

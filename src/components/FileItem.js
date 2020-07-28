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
      name: fileName,
      resize: 0,
      reduce: true,
    },
    {
      name: fileName,
      resize: 1000,
      reduce: false,
    },
  ]);

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
              <Rendition data={rendition} />
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
          <Add size="S" />
          <Text>Add another rendition</Text>
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

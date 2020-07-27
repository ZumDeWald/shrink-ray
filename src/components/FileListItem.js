import React from "react";

const FileListItem = ({ fileName }) => {
  return (
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
          <td className="spectrum-Table-cell">Reduce file-size</td>
          <td className="spectrum-Table-cell">
            <i className="far fa-trash-alt"></i>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FileListItem;

/*
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

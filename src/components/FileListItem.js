import React from "react";

const FileListItem = ({ fileName }) => {
  return (
    <article className="file-list-item">
      <div className="list-item-header">
        <h3>File 1: {fileName}.jpg</h3>
        <a href="/">Remove File</a>
      </div>
      <div className="renditions-list-container">
        <h3>Renditions:</h3>
        <ul className="renditions-list">
          {/* New Component for each rendition list item */}
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
    </article>
  );
};

export default FileListItem;

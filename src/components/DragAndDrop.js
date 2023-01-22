import React from "react";

const DragAndDrop = ({ children, handleDropProp }) => {
  //Setup Drag&Drop Reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth };
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      default:
        return state;
    }
  };

  const initialState = {
    dropDepth: 0,
    inDropZone: false,
  };

  const [data, dispatch] = React.useReducer(reducer, initialState);

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 });
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    if (!!e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleDropProp(e.dataTransfer.files);
    }
  };

  const triggerClickOnInput = () => {
    const input = document.getElementById("file-chooser");
    input.click();
  };

  return (
    <div
      className={!!data.inDropZone ? "drop-zone active" : "drop-zone"}
      onDragEnter={e => {
        handleDragEnter(e);
      }}
      onDragLeave={e => {
        handleDragLeave(e);
      }}
      onDragOver={e => {
        handleDragOver(e);
      }}
      onDrop={e => {
        handleDrop(e);
      }}
      onClick={triggerClickOnInput}
    >
      {children}
    </div>
  );
};

export default DragAndDrop;

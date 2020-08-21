import React from "react";
// import { data, dispatch } from "./DropReducer.js";

const DragAndDrop = ({ children, handleDropProp }) => {
  // const [dragging, setDragging] = useState(false);

  // let dragCounter = 0;

  //Setup Drag&Drop Reducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth };
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      // case "ADD_FILE_TO_LIST":
      //   return { ...state, fileList: state.fileList.concat(action.files) };
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
    // if (!!e.dataTransfer.items && e.dataTransfer.items.length > 0) {
    //   dragCounter += 1;
    //   setDragging(true);
    // }
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return;
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    // dragCounter -= 1;
    // if (dragCounter > 0) return;
    // setDragging(false);
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
    // setDragging(false);
    if (!!e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleDropProp(e.dataTransfer.files);
      // dragCounter = 0;
    }
  };

  return (
    <div
      style={{ display: "inline-block", position: "relative" }}
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
    >
      {!!data.inDropZone && <div className="drop-zone-overlay"></div>}
      {children}
    </div>
  );
};

export default DragAndDrop;

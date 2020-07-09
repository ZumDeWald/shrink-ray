import React, { useEffect, useState, useRef } from "react";

const DragAndDrop = props => {
  const dropRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  let dragCounter = 0;

  const handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!!e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      dragCounter += 1;
      setDragging(true);
    }
  };

  const handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter -= 1;
    if (dragCounter > 0) return;
    setDragging(false);
  };

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (!!e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      props.handleDropProp(e.dataTransfer.files);
      // e.dataTransfer.clearData();
      dragCounter = 0;
    }
  };

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
  }, [dropRef]);

  return (
    <div
      style={{ display: "inline-block", position: "relative" }}
      ref={dropRef}
    >
      {!!dragging && (
        <div className="drop-zone-overlay">
          <div>
            <div>Set it down right here!!</div>
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
};

export default DragAndDrop;

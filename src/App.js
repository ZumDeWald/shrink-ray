import React, { useState } from "react";
import FileHandler from "./components/FileHandler.js";
import FileItem from "./components/FileItem.js";
import BatchButton from "./components/BatchButton.js";
import { View, Flex } from "@adobe/react-spectrum";
import "./App.css";

function App() {
  const [runBatch, setRunBatch] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>Shrink Ray</h1>
      </header>
      <main>
        <section className="slide-in-info-container"></section>
        <section className="drop-zone-container">
          <FileHandler handleDroppedFiles={setDroppedFiles} />
        </section>

        <section className="output-image-container">
          <View width="75vw" maxWidth="800px">
            {droppedFiles.map((file, index) => (
              <React.Fragment key={`${file.name} ${index}`}>
                <FileItem
                  file={file}
                  position={index}
                  handleDroppedFiles={setDroppedFiles}
                />
              </React.Fragment>
            ))}
            {droppedFiles.length > 0 && (
              <Flex
                width="100%"
                direction="row"
                alignItems="center"
                justifyContent="end"
              >
                <BatchButton runBatch={runBatch} setRunBatch={setRunBatch} />
              </Flex>
            )}
          </View>
        </section>
      </main>
    </div>
  );
}

export default App;

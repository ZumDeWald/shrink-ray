import React, { useState } from "react";
import FileHandler from "./components/FileHandler.js";
import FileItem from "./components/FileItem.js";
import { View, ActionButton, Text, Flex } from "@adobe/react-spectrum";
import Images from "@spectrum-icons/workflow/Images";
import "./App.css";

function App() {
  const [startTheMagick, setStartTheMagick] = useState(false);
  const [filesDropped, setFilesDropped] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>Shrink Ray</h1>
      </header>
      <main>
        <section className="slide-in-info-container"></section>
        <section className="drop-zone-container">
          <FileHandler
            startTheMagick={startTheMagick}
            setFilesDropped={setFilesDropped}
            handleDroppedFiles={setDroppedFiles}
          />
        </section>

        <section className="output-image-container">
          {!!startTheMagick && (
            <img
              id="output-image"
              src="https://pixelpapa.com/wp-content/uploads/2018/11/32.gif"
              alt="Trying it"
            />
          )}

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
                <ActionButton aria-label="Process file">
                  <Images size="S" />
                  <Text>Run Batch</Text>
                </ActionButton>
              </Flex>
            )}
            {/* !!startTheMagick ? (
              <a id="download-link" href="/" download="result.zip">
                <button className="download-button ghost">
                  Download Results
                </button>
              </a>
            ) : (
              <button
                className={
                  filesDropped ? "download-button" : "download-button ghost"
                }
                onClick={() => {
                  setStartTheMagick(true);
                }}
              >
                Process Images
              </button>
            ) */}
          </View>
        </section>
      </main>
    </div>
  );
}

export default App;

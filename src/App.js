import React, { useState, useEffect } from "react";
import FileHandler from "./components/FileHandler.js";
import FileItem from "./components/FileItem.js";
import BatchButton from "./components/BatchButton.js";
import { View, Flex } from "@adobe/react-spectrum";
import "./App.css";
import JSZip from "jszip";
import FileSaver from "file-saver";

function App() {
  const [progress, setProgress] = useState("hold");
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [filesComplete, setFilesComplete] = useState(0);

  const startTheMagick = () => {
    setProgress("processing");
  };

  //Setup Zip
  const [zip] = useState(new JSZip());
  // eslint-disable-next-line
  const [zipFolder, setZipFolder] = useState(zip.folder("processed"));

  const completeZip = () => {
    zip.generateAsync({ type: "blob" }).then(blob => {
      FileSaver.saveAs(blob, "shrunk.zip");
    });
  };

  useEffect(() => {
    if (droppedFiles.length > 0 && filesComplete === droppedFiles.length) {
      console.log(filesComplete, droppedFiles.length);
      //Set completed to NaN to stop infinite re-renders for matching if statement
      setFilesComplete(NaN);
      setProgress("complete");
    }
  }, [filesComplete, droppedFiles]);

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
                  progress={progress}
                  setZipFolder={setZipFolder}
                  setFilesComplete={setFilesComplete}
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
                <BatchButton
                  progress={progress}
                  startTheMagick={startTheMagick}
                  completeZip={completeZip}
                />
              </Flex>
            )}
          </View>
        </section>
      </main>
    </div>
  );
}

export default App;

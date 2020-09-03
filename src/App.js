import React, { useState, useEffect } from "react";
import FileHandler from "./components/FileHandler.js";
import FileItem from "./components/FileItem.js";
import BatchButton from "./components/BatchButton.js";
import { View, Flex, ActionButton } from "@adobe/react-spectrum";
import "./App.css";
import useZip from "./components/useZip.js";
// import JSZip from "jszip";
// import FileSaver from "file-saver";

function App() {
  const [progress, setProgress] = useState("hold");
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [filesComplete, setFilesComplete] = useState(0);

  const startTheMagick = () => {
    setProgress("processing");
  };

  const [completeZip, generateNewZip, setZipFolder] = useZip();

  //Get time string if needed for multiple Zip's
  // const intlOptions = {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  //   hour12: false,
  // };
  //
  // const generateNewTimeString = () => {
  //   return new Intl.DateTimeFormat("default", intlOptions)
  //     .format(new Date())
  //     .replace(/:/g, ".");
  // };

  //Setup Zip
  // const [zip, setZip] = useState({});
  // const [, setZipFolder] = useState({});

  useEffect(() => {
    console.log(generateNewZip);
    // let newZip = new JSZip();
    // let newFolder = newZip.folder(generateNewTimeString());
    //
    // setZip(newZip);
    // setZipFolder(newFolder);
    //Generate initial Zip
    generateNewZip();
  }, []);
  //
  // const completeZip = () => {
  //   zip.generateAsync({ type: "blob" }).then(blob => {
  //     FileSaver.saveAs(blob, "shrunk.zip");
  //   });
  // };

  const resetApp = () => {
    // let newZip = new JSZip();
    // let newFolder = newZip.folder(generateNewTimeString());

    generateNewZip();
    setDroppedFiles([]);
    setFilesComplete(0);
    setProgress("hold");
  };

  useEffect(() => {
    if (droppedFiles.length > 0 && filesComplete === droppedFiles.length) {
      //Set completed to NaN to stop infinite re-renders for matching if statement
      setFilesComplete(NaN);
      setProgress("complete");
    }
  }, [filesComplete, droppedFiles]);

  useEffect(() => {
    //Set window to ignore files dropped outside dropzone
    window.addEventListener(
      "dragover",
      e => {
        e.preventDefault();
      },
      false
    );
    window.addEventListener(
      "drop",
      e => {
        e.preventDefault();
      },
      false
    );

    return () => {
      //Cleanup listener on component unmounting
      window.removeEventListener("dragover", e => {
        e.preventDefault();
      });
      window.removeEventListener("drop", e => {
        e.preventDefault();
      });
    };
  });

  return (
    <div className="App">
      <header>
        <h1>Shrink Ray</h1>
      </header>
      <main>
        <section className="slide-in-info-container"></section>
        <section className="drop-zone-container">
          <FileHandler
            droppedFiles={droppedFiles}
            setDroppedFiles={setDroppedFiles}
            progress={progress}
          />
        </section>

        <section className="file-list-container">
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
                  filesComplete={filesComplete}
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
                <ActionButton marginEnd="size-200" onPress={resetApp}>
                  Reset
                </ActionButton>
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

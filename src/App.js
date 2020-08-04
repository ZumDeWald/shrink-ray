import React, { useState } from "react";
import FileHandler from "./components/FileHandler.js";
import FileItem from "./components/FileItem.js";
import BatchButton from "./components/BatchButton.js";
import { View, Flex } from "@adobe/react-spectrum";
import "./App.css";
import JSZip from "jszip";

function App() {
  const [progress, setProgress] = useState("hold");
  const [droppedFiles, setDroppedFiles] = useState([]);

  const startTheMagick = () => {
    setProgress("processing");
  };

  //Setup Zip
  const [zip] = useState(new JSZip());
  // eslint-disable-next-line
  const [zipFolder, setZipFolder] = useState(zip.folder("processed"));

  const completeZip = () => {
    //Finalize zip and attach to the download button
    let downloadLink = document.getElementById("download-link");

    zip.generateAsync({ type: "blob" }).then(blob => {
      let zipURL = URL.createObjectURL(blob);
      downloadLink.href = zipURL;
    });

    //Change UI to show complete status
    document.querySelector("#output-image").src =
      "https://p.kindpng.com/picc/s/79-791926_hook-check-mark-check-completed-finish-to-do.png";
    document.querySelector(".download-button").classList.remove("ghost");
  };

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

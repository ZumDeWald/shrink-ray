import React, { useState } from "react";
import FileList from "./components/FileList.js";
import FileListItem from "./components/FileListItem.js";
import { View } from "@adobe/react-spectrum";
import "./App.css";

function App() {
  const [startTheMagick, setStartTheMagick] = useState(false);
  const [filesDropped, setFilesDropped] = useState(false);

  return (
    <div className="App">
      <header>
        <h1>Shrink Ray</h1>
      </header>
      <main>
        <section className="slide-in-info-container"></section>
        <section className="drop-zone-container">
          <FileList
            startTheMagick={startTheMagick}
            setFilesDropped={setFilesDropped}
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

          <View width="75vw">
            <FileListItem fileName="test1" />
            <FileListItem fileName="test2" />
            {!!startTheMagick ? (
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
            )}
          </View>
        </section>
      </main>
    </div>
  );
}

export default App;

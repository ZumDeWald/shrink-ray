import React, { useState } from "react";
import FileList from "./components/FileList.js";
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
        <section className="drop-zone-container">
          <FileList
            startTheMagick={startTheMagick}
            setFilesDropped={setFilesDropped}
          />
        </section>

        <section className="output-image-container">
          {startTheMagick === true && (
            <img
              id="output-image"
              src="https://pixelpapa.com/wp-content/uploads/2018/11/32.gif"
              alt="Trying it"
            />
          )}

          <div>
            {startTheMagick === true ? (
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
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

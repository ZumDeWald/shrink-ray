import React, { useState } from "react";
import FileList from "./components/FileList.js";
import "./App.css";

function App() {
  const [imageProcessed, setImageProcessed] = useState(null);

  return (
    <div className="App">
      <header>
        <h1>Shrink Ray</h1>
      </header>
      <main>
        {
          // <section className="drop-zone-container">
          //   <div id="drop-zone" onDrop={() => {}}>
          //     <h3>Drop Zone</h3>
          //   </div>
          // </section>
        }
        <section className="drop-zone-container">
          <FileList setImageProcessed={setImageProcessed} />
        </section>
        <section className="output-image-container">
          <img
            id="output-image"
            src="https://images.unsplash.com/photo-1593935532255-a0574cc8fbf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=789&q=80"
            alt="Trying it"
          />
          {!!imageProcessed && (
            <div>
              <a id="download-link" href="/" download="result.zip">
                <button className="download-button">
                  Download finished image
                </button>
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

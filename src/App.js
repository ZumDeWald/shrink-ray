import React from "react";
import FileList from "./components/FileList.js";
import "./App.css";

function App() {
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
          <FileList />
        </section>
      </main>
    </div>
  );
}

export default App;

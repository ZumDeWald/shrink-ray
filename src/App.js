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
        <section class="output-image-container">
          <img
            id="output-image"
            src="https://images.unsplash.com/photo-1593935532255-a0574cc8fbf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=789&q=80"
            alt="Trying it"
          />
        </section>
      </main>
    </div>
  );
}

export default App;

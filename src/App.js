import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Shrink Ray</h1>
      </header>
      <main>
        <section class="drop-zone-container">
          <div id="drop-zone" ondrop="handleDrop(e)">
            <h3>Drop Zone</h3>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

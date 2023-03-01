import React from "react";
import "./App.css";
import SearchBox from "./SearchBox";

function App() {
  return (
    <div className="App">
      <div>
        <h2>Search for a name, artist or city!</h2>
        <SearchBox />
      </div>
    </div>
  );
}

export default App;

import React from "react";
import Templates from "./data/Cards";
import Card from "./components/Card";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">Infection Control</header>
      <Card template={Templates.cards[6]} />
    </div>
  );
}

export default App;

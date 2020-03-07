import React, { useState } from "react";
import Selector from "./components/Selector";
import Card from "./components/Card";
import Templates from "./data/Cards";
import "./App.css";

function App() {
  const [card, setCard] = useState(null);

  return (
    <div className="app">
      <div className="header">
        <Selector cards={Templates.cards} onChanged={setCard} />
        <div id="portalme"></div>
      </div>
      <div className="card">
        <Card template={card} />
      </div>
    </div>
  );
}

export default App;

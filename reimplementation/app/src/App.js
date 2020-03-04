import React, { useState } from "react";
import CardSelector from "./components/CardSelector";
import Card from "./components/Card";
import Exporter from "./components/Exporter";
import Templates from "./data/Cards";
import "./App.css";

function App() {
  const [card, setCard] = useState(null);

  return (
    <div className="App">
      <div>
        <CardSelector cards={Templates.cards} onChanged={setCard} />
      </div>
      <div>
        <Card template={card} />
      </div>
      <div>
        <Exporter />
      </div>
    </div>
  );
}

export default App;

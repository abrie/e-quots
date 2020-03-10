import React, { useState, useEffect, useReducer } from "react";
import Card from "./components/Card";
import Exporter from "./components/Exporter";
import Selector from "./components/Selector";
import Templates from "./data/Cards";
import { loadTemplate } from "./lib/loader";
import "./App.css";

export default function App() {
  const [template, setTemplate] = useState(null);
  const [card, setCard] = useState(null);
  const [cachedLedger, cacheLedger] = useState(null);
  const [ledger, dispatch] = useReducer(reducer, {}, initReducer);

  function changeLedger(evt) {
    const { name, value } = evt.currentTarget;
    dispatch({ type: "change", payload: { name, value } });
    cacheLedger(null);
  }

  function initReducer(dict) {
    return { ...dict };
  }

  function resetLedger() {
    cacheLedger({ ...ledger });
    const { ledger: blankLedger } = loadTemplate(template);
    dispatch({ type: "initialize", payload: blankLedger });
  }

  function restoreLedger() {
    dispatch({ type: "copy", payload: { ledger: cachedLedger } });
    cacheLedger(null);
  }

  function reducer(state, action) {
    switch (action.type) {
      case "change":
        const { name, value } = action.payload;
        return { ...state, [name]: value };
      case "initialize":
        const { ledger: blank } = loadTemplate(template);
        return initReducer(blank);
      case "copy":
        const { ledger: copy } = action.payload;
        return { ...copy };
      default:
        console.error(
          `Unhandled reducer action.type: "${action.type}". Full action object is:`,
          action
        );
        return undefined;
    }
  }

  useEffect(() => {
    if (template) {
      const { card, ledger } = loadTemplate(template);
      setCard(card);
      dispatch({ type: "initialize", payload: ledger });
    }
  }, [template]);

  return (
    <div className="app">
      <div className="header">
        <Selector cards={Templates.cards} onChanged={setTemplate} />
        <Exporter
          card={card}
          ledger={ledger}
          canRestore={cachedLedger !== null}
          doReset={resetLedger}
          doRestore={restoreLedger}
        />
      </div>
      <div className="card">
        <Card card={card} ledger={ledger} onChange={changeLedger} />
      </div>
    </div>
  );
}

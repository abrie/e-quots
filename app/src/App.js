import React, { useState, useEffect, useReducer } from "react";
import Card from "./components/Card";
import Exporter from "./components/Exporter";
import Selector from "./components/Selector";
import Templates from "./data/Cards";
import { loadTemplate } from "./lib/loader";
import "./App.css";

export default function App() {
  const [template, setTemplate] = useState(null);
  const [cachedLedger, cacheLedger] = useState(null);
  const [state, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    if (template) {
      dispatch({ type: "initialize", payload: { template } });
    }
  }, [template]);

  function reducer(state, action) {
    switch (action.type) {
      case "change": {
        const { name, value } = action.payload;
        const ledger = { ...state.ledger, [name]: value };
        const card = { ...state.card };
        return { card, ledger };
      }
      case "initialize": {
        const { template } = action.payload;
        const { card, ledger } = loadTemplate(template);
        return { card, ledger };
      }
      case "copy": {
        const { ledger } = action.payload;
        const card = { ...state.card };
        return { card, ledger };
      }
      default: {
        console.error(
          `Unhandled reducer action.type: "${action.type}". Full action object is:`,
          action
        );
        return undefined;
      }
    }
  }

  function changeLedger(evt) {
    const { name, value } = evt.currentTarget;
    dispatch({ type: "change", payload: { name, value } });
    cacheLedger(null);
  }

  function resetLedger() {
    cacheLedger({ ...state.ledger });
    dispatch({ type: "initialize", payload: { template } });
  }

  function restoreLedger() {
    dispatch({ type: "copy", payload: { ledger: cachedLedger } });
    cacheLedger(null);
  }

  return (
    <div className="app">
      <div className="header">
        <Selector cards={Templates.cards} onChanged={setTemplate} />
        <Exporter
          state={state}
          canRestore={cachedLedger !== null}
          doReset={resetLedger}
          doRestore={restoreLedger}
        />
      </div>
      <div className="card">
        <Card state={state} onChange={changeLedger} />
      </div>
    </div>
  );
}

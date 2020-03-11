import React, { useState, useEffect, useReducer } from "react";
import Card from "./components/Card";
import Exporter from "./components/Exporter";
import Selector from "./components/Selector";
import Templates from "./data/Cards";
import { loadTemplate } from "./lib/loader";
import "./App.css";

export default function App() {
  const [template, setTemplate] = useState(null);
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
        return { card, ledger, cache: null };
      }
      case "initialize": {
        const { template } = action.payload;
        const { card, ledger } = loadTemplate(template);
        return { card, ledger, cache: null };
      }
      case "reset": {
        const { template } = action.payload;
        const cache = { ...state.ledger };
        const { card, ledger } = loadTemplate(template);
        return { card, ledger, cache };
      }
      case "undo": {
        const card = { ...state.card };
        const ledger = { ...state.cache };
        return { card, ledger, cache: null };
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
  }

  function resetLedger() {
    dispatch({ type: "reset", payload: { template } });
  }

  function restoreLedger() {
    dispatch({ type: "undo" });
  }

  return (
    <div className="app">
      <div className="header">
        <Selector cards={Templates.cards} onChanged={setTemplate} />
        <Exporter
          state={state}
          canRestore={state && state.cache !== null}
          doReset={resetLedger}
          doRestore={restoreLedger}
        />
      </div>
      <Card state={state} onChange={changeLedger} />
    </div>
  );
}

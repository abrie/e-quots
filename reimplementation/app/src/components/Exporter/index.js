import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { upload, buildEML, buildFilename } from "./export.js";
import "./style.css";

export default function({ card, ledger, cachedLedger, onReset, onRestore }) {
  const [active, setActive] = useState(false);
  const [canRestore, setCanRestore] = useState(false);

  useEffect(() => {
    const notEmpty = Object.values(ledger).some(val => val);
    setActive(notEmpty);
  }, [ledger]);

  useEffect(() => {
    setCanRestore(cachedLedger !== null);
  }, [cachedLedger]);

  const handleExport = evt => {
    const date = new Date();
    const extension = "eml";
    const filename = buildFilename({ card, date, extension });
    const type = "text/plain";
    const data = buildEML({ card, ledger });
    upload({ data, filename, type });
  };

  const doPrint = evt => {
    window.print();
  };

  const RestoreMode = () => {
    return (
      <div className="controls">
        <button disabled={true} onClick={handleExport}>
          Email
        </button>
        <button disabled={true} onClick={doPrint}>
          Print
        </button>
        <button onClick={() => onRestore()}>undo reset</button>
      </div>
    );
  };

  const NormalMode = () => {
    return (
      <div className="controls">
        <button disabled={false} onClick={handleExport}>
          Email
        </button>
        <button disabled={false} onClick={doPrint}>
          Print
        </button>
        <button disabled={false} onClick={() => onReset()}>
          Reset
        </button>
      </div>
    );
  };

  const EmptyMode = () => {
    return (
      <div className="controls">
        <button disabled={true} onClick={handleExport}>
          Email
        </button>
        <button disabled={true} onClick={doPrint}>
          Print
        </button>
        <button disabled={true} onClick={() => onReset()}>
          reset
        </button>
      </div>
    );
  };

  const target = document.getElementById("portalme");

  if (canRestore) {
    return createPortal(<RestoreMode />, target);
  } else if (active) {
    return createPortal(<NormalMode />, target);
  } else {
    return createPortal(<EmptyMode />, target);
  }
}

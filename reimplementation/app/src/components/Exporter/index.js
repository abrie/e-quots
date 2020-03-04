import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { upload, buildEML } from "./export.js";
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
    upload({
      data: buildEML({ card, ledger }),
      filename: `equots.eml`,
      type: "text/plain"
    });
  };

  if (canRestore) {
    return createPortal(
      <div className="controls">
        <button onClick={() => onRestore()}>undo reset</button>
      </div>,
      document.getElementById("portalme")
    );
  } else if (active) {
    return createPortal(
      <div className="controls">
        <button onClick={handleExport}>export</button>
        <button onClick={() => onReset()}>reset</button>
      </div>,
      document.getElementById("portalme")
    );
  } else {
    return createPortal(<></>, document.getElementById("portalme"));
  }
}

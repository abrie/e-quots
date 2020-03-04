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

  const RestoreMode = () => {
    return (
      <div className="controls">
        <button onClick={() => onRestore()}>undo reset</button>
      </div>
    );
  };

  const NormalMode = () => {
    return (
      <div className="controls">
        <button onClick={handleExport}>export</button>
        <button onClick={() => onReset()}>reset</button>
      </div>
    );
  };

  const EmptyMode = () => {
    return <div className="controls"></div>;
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

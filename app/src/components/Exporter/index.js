import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { upload, buildEML, buildFilename } from "./export.js";
import "./style.css";

export default function({ card, ledger, canRestore, doReset, doRestore }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const notEmpty = Object.values(ledger).some(val => val);
    setActive(notEmpty);
  }, [ledger]);

  const doExport = evt => {
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
        <button disabled={true} onClick={doExport}>
          Email
        </button>
        <button disabled={true} onClick={doPrint}>
          Print
        </button>
        <button className="normal" onClick={() => doRestore()}>
          Undo
        </button>
      </div>
    );
  };

  const NormalMode = () => {
    return (
      <div className="controls">
        <button disabled={false} className="normal" onClick={doExport}>
          Email
        </button>
        <button disabled={false} className="normal" onClick={doPrint}>
          Print
        </button>
        <button disabled={false} className="warning" onClick={() => doReset()}>
          Reset
        </button>
      </div>
    );
  };

  const EmptyMode = () => {
    return (
      <div className="controls">
        <button disabled={true} onClick={doExport}>
          Email
        </button>
        <button disabled={true} onClick={doPrint}>
          Print
        </button>
        <button disabled={true} onClick={() => doReset()}>
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

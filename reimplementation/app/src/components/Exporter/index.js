import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { upload, buildEML } from "./export.js";
import "./style.css";

export default function({ card, ledger, onClear }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const notEmpty = Object.values(ledger).some(val => val);
    setActive(notEmpty);
  }, [ledger]);

  const handleExport = evt => {
    upload({
      data: buildEML({ card, ledger }),
      filename: `equots.eml`,
      type: "text/plain"
    });
  };

  if (active) {
    return createPortal(
      <div className="controls">
        <button onClick={handleExport}>export</button>
        <button onClick={() => onClear()}>clear</button>
      </div>,
      document.getElementById("portalme")
    );
  } else {
    return createPortal(<></>, document.getElementById("portalme"));
  }
}

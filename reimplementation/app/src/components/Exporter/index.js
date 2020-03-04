import React from "react";
import { upload, buildEML } from "./export.js";
import "./style.css";

export default function({ card, ledger }) {
  const handleExport = evt => {
    upload({
      data: buildEML({ card, ledger }),
      filename: `equots.eml`,
      type: "text/plain"
    });
  };

  return (
    <div className="controls">
      <button onClick={handleExport}>export</button>
    </div>
  );
}

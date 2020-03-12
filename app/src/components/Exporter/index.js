import React, { useEffect, useState } from "react";
import { upload, buildEML, buildFilename } from "../../lib/export";
import { reportMetric } from "../../lib/metrics";
import "./style.css";

export default function({ state, canRestore, doReset, doRestore }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (state) {
      const { ledger } = state;
      const notEmpty = Object.values(ledger).some(val => val);
      setActive(notEmpty);
    } else {
      setActive(false);
    }
  }, [state]);

  const doExport = evt => {
    const { card, ledger } = state;
    const date = new Date();
    const extension = "eml";
    const filename = buildFilename({ card, date, extension });
    const type = "text/plain";
    const data = buildEML({ card, ledger });
    reportMetric({ action: "export_eml" });
    upload({ data, filename, type });
  };

  const doPrint = evt => {
    reportMetric({ action: "export_print" });
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
          Clear
        </button>
      </div>
    );
  };

  if (canRestore) {
    return <RestoreMode />;
  } else if (active) {
    return <NormalMode />;
  } else {
    return <EmptyMode />;
  }
}

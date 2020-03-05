import React from "react";
import "./style.css";

export default function() {
  return (
    <div className="landing">
      <h1 className="title">Infection Control</h1>
      <p>
        Welcome to this implementation of the CDC's{" "}
        <a href="https://www.cdc.gov/infectioncontrol/tools/quots.html">
          Quick Check Tools (QUOTS)
        </a>
        .
      </p>
      <p>
        Use this tool to measure and encourage best practices in clinical
        settings. It will help limit the spread of infectious agents.
      </p>
      <p>To get started, select a card from the header menu above.</p>
      <p>
        For technical information, see the&nbsp;
        <a href="https://github.com/abrie/e-quots">source code on Github.</a>
      </p>
    </div>
  );
}

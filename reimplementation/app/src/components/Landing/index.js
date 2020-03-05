import React from "react";
import "./style.css";

export default function() {
  return (
    <div className="landing">
      <h1 className="title">Infection Control</h1>
      <p>
        This app is an implementation of the CDC's{" "}
        <a href="https://www.cdc.gov/infectioncontrol/tools/quots.html">
          Quick Check Tools (QUOTS)
        </a>
        .
      </p>
      <p>
        Use this tool to encourage and measure best practices in health care
        settings.
      </p>
      <p>To get started, select a card from the header menu above.</p>
    </div>
  );
}

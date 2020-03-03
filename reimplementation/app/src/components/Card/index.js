import React, { useState, useEffect } from "react";
import Parse from "../../parse.js";
import Export, { buildEML } from "../../export.js";
import "./style.css";

export default function(params) {
  const [template, setTemplate] = useState(null);
  const [ledger, setLedger] = useState(null);

  useEffect(() => {
    if (params.template) {
      const { template, ledger } = Parse(params.template);
      setTemplate(template);
      setLedger(ledger);
    } else {
      setTemplate(null);
      setLedger(null);
    }
  }, [params.template]);

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    setLedger({ ...ledger, [name]: value });
  };

  const handleExport = evt => {
    Export({
      data: buildEML({ template, ledger }),
      filename: "myemail.eml",
      type: "text/plain"
    });
  };

  const Choices = ({ question }) => {
    return question.choices.map((choice, key) => {
      const id = `${question.id}-${choice}`;
      return (
        <div className="questionChoice" key={key}>
          <input
            type="radio"
            name={question.id}
            id={id}
            value={choice}
            checked={ledger[question.id] === choice}
            onChange={handleChange}
          />
          <label htmlFor={id}>{choice}</label>
        </div>
      );
    });
  };

  const Questions = ({ section }) => {
    return section.questions.map((question, key) => {
      return <Question question={question} key={key} />;
    });
  };

  const Question = ({ question }) => {
    return (
      <div className="question">
        <div className="questionText"> {question.text}</div>
        <div className="questionChoices">
          <Choices question={question} />
        </div>
      </div>
    );
  };

  const Section = ({ section }) => {
    return (
      <div className="section">
        <div className="sectionHeader">{section.header}</div>
        <div className="sectionQuestions">
          <Questions section={section} />
        </div>
      </div>
    );
  };

  const renderSections = sections => {
    return sections.map((section, key) => {
      return <Section section={section} key={key} />;
    });
  };

  if (template) {
    return (
      <>
        <div className="name">{template.name}</div>
        <button onClick={handleExport}>upload</button>
        <div className="instructions">{template.instructions}</div>
        {renderSections(template.sections)}
      </>
    );
  } else {
    return <div>no card here</div>;
  }
}

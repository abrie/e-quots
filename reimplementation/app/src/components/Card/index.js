import React, { useState, useEffect } from "react";
import Parse from "../../parse.js";
import Exporter from "../Exporter";
import "./style.css";

export default function({ template }) {
  const [card, setCard] = useState(null);
  const [ledger, setLedger] = useState(null);

  useEffect(() => {
    if (template) {
      const { card, ledger } = Parse(template);
      setCard(card);
      setLedger(ledger);
    } else {
      setCard(null);
      setLedger(null);
    }
  }, [template]);

  const clearLedger = () => {
    const { ledger } = Parse(template);
    setLedger(ledger);
  };

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    const newLedger = { ...ledger, [name]: value };
    setLedger(newLedger);
  };

  const Sections = ({ sections }) => {
    return sections.map((section, key) => {
      return <Section section={section} key={key} />;
    });
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

  const Questions = ({ section }) => {
    return section.questions.map((question, key) => {
      return (
        <Question
          question={question}
          choiceCount={section.choiceSet.length}
          key={key}
        />
      );
    });
  };

  const Question = ({ question, choiceCount }) => {
    return (
      <div className="question">
        <div className="questionText"> {question.text}</div>
        <div className="questionChoices" data-count={choiceCount}>
          <Choices question={question} />
        </div>
      </div>
    );
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

  const Instructions = ({ text }) => {
    return <div className="instructions">{text}</div>;
  };

  const Reference = ({ href }) => {
    return (
      <div className="reference">
        <a href={card.pdf}>reference</a>
      </div>
    );
  };

  const Title = ({ text, number }) => {
    return (
      <div className="title">
        <div className="titleText">{text}</div>
        <div className="titleNumber">{number}</div>
      </div>
    );
  };

  if (card) {
    return (
      <>
        <Title text={card.title} number={card.number} />
        <Instructions text={card.instructions} />
        <Sections sections={card.sections} />
        <Exporter card={card} ledger={ledger} onClear={clearLedger} />
      </>
    );
  } else {
    return <div>no card here</div>;
  }
}

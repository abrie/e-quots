import React, { useState, useEffect } from "react";
import Parse from "../../parse.js";
import Exporter from "../Exporter";
import { computeTotals } from "../../compute.js";
import "./style.css";

export default function({ template }) {
  const [card, setCard] = useState(null);
  const [ledger, setLedger] = useState(null);
  const [cachedLedger, setCachedLedger] = useState(null);

  useEffect(() => {
    if (template) {
      const { card, ledger } = Parse(template);
      setCard(card);
      setLedger(ledger);
      setCachedLedger(null);
    } else {
      setCard(null);
      setLedger(null);
      setCachedLedger(null);
    }
  }, [template]);

  const resetLedger = () => {
    setCachedLedger(ledger);
    const { ledger: blankLedger } = Parse(template);
    setLedger(blankLedger);
  };

  const restoreLedger = () => {
    setLedger(cachedLedger);
    setCachedLedger(null);
  };

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    const newLedger = { ...ledger, [name]: value };
    setLedger(newLedger);
    setCachedLedger(null);
  };

  const Sections = ({ sections }) => {
    return sections.map((section, key) => {
      return <Section section={section} key={key} />;
    });
  };

  const Totals = ({ card, ledger }) => {
    const choiceSet = card.sections[0].choiceSet;
    const totals = computeTotals({ card, ledger });

    const Sums = () => {
      return choiceSet.map((choice, key) => {
        return (
          <div className="totalChoice" key={key}>
            {totals[choice]}
          </div>
        );
      });
    };

    return (
      <div className="total">
        <div className="totalText">Total</div>
        <div className="totalChoices" data-count={choiceSet.length}>
          <Sums />
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
        <a href={card.pdf}>Source PDF</a>
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
        <Totals card={card} ledger={ledger} />
        <Exporter
          card={card}
          ledger={ledger}
          cachedLedger={cachedLedger}
          doReset={resetLedger}
          doRestore={restoreLedger}
        />
        <Reference href={card.pdf} />
      </>
    );
  } else {
    return <div>no card here</div>;
  }
}

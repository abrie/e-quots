import React, { useContext } from "react";
import Landing from "../Landing";
import { computeTotals } from "../../lib/compute";
import "./style.css";

const DispatchContext = React.createContext(null);

const Observable = ({ card, ledger }) => {
  const handleChange = useContext(DispatchContext);
  return (
    <div className="observable">
      <div className="observableLabel">{card.observable}</div>
      <div className="observableInput">
        <input
          type="text"
          name="observable"
          value={ledger.observable}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const Sections = ({ card, ledger }) => {
  return card.sections.map((section, key) => {
    return <Section key={key} section={section} ledger={ledger} />;
  });
};

const Totals = ({ card, ledger }) => {
  const choiceSet = card.sections[0].choiceSet;
  const totals = computeTotals({ card, ledger });

  return (
    <div className="total">
      <div className="totalText">Total</div>
      <div className="totalChoices" data-count={choiceSet.length}>
        {choiceSet.map((choice, key) => {
          return (
            <div className="totalChoice" key={key}>
              {totals[choice]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Section = ({ section, ledger }) => {
  return (
    <div className="section">
      <div className="sectionHeader">{section.header}</div>
      <div className="sectionQuestions">
        <Questions section={section} ledger={ledger} />
      </div>
    </div>
  );
};

const Questions = ({ section, ledger }) => {
  return section.questions.map((question, key) => {
    return (
      <Question
        key={key}
        question={question}
        choiceCount={section.choiceSet.length}
        ledger={ledger}
      />
    );
  });
};

const Question = ({ question, choiceCount, ledger }) => {
  return (
    <div className="question">
      <div className="questionText"> {question.text}</div>
      <div className="questionChoices" data-count={choiceCount}>
        <Choices question={question} ledger={ledger} />
      </div>
    </div>
  );
};

const Choices = ({ question, ledger }) => {
  const handleChange = useContext(DispatchContext);
  return question.choices.map((choice, key) => {
    const id = `${question.id}-${choice}`;
    return (
      <div className="questionChoice" key={key}>
        <input
          type="radio"
          id={id}
          name={question.id}
          value={choice}
          checked={ledger[question.id] === choice}
          onChange={handleChange}
        />
        <label htmlFor={id}>{choice}</label>
      </div>
    );
  });
};

const Instructions = ({ card }) => {
  return <div className="instructions">{card.instructions}</div>;
};

const Reference = ({ card }) => {
  return (
    <div className="reference">
      <a href={card.href}>Source PDF</a>
    </div>
  );
};

const Title = ({ card }) => {
  return (
    <div className="title">
      <div className="titleText">{card.title}</div>
      <div className="titleNumber">{card.number}</div>
    </div>
  );
};

export default function({ state, onChange }) {
  if (!state) {
    return <Landing />;
  }

  const { card, ledger } = state;

  return (
    <DispatchContext.Provider value={onChange}>
      <Title card={card} />
      <Instructions card={card} />
      <Observable card={card} ledger={ledger} />
      <Sections card={card} ledger={ledger} />
      <Totals card={card} ledger={ledger} />
      <Reference card={card} />
    </DispatchContext.Provider>
  );
}

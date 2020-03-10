import React, { useContext } from "react";
import Landing from "../Landing";
import { computeTotals } from "../../lib/compute";
import "./style.css";

const DispatchContext = React.createContext(null);

const Observable = ({ card, state }) => {
  const handleChange = useContext(DispatchContext);
  return (
    <div className="observable">
      <div className="observableLabel">{card.observable}</div>
      <div className="observableInput">
        <input
          type="text"
          name="observable"
          value={state.observable}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const Sections = ({ sections, state }) => {
  return sections.map((section, key) => {
    return <Section section={section} key={key} state={state} />;
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

const Section = ({ section, state }) => {
  return (
    <div className="section">
      <div className="sectionHeader">{section.header}</div>
      <div className="sectionQuestions">
        <Questions section={section} state={state} />
      </div>
    </div>
  );
};

const Questions = ({ section, state }) => {
  return section.questions.map((question, key) => {
    return (
      <Question
        question={question}
        choiceCount={section.choiceSet.length}
        key={key}
        state={state}
      />
    );
  });
};

const Question = ({ question, choiceCount, state }) => {
  return (
    <div className="question">
      <div className="questionText"> {question.text}</div>
      <div className="questionChoices" data-count={choiceCount}>
        <Choices question={question} state={state} />
      </div>
    </div>
  );
};

const Choices = ({ question, state }) => {
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
          checked={state[question.id] === choice}
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
      <a href={href}>Source PDF</a>
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

export default function({ card, ledger, onChange }) {
  if (card) {
    return (
      <>
        <Title text={card.title} number={card.number} />
        <Instructions text={card.instructions} />
        <DispatchContext.Provider value={onChange}>
          <Observable card={card} state={ledger} />
          <Sections sections={card.sections} state={ledger} />
        </DispatchContext.Provider>
        <Totals card={card} ledger={ledger} />
        <Reference href={card.pdf} />
      </>
    );
  } else {
    return <Landing />;
  }
}

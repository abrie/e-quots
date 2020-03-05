import { flatten } from "lodash";

const Survey = {
  *QuestionNumberGenerator() {
    var value = 1;
    while (true) {
      yield value++;
    }
  },

  Observation(q) {
    return q.choices.reduce((map, choice) => {
      map[choice] = false;
      return map;
    }, {});
  },

  Question(observables, question, numberGenerator) {
    if (question.parts) {
      const observations = [];
      const partNumberGenerator = Survey.QuestionNumberGenerator();
      const parts = question.parts.map(
        q => new Survey.Question(observables, q, partNumberGenerator)
      );
      const number = numberGenerator.next().value;
      const text = question.text;

      return { number, text, parts, observations };
    } else {
      const observations = observables.map(
        () => new Survey.Observation(question)
      );
      const choices = question.choices.map(c => c);
      const number = numberGenerator.next().value;
      const text = question.text;

      return { number, text, choices, observations };
    }
  },
  validateChoiceSet(choices, question) {
    if (question.parts) {
      const mismatched = question.parts.filter(q =>
        Survey.validateChoiceSet(choices, q)
      );
      return mismatched.length > 0;
    } else {
      const mismatched = question.choices.filter(
        (c, idx) => choices[idx] !== c
      );
      return mismatched.length > 0;
    }
  },
  Section(section, observables, questionNumberGenerator) {
    const header = section.header;
    const questions = section.questions.map(
      q => new Survey.Question(observables, q, questionNumberGenerator)
    );
    const choices = section.choiceSet.map(choice => choice);

    /* Check for well-formed data */
    const mismatched = questions.filter(q =>
      Survey.validateChoiceSet(choices, q)
    );
    if (mismatched.length > 0) {
      throw new Error(
        "Error: One or more question's choices do not match the allowed choiceSet."
      );
    }

    return { header, questions, choices, observables };
  },
  Survey(card) {
    const questionNumberGenerator = Survey.QuestionNumberGenerator();
    const sections = card.sections.map(
      section =>
        new Survey.Section(section, card.observables, questionNumberGenerator)
    );
    const title = card.title;
    const instructions = card.instructions;
    const number = card.number;
    const name = card.name;
    const pdf = card.pdf;
    const observables = card.observables;

    return { title, name, pdf, instructions, number, observables, sections };
  },

  isFinalSection(survey, section) {
    return survey.sections.indexOf(section) === survey.sections.length - 1;
  },
  enforceChoice(observation, which) {
    const others = Object.keys(observation).filter(key => key !== which);
    others.forEach(other => (observation[other] = false));
  },
  countSurveyObservations(survey, choices) {
    return survey.sections.reduce(
      (acc, s) => acc + Survey.countSectionObservations(s, choices),
      0
    );
  },
  countSectionObservations(s, choices) {
    return s.questions.reduce(
      (acc, q) => acc + Survey.countQuestionObservations(q, choices),
      0
    );
  },
  countQuestionObservations(q, choices) {
    if (q.parts) {
      return q.parts.reduce(
        (acc, p) => acc + Survey.countQuestionObservations(p, choices),
        0
      );
    } else {
      return q.observations.filter(r =>
        choices.reduce((bool, choice) => bool | r[choice], false)
      ).length;
    }
  },
  isMultiAreaSurvey(survey) {
    return survey.observables.length > 1;
  },
  isMultiAreaQuestion(question) {
    return question.observations.length > 1;
  },
  serializeHeader(survey) {
    if (Survey.isMultiAreaSurvey(survey)) {
      return [
        "Question Number",
        "Question Text",
        ...survey.observables,
        "'Yes' Observed",
        "Total Observed"
      ];
    } else {
      return ["Question Number", "Question Text", "Observation"];
    }
  },
  *serializeQuestion(question) {
    if (question.parts) {
      for (let part of question.parts) {
        for (let c of Survey.serializeQuestion(part)) {
          yield c;
        }
      }
    } else {
      yield [
        `${question.number}`,
        `"${question.text}"`,
        ...question.observations.map(r => (r["Yes"] ? 1 : 0))
      ];
    }
  },
  *serializeQuestions(questions) {
    for (let q of questions) {
      for (let g of Survey.serializeQuestion(q)) {
        if (Survey.isMultiAreaQuestion(q)) {
          g.push(Survey.countQuestionObservations(q, ["Yes"]));
          g.push(Survey.countQuestionObservations(q, ["Yes", "No"]));
        }
        yield g;
      }
    }
  },
  serializeSection(section) {
    return [...Survey.serializeQuestions(section.questions)];
  },
  serializeSurvey(survey) {
    return survey.sections.map(Survey.serializeSection);
  },
  generateCSV(survey) {
    const header = Survey.serializeHeader(survey);
    const questions = flatten(Survey.serializeSurvey(survey));
    const rows = [header, ...questions];
    return rows.map(row => row.join(",")).join("\n");
  },
  generateCSVFilename(survey) {
    const today = new Date().toLocaleDateString("en-US");
    const datestring = today.replace(/\//g, "-");
    return `${survey.name}_${datestring}.csv`;
  }
};

export default Survey;

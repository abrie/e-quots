function buildCSV({ card, ledger }) {
  const header = card.sections.reduce((acc, section) => {
    return section.questions.reduce((acc, question) => {
      return [...acc, `"${question.text}"`];
    }, acc);
  }, []);

  const values = card.sections.reduce((acc, section) => {
    return section.questions.reduce((acc, question) => {
      return [...acc, ledger[question.id]];
    }, acc);
  }, []);

  return [header.join(","), values.join(",")].join("\n");
}

export { buildCSV };

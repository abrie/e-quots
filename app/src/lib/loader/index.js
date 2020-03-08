function addIds(template) {
  const toId = text =>
    Array.from(text)
      .map(ch => ch.toLowerCase())
      .filter(ch => ch >= "a" && ch <= "z")
      .join("");

  // Create a 'deep copy'
  const copy = JSON.parse(JSON.stringify(template));

  // Add id fields to the deep copy.
  copy.sections.forEach(section => {
    section.id = toId(section.header);
    section.questions.forEach(question => {
      question.id = Array.from(question.text)
        .map(ch => ch.toLowerCase())
        .filter(ch => ch >= "a" && ch <= "z")
        .join("");
    });
  });

  return copy;
}

function makeLedger(template) {
  const ledger = {};
  template.sections.forEach(section => {
    section.questions.forEach(question => {
      ledger[question.id] = "";
    });
  });
  return ledger;
}

function loadTemplate(template) {
  const card = addIds(template);
  const ledger = makeLedger(card);

  return {
    card,
    ledger
  };
}

export { loadTemplate };

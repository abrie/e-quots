function buildFilename({ card, date, extension }) {
  const name = card.name.replace(/ /gi, "-");
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`;
  const paddedMonth = month.length === 1 ? `0${month}` : month;
  const day = `${date.getDate()}`;
  const paddedDay = day.length === 1 ? `0${day}` : day;
  return `equots-${year}-${paddedMonth}-${paddedDay}_${name}.${extension}`;
}

function upload({ data, filename, type }) {
  const blob = new Blob([data], { type });

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

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

function buildHTML({ card, ledger }) {
  const questionRows = section => {
    return section.questions
      .map(question => {
        return `
      <tr>
        <td>${question.text}</td>
        <td>${ledger[question.id]}</td>
      </tr>`;
      })
      .join("");
  };

  const sectionTables = card => {
    return card.sections
      .map(section => {
        return `
      <table>
      <thead>
      <tr>
      <td>${section.header}</td>
      <td>Response</td>
      </tr>
      </thead>
      <tbody>
      ${questionRows(section)}
      </tbody>
      </table>`;
      })
      .join("");
  };

  const html = `<html>
  <head>
  <style> td { border: 1px solid #444 } </style>
  </head>
<body>
${sectionTables(card)}
</body>
</html>`;

  return html;
}

function buildEML({ card, ledger }) {
  const eml = `
To: TestUser <testuser@example.com>
From: <TestUser@example.com>
Subject: EML with attachments
X-Unsent: 1
Content-Type: multipart/mixed; boundary=--boundary_text_string

See below for a copy of inspection results:

----boundary_text_string
Content-Type: text/html; charset=UTF-8

${buildHTML({ card, ledger })}

----boundary_text_string--
`;
  return eml;
}

export { upload, buildCSV, buildHTML, buildEML, buildFilename };

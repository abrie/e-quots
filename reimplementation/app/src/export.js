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
  const rows = card.sections.reduce((acc, section) => {
    return section.questions.reduce((acc, question) => {
      return [
        ...acc,
        `<tr><td>${question.text}</td><td>${ledger[question.id]}</td></tr>`
      ];
    }, acc);
  }, []);

  const html = `<html>
  <head>
  <style> td { border: 1px solid #444 } </style>
  </head>
<body>
<table>
<thead>
<tr>
<td style="width:20rem">Question</td>
<td>Response</td>
</tr>
</thead>
<tbody>
${rows.join("\n")}
</tbody>
</table>
</body>
</htmlq>`;

  return html;
}

function buildEML({ card, ledger }) {
  const eml = `
To: Abrie <abrie@fastmail.com>
From: <abrie@fastmail.com>
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

export default upload;
export { buildCSV, buildHTML, buildEML };

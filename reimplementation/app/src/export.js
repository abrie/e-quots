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

function buildCSV({ template, ledger }) {
  const header = template.sections.reduce((acc, section) => {
    return section.questions.reduce((acc, question) => {
      return [...acc, `"${question.text}"`];
    }, acc);
  }, []);

  const values = template.sections.reduce((acc, section) => {
    return section.questions.reduce((acc, question) => {
      return [...acc, ledger[question.id]];
    }, acc);
  }, []);

  return [header.join(","), values.join(",")].join("\n");
}

function buildHTML({ template, ledger }) {
  const rows = template.sections.reduce((acc, section) => {
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
</html>`;

  return html;
}

function buildEML({ template, ledger }) {
  const eml = `
To: Demo-Recipient <demo@demo.example.com>
Subject: EML with attachments
X-Unsent: 1
Content-Type: multipart/mixed; boundary=--boundary_text_string

----boundary_text_string
Content-Type: text/html; charset=UTF-8

${buildHTML({ template, ledger })}

----boundary_text_string
Content-Type: application/octet-stream; name=demo.txt
Content-Transfer-Encoding: base64
Content-Disposition: attachment
ZXhhbXBsZQ==

----boundary_text_string
Content-Type: application/octet-stream; name=demo.log
Content-Transfer-Encoding: base64
Content-Disposition: attachment
ZXhhbXBsZQ==

----boundary_text_string--
`;
  return eml;
}

export default upload;
export { buildCSV, buildHTML, buildEML };

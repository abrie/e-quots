import { computeTotals } from "../compute";
import Handlebars from "handlebars";

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
  const definition = `
  <html>
  <head>
    <style> td { border: 1px solid #444 } </style>
  </head>
  <body>
  <table>
  <thead>
  <tr>
  {{#each totalChoices}}
  <th>
  {{totalLabel .}}
  </th>
  {{/each}}
  </tr>
  </thead>
  <tbody>
  <tr>
  {{#each totalChoices}}
  <td>
  {{totalValue .}}
  </td>
  {{/each}}
  </tr>
  </tbody>
  </table>
  {{#each card.sections}}
  <table>
  <thead>
  <tr>
    <th>{{header}}</th>
    <th>Response</th>
  </tr>
  </thead>
  <tbody>
  {{#each questions}}
  <tr>
    <td>{{.text}}</td>
    <td>{{response .id}}</td>
  </tr>
  {{/each}}
  </tbody>
  </table>
  {{/each}}
  </body>
  </html>
  `;

  var template = Handlebars.compile(definition);
  const totalChoices = [...card.sections[0].choiceSet, ""];
  const totals = computeTotals({ card, ledger });

  Handlebars.registerHelper("totalValue", function(choice) {
    const val = totals[choice];

    switch (val) {
      case undefined:
        return 0;
      default:
        return val;
    }
  });

  Handlebars.registerHelper("questionResponse", function(id) {
    return ledger[id];
  });

  Handlebars.registerHelper("totalLabel", function(val) {
    switch (val) {
      case "":
        return "Unanswered";
      default:
        return val;
    }
  });

  const html = template({ card, totalChoices });

  return html;
}

function buildEML({ card, ledger }) {
  const csvFilename = buildFilename({
    card,
    date: new Date(),
    extension: "csv"
  });

  const eml = `
Subject: QUOTS: ${card.name}
X-Unsent: 1
Content-Type: multipart/mixed; boundary=--boundary_text_string

See below for a copy of inspection results:

----boundary_text_string
Content-Type: text/html; charset=UTF-8

${buildHTML({ card, ledger })}

----boundary_text_string
Content-Type: text/csv; charset=UTF-8; name=${csvFilename}
Content-Disposition: attachment

${buildCSV({ card, ledger })}

----boundary_text_string--
`;
  return eml;
}

export { upload, buildCSV, buildHTML, buildEML, buildFilename };

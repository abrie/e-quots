import { computeTotals } from "../compute";
import Handlebars from "handlebars";

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
    <td>{{text}}</td>
    <td>{{response id}}</td>
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

  Handlebars.registerHelper("response", function(id) {
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

export { buildHTML };

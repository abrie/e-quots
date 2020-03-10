import { buildHTML } from "./buildHTML";
import { loadTemplate } from "../loader";

const TestTemplate = {
  name: "Test Template",
  pdf: "https://www.example.com/document.pdf",
  number: "7",
  observable: "Room",
  title: "Isolation: A basic test",
  instructions: "Use this template to test logic.",
  sections: [
    {
      header: "Section One",
      choiceSet: ["Yes", "No"],
      questions: [
        {
          text: "Qa",
          choices: ["Yes", "No"]
        },
        {
          text: "Qb",
          choices: ["Yes", "No"]
        },
        {
          text: "Qc",
          choices: ["Yes", "No"]
        },
        {
          text: "Qd",
          choices: ["Yes", "No"]
        }
      ]
    }
  ]
};

test("converts template and ledger to HTML", () => {
  const { card, ledger } = loadTemplate(TestTemplate);
  ledger.observable = "R123";
  ledger["qc"] = "Yes";
  const html = buildHTML({ card, ledger });
  expect(html).toContain(`R123`);
  expect(html).toContain(`<td>Qa</td>`);
  expect(html).toContain(`<td>Qb</td>`);
  expect(html).toContain(`<td>Qc</td>`);
  expect(html).toContain(`<td>Qd</td>`);
});

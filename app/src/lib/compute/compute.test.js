import { computeTotals } from "./index";
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
          text: "Q1",
          choices: ["Yes", "No"]
        },
        {
          text: "Q2",
          choices: ["Yes", "No"]
        },
        {
          text: "Q3",
          choices: ["Yes", "No"]
        },
        {
          text: "Q4",
          choices: ["Yes", "No"]
        }
      ]
    }
  ]
};

test("compute ledger totals", () => {
  const { card, ledger } = loadTemplate(TestTemplate);
  ledger["Q1"] = "Yes";
  ledger["Q2"] = "No";
  ledger["Q3"] = "Yes";
  const totals = computeTotals({ card, ledger });
  expect(totals["Yes"]).toBe(2);
  expect(totals["No"]).toBe(1);
});

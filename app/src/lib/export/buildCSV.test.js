import { buildCSV } from "./buildCSV";
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

test("converts template and ledger to CSV", () => {
  const { card, ledger } = loadTemplate(TestTemplate);
  const csv = buildCSV({ card, ledger });
  expect(csv).toBe(`"Q1","Q2","Q3","Q4"\n,,,`);
});

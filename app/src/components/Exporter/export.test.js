import { buildCSV, buildHTML, buildFilename } from "./export";
import Parse from "../../parse.js";

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
  const { card, ledger } = Parse(TestTemplate);
  const csv = buildCSV({ card, ledger });
  expect(csv).toBe(`"Q1","Q2","Q3","Q4"\n,,,`);
});

test("converts template and ledger to HTML", () => {
  const { card, ledger } = Parse(TestTemplate);
  const html = buildHTML({ card, ledger });
  expect(html).toContain(`<td>Q1</td>`);
  expect(html).toContain(`<td>Q2</td>`);
  expect(html).toContain(`<td>Q3</td>`);
  expect(html).toContain(`<td>Q4</td>`);
});

test("converts card name to a filename", () => {
  const card = { name: "Area Exterior to Isolation Rooms" };
  const date = new Date(1993, 6, 28, 14, 39, 7);
  const extension = "eml";

  const filename = buildFilename({ card, date, extension });
  expect(filename).toBe(
    "equots-1993-07-28_Area-Exterior-to-Isolation-Rooms.eml"
  );
});

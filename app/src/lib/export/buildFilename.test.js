import { buildFilename } from "./index";

test("converts card name to a filename", () => {
  const card = { name: "Area Exterior to Isolation Rooms" };
  const date = new Date(1993, 6, 28, 14, 39, 7);
  const extension = "eml";

  const filename = buildFilename({ card, date, extension });
  expect(filename).toBe(
    "equots-1993-07-28_Area-Exterior-to-Isolation-Rooms.eml"
  );
});

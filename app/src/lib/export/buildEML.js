import { buildHTML } from "./buildHTML";
import { buildCSV } from "./buildCSV";
import { buildFilename } from "./buildFilename";

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

export { buildEML };

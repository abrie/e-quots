function computeTotals({ card, ledger }) {
  return Object.values(ledger).reduce((acc, val) => {
    if (acc[val] === undefined) {
      acc[val] = 1;
    } else {
      acc[val] = acc[val] + 1;
    }
    return acc;
  }, {});
}

export { computeTotals };

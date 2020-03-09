function buildFilename({ card, date, extension }) {
  const name = card.name.replace(/ /gi, "-");
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`;
  const paddedMonth = month.length === 1 ? `0${month}` : month;
  const day = `${date.getDate()}`;
  const paddedDay = day.length === 1 ? `0${day}` : day;
  return `equots-${year}-${paddedMonth}-${paddedDay}_${name}.${extension}`;
}

export { buildFilename };

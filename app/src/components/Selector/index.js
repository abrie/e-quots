import React, { useState, useEffect } from "react";

export default function({ cards, onChanged }) {
  const [selected, setSelected] = useState("none");

  useEffect(() => {
    const template = cards.find(card => `${card.name}` === selected);
    template ? onChanged(template) : onChanged(null);
  }, [cards, selected, onChanged]);

  const handleSelection = evt => {
    const { value } = evt.currentTarget;
    setSelected(value);
  };

  const Selector = ({ cards }) => {
    return (
      <select value={selected} onChange={handleSelection}>
        <option value="none">Select a card</option>
        <SelectorItems cards={cards} />
      </select>
    );
  };

  const SelectorItems = ({ cards }) => {
    return cards.map((card, key) => {
      return (
        <option key={key} value={card.name}>
          {card.name}
        </option>
      );
    });
  };
  if (cards) {
    return <Selector cards={cards} />;
  } else {
    return <div>no cards</div>;
  }
}

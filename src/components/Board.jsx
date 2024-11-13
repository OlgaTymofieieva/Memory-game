import React from 'react';
import Card from './Card';

const Board = ({ cards, onCardClick }) => {
  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={() => onCardClick(index)} />
      ))}
    </div>
  );
};

export default Board;
import React from "react";
import { motion } from "framer-motion";

const Card = ({ card, onClick }) => {
  return (
    <motion.div
      className={`card ${card.isFlipped ? "flipped" : ""}`}
      onClick={onClick}
      layout
      
    
    >
      {card.isFlipped ? (
        <img src={card.image} alt="Card" />
      ) : (
        <div className="card-back">?</div>
      )}
    </motion.div>
  );
};

export default Card;


import React, { useState, useEffect } from 'react';
import Board from './Board';
import { fetchImages } from '../api';
import './Game.css';

const Game = () => {
    const [cards, setCards] = useState([]);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [canClick, setCanClick] = useState(true);
    const [theme, setTheme] = useState('nature');

   
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const loadImages = async () => {
        console.log("Loading images for theme:", theme);
        const images = await fetchImages(theme);
        console.log("Fetched images:", images);

        const initialCards = [...images, ...images].map(image => ({
            image,
            isFlipped: false,
        }));
        setCards(shuffleArray(initialCards));
        setMatchedCards([]);
        setLoading(false);
    };

  
    useEffect(() => {
        loadImages();
    }, [theme]);

    useEffect(() => {
        if (flippedIndices.length === 2) {
            const [firstIndex, secondIndex] = flippedIndices;
            setCanClick(false);

            if (cards[firstIndex].image === cards[secondIndex].image) {
                setMatchedCards((prev) => [...prev, cards[firstIndex].image]);
                setCanClick(true);
            } else {
                setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.map((card, index) =>
                            index === firstIndex || index === secondIndex
                                ? { ...card, isFlipped: false }
                                : card
                        )
                    );
                    setCanClick(true);
                }, 1000);
            }
            setFlippedIndices([]);
        }
    }, [flippedIndices, cards]);

    const handleCardClick = (index) => {
        if (canClick && !cards[index].isFlipped && flippedIndices.length < 2) {
            setCards((prevCards) =>
                prevCards.map((card, i) =>
                    i === index ? { ...card, isFlipped: true } : card
                )
            );
            setFlippedIndices((prev) => [...prev, index]);
        }
    };

  
    const startNewGame = () => {
        setLoading(true);
        loadImages();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game">
          
            <div>
                <label>
                    <input
                        type="radio"
                        value="nature"
                        checked={theme === 'nature'}
                        onChange={() => setTheme('nature')}
                    />
                    Nature
                </label>
                <label>
                    <input
                        type="radio"
                        value="animals"
                        checked={theme === 'animals'}
                        onChange={() => setTheme('animals')}
                    />
                    Animals
                </label>
                <label>
                    <input
                        type="radio"
                        value="cities"
                        checked={theme === 'cities'}
                        onChange={() => setTheme('cities')}
                    />
                    Cities
                </label>
            </div>
            <button onClick={startNewGame}>New Game</button>
            <Board cards={cards} onCardClick={handleCardClick} />
            {matchedCards.length === cards.length / 2 && <h2>You Win!</h2>}
        </div>
    );
};

export default Game;



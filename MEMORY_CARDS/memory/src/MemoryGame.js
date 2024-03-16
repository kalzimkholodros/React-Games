// MemoryGame.js

import React, { useState, useEffect } from 'react';
import './MemoryGame.css';
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import goldImage from './images/gold.png';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gold, setGold] = useState(0);
  const [showMarket, setShowMarket] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardTypes = ['image1', 'image2', 'image3']; // Farklı resimlerin adları
    const totalCards = 24; // Toplam kart sayısı
    const newCards = [];

    cardTypes.forEach((type) => {
      for (let i = 0; i < totalCards / cardTypes.length; i++) {
        newCards.push({ id: newCards.length + 1, value: type });
      }
    });

    shuffleCards(newCards);
    setCards(newCards);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const shuffleCards = (cardsArray) => {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
  };

  const flipCard = (id) => {
    if (flippedCards.length === 2 || matchedCards.includes(id)) return;
    setFlippedCards([...flippedCards, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (cards[firstCard - 1].value === cards[secondCard - 1].value) {
        setMatchedCards([...matchedCards, firstCard, secondCard]);
        setGold(gold + 100);
      } else {
        setGold(gold - 20);
      }
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards]);

  const renderCards = () => {
    return cards.map((card) => (
      <div
        key={card.id}
        className={`card ${flippedCards.includes(card.id) || matchedCards.includes(card.id) ? 'flipped' : ''}`}
        onClick={() => flipCard(card.id)}
      >
        <div className="card-inner">
          <div className="card-front">?</div>
          <div className="card-back">
            <img src={getImagePath(card.value)} alt="Card" />
          </div>
        </div>
      </div>
    ));
  };

  const getImagePath = (value) => {
    switch (value) {
      case 'image1':
        return image1;
      case 'image2':
        return image2;
      case 'image3':
        return image3;
      default:
        return '';
    }
  };

  const handleMarketClick = () => {
    setShowMarket(!showMarket);
  };

  const handleCloseMarket = () => {
    setShowMarket(false);
  };

  return (
    <div className="memory-game">
      <h1>Memory Cards Game</h1>
      <div className="cards-container">{renderCards()}</div>
      <div className="gold-counter" onClick={handleMarketClick}>
        <div className="gold-image">
          <img src={goldImage} alt="Gold" />
        </div>
        <div className="gold-amount">{gold}</div>
      </div>
      {showMarket && (
        <div className="market">
          <div className="market-header">
            <div className="gold">
              <img src={goldImage} alt="Gold" />
              <span>{gold}</span>
            </div>
            <button className="close-button" onClick={handleCloseMarket}>Close</button>
          </div>
          <div className="market-items">
            <div className="market-item">Item 1 - 20 gold</div>
            <div className="market-item">Item 2 - 35 gold</div>
            <div className="market-item">Item 3 - 45 gold</div>
            <div className="market-item">Item 4 - 50 gold</div>
            <div className="market-item">Item 5 - 75 gold</div>
            <div className="market-item">Item 6 - 90 gold</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;

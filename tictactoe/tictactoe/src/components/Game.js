import React, { useState } from 'react';
import Board from './Board';
import goldIcon from './images/gold.png';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gold, setGold] = useState(0);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [gameOver, setGameOver] = useState(false); 

  const handleClick = (index) => {
    if (calculateWinner(squares) || squares[index]) return;
    const newSquares = squares.slice();
    newSquares[index] = 'X';
    setSquares(newSquares);
    setXIsNext(false);
    setTimeout(() => makeBotMove(newSquares), 1000); 
  };

  const makeBotMove = (currentSquares) => {
    if (calculateWinner(currentSquares) || gameOver) return; 
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * 9);
    } while (currentSquares[randomIndex] !== null);
    const newSquares = currentSquares.slice();
    newSquares[randomIndex] = 'O';
    setSquares(newSquares);
    setXIsNext(true);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if (squares[a] === 'X') {
          if (!gameOver) {
            setGold(gold + 200);
            setGameOver(true);
          }
        } else if (squares[a] === 'O') {
          if (!gameOver) {
            setGold(gold - 100);
            setGameOver(true);
          }
        }
        return squares[a];
      }
    }
    return null;
  };

  const toggleMarket = () => setIsMarketOpen(!isMarketOpen);

  const renderMarket = () => {
    return (
      <div className="market">
        <h2>Market</h2>
        {/* Market items go here */}
      </div>
    );
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-header">
        <div className="gold-container" onClick={toggleMarket}>
          <img src={goldIcon} alt="Gold" className="gold-icon" />
          <span className="gold-amount">{gold}</span>
        </div>
        {isMarketOpen && renderMarket()}
      </div>
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
};

export default Game;

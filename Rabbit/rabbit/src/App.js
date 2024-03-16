import React, { useState, useEffect } from "react";
import "./styles.css";

const BoardWidth = 50;
const BoardHeight = 30;
const CarrotValue = 20;

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * BoardWidth),
    y: Math.floor(Math.random() * BoardHeight)
  };
}

function App() {
  const [playerPosition, setPlayerPosition] = useState({ x: Math.floor(BoardWidth / 2), y: Math.floor(BoardHeight / 2) });
  const [carrotPosition, setCarrotPosition] = useState(getRandomPosition());
  const [score, setScore] = useState(0);

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key;
      let newPosition = { ...playerPosition };

      if (key === "ArrowUp" && newPosition.y > 0) {
        newPosition.y -= 1;
      } else if (key === "ArrowDown" && newPosition.y < BoardHeight - 1) {
        newPosition.y += 1;
      } else if (key === "ArrowLeft" && newPosition.x > 0) {
        newPosition.x -= 1;
      } else if (key === "ArrowRight" && newPosition.x < BoardWidth - 1) {
        newPosition.x += 1;
      }

      setPlayerPosition(newPosition);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerPosition]);

  useEffect(() => {
    function checkCollision() {
      if (playerPosition.x === carrotPosition.x && playerPosition.y === carrotPosition.y) {
        setScore(score + CarrotValue);
        setCarrotPosition(getRandomPosition());
      }
    }

    checkCollision();
  }, [playerPosition, carrotPosition, score]);

  return (
    <div className="game">
      <div className="board">
        {[...Array(BoardHeight)].map((_, y) => (
          <div key={y} className="row">
            {[...Array(BoardWidth)].map((_, x) => (
              <div key={`${x}-${y}`} className={`cell ${x === playerPosition.x && y === playerPosition.y ? "player" : ""} ${x === carrotPosition.x && y === carrotPosition.y ? "carrot" : ""}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default App;

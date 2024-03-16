import React, { useState, useEffect } from 'react';


const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 20;
const SPEED = 100;

const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection(Direction.UP);
        break;
      case 'ArrowDown':
        setDirection(Direction.DOWN);
        break;
      case 'ArrowLeft':
        setDirection(Direction.LEFT);
        break;
      case 'ArrowRight':
        setDirection(Direction.RIGHT);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleTick = () => {
      if (gameOver) return;

      const head = { ...snake[0] };
      switch (direction) {
        case Direction.UP:
          head.y--;
          break;
        case Direction.DOWN:
          head.y++;
          break;
        case Direction.LEFT:
          head.x--;
          break;
        case Direction.RIGHT:
          head.x++;
          break;
        default:
          break;
      }

      // Check if snake hits walls
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        setGameOver(true);
        return;
      }

      // Check if snake eats itself
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return;
      }

      const newSnake = [head, ...snake];
      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * COLS),
          y: Math.floor(Math.random() * ROWS),
        });
        setScore(score + 1);
      } else {
        newSnake.pop(); // Remove tail if not eating food
      }

      setSnake(newSnake);
    };

    const intervalId = setInterval(handleTick, SPEED);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [snake, direction, food, score, gameOver]);

  return (
    <div>
      <div className="score">Score: {score}</div>
      <div className="snake-game-board">
        {snake.map((segment, index) => (
          <div key={index} className="snake-cell" style={{ top: segment.y * CELL_SIZE, left: segment.x * CELL_SIZE }} />
        ))}
        <div className="food-cell" style={{ top: food.y * CELL_SIZE, left: food.x * CELL_SIZE }} />
      </div>
      {gameOver && <div className="game-over-message">Game Over!</div>}
    </div>
  );
};

export default SnakeGame;

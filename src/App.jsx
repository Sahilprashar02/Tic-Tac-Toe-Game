import { useState, useCallback } from 'react';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import StatusBar from './components/StatusBar';
import Confetti from './components/Confetti';
import './App.css';

// All possible winning combinations (rows, columns, diagonals)
const WINNING_LINES = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

/**
 * Checks if there's a winner on the board.
 * @param {Array} cells — array of 9 values
 * @returns {{ winner: string, line: number[] } | null}
 */
function calculateWinner(cells) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a], line };
    }
  }
  return null;
}

/**
 * Checks if the board is full (draw condition when no winner).
 */
function isBoardFull(cells) {
  return cells.every((cell) => cell !== null);
}

function App() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Derived state
  const result = calculateWinner(cells);
  const winner = result?.winner || null;
  const winningLine = result?.line || null;
  const isDraw = !winner && isBoardFull(cells);
  const isGameOver = !!winner || isDraw;
  const currentPlayer = isXNext ? 'X' : 'O';

  /**
   * Handle a cell click — place the current player's mark.
   */
  const handleCellClick = useCallback(
    (index) => {
      // Ignore if game is over or cell is filled
      if (isGameOver || cells[index]) return;

      const newCells = [...cells];
      newCells[index] = currentPlayer;
      setCells(newCells);

      // Check for winner or draw after this move
      const newResult = calculateWinner(newCells);
      if (newResult) {
        setScores((prev) => ({
          ...prev,
          [newResult.winner]: prev[newResult.winner] + 1,
        }));
      } else if (isBoardFull(newCells)) {
        setScores((prev) => ({
          ...prev,
          draws: prev.draws + 1,
        }));
      }

      setIsXNext(!isXNext);
    },
    [cells, currentPlayer, isGameOver, isXNext]
  );

  /**
   * Reset the board for a new round (keeps scores).
   */
  const handleNewRound = useCallback(() => {
    setCells(Array(9).fill(null));
    setIsXNext(true);
  }, []);

  /**
   * Full reset — clear board and scores.
   */
  const handleFullReset = useCallback(() => {
    setCells(Array(9).fill(null));
    setIsXNext(true);
    setScores({ X: 0, O: 0, draws: 0 });
  }, []);

  return (
    <>
      <Confetti isActive={!!winner} />

      <main className="app" id="app">
        {/* Header */}
        <header className="header">
          <h1 className="header__title">Tic Tac Toe</h1>
          <p className="header__subtitle">Two Player Battle</p>
        </header>

        {/* Scoreboard */}
        <Scoreboard
          scores={scores}
          currentPlayer={currentPlayer}
          isGameOver={isGameOver}
        />

        {/* Status */}
        <StatusBar
          winner={winner}
          isDraw={isDraw}
          currentPlayer={currentPlayer}
        />

        {/* Board */}
        <Board
          cells={cells}
          onCellClick={handleCellClick}
          winningLine={winningLine}
          isGameOver={isGameOver}
          currentPlayer={currentPlayer}
        />

        {/* Actions */}
        <div className="actions">
          <button
            id="btn-new-round"
            className="btn btn--primary"
            onClick={handleNewRound}
          >
            {isGameOver ? '▶ New Round' : '↻ Restart'}
          </button>
          <button
            id="btn-reset-all"
            className="btn btn--secondary"
            onClick={handleFullReset}
          >
            Reset All
          </button>
        </div>

        {/* Footer */}
        <footer className="footer">
          Built with React + Vite
        </footer>
      </main>
    </>
  );
}

export default App;

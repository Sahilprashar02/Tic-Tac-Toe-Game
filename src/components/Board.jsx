import Cell from './Cell';

/**
 * Board — The 3x3 game board.
 *
 * Props:
 *  - cells: array of 9 values ('X' | 'O' | null)
 *  - onCellClick: (index) => void
 *  - winningLine: array of winning indices or null
 *  - isGameOver: boolean
 *  - currentPlayer: 'X' | 'O'
 */
function Board({ cells, onCellClick, winningLine, isGameOver, currentPlayer }) {
  return (
    <div className="board" id="game-board">
      {cells.map((value, index) => (
        <Cell
          key={index}
          index={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinning={winningLine?.includes(index) || false}
          isDisabled={isGameOver}
          currentPlayer={currentPlayer}
        />
      ))}
    </div>
  );
}

export default Board;

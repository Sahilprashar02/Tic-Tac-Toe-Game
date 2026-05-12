/**
 * Scoreboard — Displays scores for X, O, and draws.
 *
 * Props:
 *  - scores: { X: number, O: number, draws: number }
 *  - currentPlayer: 'X' | 'O'
 *  - isGameOver: boolean
 */
function Scoreboard({ scores, currentPlayer, isGameOver }) {
  return (
    <div className="scoreboard" id="scoreboard">
      <div
        className={`scoreboard__card scoreboard__card--x ${
          !isGameOver && currentPlayer === 'X' ? 'scoreboard__card--active' : ''
        }`}
      >
        <div className="scoreboard__label">Player</div>
        <div className="scoreboard__symbol scoreboard__symbol--x">✕</div>
        <div className="scoreboard__score">{scores.X}</div>
      </div>

      <div className="scoreboard__card scoreboard__card--draw">
        <div className="scoreboard__label">Draws</div>
        <div className="scoreboard__symbol">—</div>
        <div className="scoreboard__score">{scores.draws}</div>
      </div>

      <div
        className={`scoreboard__card scoreboard__card--o ${
          !isGameOver && currentPlayer === 'O' ? 'scoreboard__card--active' : ''
        }`}
      >
        <div className="scoreboard__label">Player</div>
        <div className="scoreboard__symbol scoreboard__symbol--o">◯</div>
        <div className="scoreboard__score">{scores.O}</div>
      </div>
    </div>
  );
}

export default Scoreboard;

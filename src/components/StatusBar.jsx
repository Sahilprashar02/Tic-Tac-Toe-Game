/**
 * StatusBar — Shows the current game status (whose turn, winner, draw).
 *
 * Props:
 *  - winner: 'X' | 'O' | null
 *  - isDraw: boolean
 *  - currentPlayer: 'X' | 'O'
 */
function StatusBar({ winner, isDraw, currentPlayer }) {
  const getStatusContent = () => {
    if (winner) {
      return (
        <span className="status__text status__text--winner">
          🎉 Player{' '}
          <span className={`status__highlight status__highlight--${winner.toLowerCase()}`}>
            {winner}
          </span>{' '}
          Wins!
        </span>
      );
    }

    if (isDraw) {
      return (
        <span className="status__text status__text--draw">
          🤝 It&apos;s a Draw!
        </span>
      );
    }

    return (
      <span className="status__text">
        <span className={`turn-dot turn-dot--${currentPlayer.toLowerCase()}`} />
        Player{' '}
        <span className={`status__highlight status__highlight--${currentPlayer.toLowerCase()}`}>
          {currentPlayer}
        </span>
        &apos;s Turn
      </span>
    );
  };

  const statusClass = [
    'status',
    winner ? 'status--winner' : '',
    isDraw ? 'status--draw' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={statusClass} id="status-bar">
      {getStatusContent()}
    </div>
  );
}

export default StatusBar;

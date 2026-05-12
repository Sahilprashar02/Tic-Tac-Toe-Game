/**
 * Cell — A single cell in the Tic Tac Toe board.
 *
 * Props:
 *  - value: 'X' | 'O' | null
 *  - onClick: handler for cell click
 *  - isWinning: boolean — is this cell part of the winning line
 *  - isDisabled: boolean — is interaction disabled
 *  - currentPlayer: 'X' | 'O' — used for hover effect color
 *  - index: number — cell index for unique id
 */
function Cell({ value, onClick, isWinning, isDisabled, currentPlayer, index }) {
  const classNames = [
    'cell',
    value ? 'cell--filled' : '',
    isWinning ? 'cell--winning' : '',
    isDisabled ? 'cell--disabled' : '',
    !value && !isDisabled
      ? currentPlayer === 'X'
        ? 'cell--x-turn'
        : 'cell--o-turn'
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  const symbolClass = value
    ? `cell__symbol cell__symbol--${value.toLowerCase()}`
    : '';

  return (
    <button
      id={`cell-${index}`}
      className={classNames}
      onClick={onClick}
      disabled={isDisabled || !!value}
      aria-label={value ? `Cell ${index + 1}: ${value}` : `Cell ${index + 1}: empty`}
    >
      {value && <span className={symbolClass}>{value}</span>}
    </button>
  );
}

export default Cell;

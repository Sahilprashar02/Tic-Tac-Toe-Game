import { useMemo } from 'react';

/**
 * Confetti — Renders falling confetti pieces when there's a winner.
 *
 * Props:
 *  - isActive: boolean — whether to show confetti
 */
function Confetti({ isActive }) {
  const pieces = useMemo(() => {
    if (!isActive) return [];

    const colors = [
      '#6366f1', '#a855f7', '#ec4899', '#f472b6',
      '#818cf8', '#10b981', '#34d399', '#fbbf24',
      '#f59e0b', '#38bdf8',
    ];

    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 2}s`,
      size: `${6 + Math.random() * 8}px`,
      rotation: `${Math.random() * 360}deg`,
    }));
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="celebration" aria-hidden="true">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            width: piece.size,
            height: piece.size,
            transform: `rotate(${piece.rotation})`,
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;

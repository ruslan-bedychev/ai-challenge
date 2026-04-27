import type { LeaderboardEntry } from '../services/api';

interface PodiumItemProps {
  entry: LeaderboardEntry;
  rank: 1 | 2 | 3;
}

const rankConfig = {
  1: {
    blockBg: 'bg-amber-400',
    labelBg: 'bg-amber-500',
    avatarSize: 'w-20 h-20',
    blockHeight: 'h-28',
    order: 'order-2',
    crown: true,
  },
  2: {
    blockBg: 'bg-gray-300',
    labelBg: 'bg-gray-400',
    avatarSize: 'w-16 h-16',
    blockHeight: 'h-20',
    order: 'order-1',
    crown: false,
  },
  3: {
    blockBg: 'bg-gray-300',
    labelBg: 'bg-gray-400',
    avatarSize: 'w-16 h-16',
    blockHeight: 'h-16',
    order: 'order-3',
    crown: false,
  },
};

const PodiumItem = ({ entry, rank }: PodiumItemProps) => {
  const cfg = rankConfig[rank];
  const initials = `${entry.firstName[0]}${entry.lastName[0]}`;

  return (
    <div className={`flex flex-col items-center ${cfg.order}`}>
      {/* Crown for #1 */}
      {cfg.crown && (
        <div className="mb-1 text-2xl select-none" aria-hidden>
          👑
        </div>
      )}

      {/* Avatar */}
      <div
        className={`${cfg.avatarSize} rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg shadow-md mb-2 ring-2 ring-white`}
      >
        {initials}
      </div>

      {/* Name */}
      <p className="font-semibold text-gray-800 text-sm text-center leading-tight">
        {entry.firstName} {entry.lastName}
      </p>
      {/* Title */}
      <p className="text-xs text-gray-500 text-center mt-0.5">{entry.title}</p>
      {/* Score badge */}
      <div className="flex items-center gap-1 mt-1 bg-white border border-gray-200 rounded-full px-2.5 py-0.5 text-xs font-semibold text-gray-700 shadow-sm">
        <span className="text-amber-400">⭐</span>
        {entry.score.toLocaleString()}
      </div>

      {/* Podium block */}
      <div
        className={`${cfg.blockBg} ${cfg.blockHeight} w-28 rounded-t-xl flex items-center justify-center mt-3 shadow-md`}
      >
        <span className="text-white font-extrabold text-3xl drop-shadow">{rank}</span>
      </div>
    </div>
  );
};

interface PodiumProps {
  entries: LeaderboardEntry[];
}

const Podium = ({ entries }: PodiumProps) => {
  const top3 = entries.slice(0, 3);

  if (top3.length === 0) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-400 text-sm">
        No results to display.
      </div>
    );
  }

  return (
    <div className="flex items-end justify-center gap-4 px-4 py-6">
      {top3[1] && <PodiumItem entry={top3[1]} rank={2} />}
      {top3[0] && <PodiumItem entry={top3[0]} rank={1} />}
      {top3[2] && <PodiumItem entry={top3[2]} rank={3} />}
    </div>
  );
};

export default Podium;

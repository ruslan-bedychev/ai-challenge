import type { LeaderboardUser } from '../types';

interface PodiumItemProps {
  entry: LeaderboardUser;
  rank: 1 | 2 | 3;
}

const rankConfig: Record<
  1 | 2 | 3,
  {
    blockBg: string;
    blockHeight: string;
    avatarSize: string;
    avatarRing: string;
    order: string;
    topOffset: string;
    crown: boolean;
  }
> = {
  1: {
    blockBg: 'bg-yellow-400',
    blockHeight: 'h-28',
    avatarSize: 'w-20 h-20',
    avatarRing: 'ring-4 ring-yellow-300',
    order: 'order-2',
    topOffset: 'mt-0',
    crown: true,
  },
  2: {
    blockBg: 'bg-gray-200',
    blockHeight: 'h-20',
    avatarSize: 'w-16 h-16',
    avatarRing: 'ring-2 ring-white',
    order: 'order-1',
    topOffset: 'mt-6',
    crown: false,
  },
  3: {
    blockBg: 'bg-gray-300',
    blockHeight: 'h-16',
    avatarSize: 'w-16 h-16',
    avatarRing: 'ring-2 ring-white',
    order: 'order-3',
    topOffset: 'mt-6',
    crown: false,
  },
};

const PodiumItem = ({ entry, rank }: PodiumItemProps) => {
  const cfg = rankConfig[rank];

  return (
    <div className={`flex flex-col items-center ${cfg.order} ${cfg.topOffset}`}>
      {/* Crown for #1 */}
      {cfg.crown ? (
        <div className="mb-1 text-2xl select-none" aria-hidden="true">
          👑
        </div>
      ) : (
        <div className="mb-1 h-8" />
      )}

      {/* Avatar */}
      <img
        src={`https://i.pravatar.cc/100?img=${entry.id}`}
        alt={`${entry.firstName} ${entry.lastName}`}
        className={`${cfg.avatarSize} rounded-full object-cover ${cfg.avatarRing} shadow-md mb-2`}
      />

      {/* Name */}
      <p className="font-semibold text-gray-900 text-sm text-center leading-tight max-w-[110px]">
        {entry.firstName} {entry.lastName}
      </p>
      {/* Title */}
      <p className="text-xs text-gray-500 text-center mt-0.5 max-w-[110px] truncate">
        {entry.title}
      </p>
      {/* Score badge */}
      <div className="flex items-center gap-1 mt-1.5 bg-gray-100 border border-gray-200 rounded-full px-3 py-0.5 text-xs font-semibold text-gray-700 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
        {entry.score.toLocaleString()}
      </div>

      {/* Podium block */}
      <div
        className={`${cfg.blockBg} ${cfg.blockHeight} w-28 rounded-xl shadow-md flex items-center justify-center mt-3`}
      >
        <span className="text-white font-extrabold text-3xl drop-shadow">{rank}</span>
      </div>
    </div>
  );
};

interface PodiumProps {
  entries: LeaderboardUser[];
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
    <div className="flex items-end justify-center gap-6 px-4 py-6">
      {top3[1] && <PodiumItem entry={top3[1]} rank={2} />}
      {top3[0] && <PodiumItem entry={top3[0]} rank={1} />}
      {top3[2] && <PodiumItem entry={top3[2]} rank={3} />}
    </div>
  );
};

export default Podium;

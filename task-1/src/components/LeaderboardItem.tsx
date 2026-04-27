import type { LeaderboardEntry } from '../services/api';

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
  rank: number;
}

const LeaderboardItem = ({ entry, rank }: LeaderboardItemProps) => {
  const initials = `${entry.firstName[0]}${entry.lastName[0]}`;

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl px-5 py-3.5 shadow-sm hover:shadow-md transition-shadow">
      {/* Rank */}
      <span className="w-7 text-center font-bold text-gray-400 text-sm shrink-0">
        {rank}
      </span>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold text-sm shrink-0">
        {initials}
      </div>

      {/* Name + Title */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 text-sm truncate">
          {entry.firstName} {entry.lastName}
        </p>
        <p className="text-xs text-gray-400 truncate">{entry.title}</p>
      </div>

      {/* Category & Quarter badges */}
      <div className="hidden sm:flex items-center gap-2 shrink-0">
        <span className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2 py-0.5 rounded-full">
          {entry.category}
        </span>
        <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-full">
          {entry.quarter} {entry.year}
        </span>
      </div>

      {/* Score */}
      <div className="flex items-center gap-1 shrink-0 ml-2">
        <span className="text-amber-400 text-sm">⭐</span>
        <span className="font-bold text-gray-700 text-sm">
          {entry.score.toLocaleString()}
        </span>
      </div>

      {/* Dropdown arrow (UI only) */}
      <button
        className="text-gray-300 hover:text-gray-500 transition-colors shrink-0 ml-1"
        aria-label="Expand"
        tabIndex={-1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default LeaderboardItem;

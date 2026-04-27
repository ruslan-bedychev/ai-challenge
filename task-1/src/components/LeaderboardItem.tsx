import type { LeaderboardUser } from '../types';

interface LeaderboardItemProps {
  entry: LeaderboardUser;
  rank: number;
}

const LeaderboardItem = ({ entry, rank }: LeaderboardItemProps) => {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-5 py-3.5 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-default">
      {/* Rank */}
      <span className="w-6 text-center font-semibold text-gray-400 text-sm shrink-0">
        {rank}
      </span>

      {/* Avatar */}
      <img
        src={`https://i.pravatar.cc/100?img=${entry.id}`}
        alt={`${entry.firstName} ${entry.lastName}`}
        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
      />

      {/* Name + Title */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate">
          {entry.firstName} {entry.lastName}
        </p>
        <p className="text-sm text-gray-500 truncate">{entry.title}</p>
      </div>

      {/* Badges */}
      <div className="hidden sm:flex items-center gap-2 shrink-0">
        <span className="text-xs bg-blue-50 text-blue-600 font-medium rounded-full px-2 py-1">
          {entry.category}
        </span>
        <span className="text-xs bg-gray-100 text-gray-500 font-medium rounded-full px-2 py-1">
          {entry.quarter} {entry.year}
        </span>
      </div>

      {/* Score */}
      <div className="flex items-center gap-1.5 shrink-0 ml-2 bg-gray-100 border border-gray-200 rounded-full px-3 py-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
        <span className="font-semibold text-gray-700 text-sm">
          {entry.score.toLocaleString()}
        </span>
      </div>

      {/* Chevron (UI only) */}
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

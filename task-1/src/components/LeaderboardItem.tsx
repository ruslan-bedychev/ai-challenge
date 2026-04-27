import { useState } from 'react';
import type { LeaderboardUser } from '../types';

interface LeaderboardItemProps {
  entry: LeaderboardUser;
  rank: number;
}

const TECHNICAL_CATS = new Set(['Engineering', 'Analytics', 'QA', 'Operations', 'Security']);

const LeaderboardItem = ({ entry, rank }: LeaderboardItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const techCount = entry.activities.filter((a) => TECHNICAL_CATS.has(a.category)).length;
  const otherCount = entry.activities.filter((a) => !TECHNICAL_CATS.has(a.category)).length;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Main row — entire row is clickable */}
      <div
        className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
      >
        {/* Rank */}
        <span className="w-6 text-center font-medium text-gray-400 text-sm shrink-0">
          {rank}
        </span>

        {/* Avatar */}
        <img
          src={`https://i.pravatar.cc/100?img=${entry.id}`}
          alt={`${entry.firstName} ${entry.lastName}`}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />

        {/* Name + Title */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 text-sm truncate">
            {entry.firstName} {entry.lastName}
          </p>
          <p className="text-xs text-gray-500 truncate">{entry.title}</p>
        </div>

        {/* Stat icons */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          {techCount > 0 && (
            <div className="flex items-center gap-1 text-blue-500">
              {/* Monitor / screen icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <path strokeLinecap="round" d="M8 21h8M12 17v4" />
              </svg>
              <span className="text-sm font-medium">{techCount}</span>
            </div>
          )}
          {otherCount > 0 && (
            <div className="flex items-center gap-1 text-blue-500">
              {/* Eye icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-sm font-medium">{otherCount}</span>
            </div>
          )}
        </div>

        {/* Score section */}
        <div className="shrink-0 text-right ml-2 min-w-[64px]">
          <p className="text-xs text-gray-400 uppercase tracking-wide leading-none mb-0.5">
            TOTAL
          </p>
          <div className="flex items-center justify-end gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
            <span className="font-bold text-blue-600 text-sm">
              {entry.score.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Toggle chevron */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="ml-1 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-150 shrink-0"
          aria-label={isOpen ? 'Collapse' : 'Expand'}
        >
          <svg
            className={`w-4 h-4 text-blue-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Expandable activity panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-5 mb-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Recent Activity
          </p>
          <div className="space-y-3">
            {entry.activities.map((activity) => (
              <div key={activity.id} className="flex justify-between items-center text-sm">
                <div className="min-w-0 mr-4">
                  <p className="text-gray-900 font-medium truncate">{activity.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activity.category} &bull; {activity.date}
                  </p>
                </div>
                <span className="text-blue-600 font-semibold shrink-0">
                  +{activity.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardItem;

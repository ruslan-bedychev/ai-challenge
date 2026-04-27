import type { LeaderboardUser } from '../types';
import LeaderboardItem from './LeaderboardItem';

interface LeaderboardListProps {
  entries: LeaderboardUser[];
}

const LeaderboardList = ({ entries }: LeaderboardListProps) => {
  if (entries.length === 0) {
    return (
      <p className="text-center text-gray-400 text-sm py-6">
        No results found.
      </p>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {entries.map((entry, index) => (
        <LeaderboardItem key={entry.id} entry={entry} rank={index + 1} />
      ))}
    </div>
  );
};

export default LeaderboardList;

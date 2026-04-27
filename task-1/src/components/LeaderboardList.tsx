import type { LeaderboardEntry } from '../services/api';
import LeaderboardItem from './LeaderboardItem';

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
}

const LeaderboardList = ({ entries }: LeaderboardListProps) => {
  const listEntries = entries.slice(3);

  if (listEntries.length === 0) {
    return (
      <p className="text-center text-gray-400 text-sm py-6">
        No additional entries.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      {listEntries.map((entry, index) => (
        <LeaderboardItem key={entry.id} entry={entry} rank={index + 4} />
      ))}
    </div>
  );
};

export default LeaderboardList;

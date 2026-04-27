import data from '../data/leaderboard.json';

export interface LeaderboardEntry {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  score: number;
  year: number;
  quarter: string;
  category: string;
}

export function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const delay = 300 + Math.random() * 200;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data as LeaderboardEntry[]);
    }, delay);
  });
}

import data from '../data/leaderboard.json';
import type { LeaderboardUser } from '../types';

// Re-export for backward compatibility
export type { LeaderboardUser };
/** @deprecated Use LeaderboardUser instead */
export type LeaderboardEntry = LeaderboardUser;

export function getLeaderboard(): Promise<LeaderboardUser[]> {
  const delay = 300 + Math.random() * 200;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data as LeaderboardUser[]);
    }, delay);
  });
}

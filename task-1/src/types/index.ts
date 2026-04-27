export interface ActivityItem {
  id: number;
  name: string;
  category: string;
  date: string;
  points: number;
}

export interface LeaderboardUser {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  score: number;
  year: number;
  quarter: string;
  category: string;
  activities: ActivityItem[];
}

# Leaderboard App — Report

## Tools Used

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI component framework |
| TypeScript | 5 | Type-safe JavaScript |
| Vite | 6 | Build tool and dev server |
| Tailwind CSS | 4 (via `@tailwindcss/vite`) | Utility-first styling |

No third-party UI component libraries were used. All layout and visual components are built from scratch with Tailwind utility classes.

---

## Mock Data Approach

All data lives in `src/data/leaderboard.json`. It contains 15 fictional employees with the following fields:

- `id`, `firstName`, `lastName`, `title` — identity fields using clearly fake names
- `score` — integer between 5,000–10,000 used for ranking
- `year` — either 2024 or 2025
- `quarter` — one of Q1, Q2, Q3, Q4
- `category` — one of Engineering, Product, Design, Analytics, Marketing, Sales

The mock API in `src/services/api.ts` wraps this JSON in a `Promise` with a 300–500 ms simulated network delay, mimicking a real REST endpoint:

```ts
export function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const delay = 300 + Math.random() * 200;
  return new Promise((resolve) => {
    setTimeout(() => resolve(data as LeaderboardEntry[]), delay);
  });
}
```

---

## How Real Data Was Replaced Safely

- **No real names or personal information** — all identities are invented (e.g., "Alex Carter", "Morgan Blake").
- **No real corporate data** — categories, titles, and scores are all fabricated.
- **No external API calls** — data is bundled locally inside the project; no network requests leave the browser.
- **Type safety** — the `LeaderboardEntry` interface enforces the expected data shape, so swapping in a real API only requires changing `api.ts` to a `fetch()` call while keeping all components untouched.

---

## Filtering Logic

Filtering is implemented entirely on the client side inside `App.tsx` using `useMemo`:

1. **Year filter** — compares `String(entry.year)` with the selected year string.
2. **Quarter filter** — exact match on `entry.quarter` (e.g., `"Q1"`).
3. **Category filter** — exact match on `entry.category` (e.g., `"Engineering"`).
4. **Search** — case-insensitive substring match on the concatenated full name (`firstName + " " + lastName`).

All four filters are AND-combined, meaning each active filter narrows the result set further. After filtering, results are sorted by `score` descending. The podium and list both receive the same `filtered` array, so ranking always stays consistent with the current filter state.

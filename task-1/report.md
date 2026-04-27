# Leaderboard App — Report

## Approach

The task was to reproduce the visual appearance of an existing SharePoint leaderboard web part as a standalone React application, replacing the original proprietary data with safe mock data.

The reference was a saved SharePoint page (`.htm` file) that embedded a compiled leaderboard web part bundle. Rather than guessing colors and fonts, the exact CSS values were extracted directly from the bundled JavaScript (`leaderboard-web-part_*.js`) using targeted `grep` searches on CSS class blocks (e.g., `podiumBlock_2943a085`, `avatar_2943a085`, `rank_2943a085`). This gave the precise hex values, gradients, border radii, font sizes, and box-shadow values used in the original — which were then applied 1-to-1 in the React components via inline styles.

---

## Tools and Techniques

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI component framework |
| TypeScript | 5 | Type-safe JavaScript |
| Vite | 6 | Build tool and dev server |
| Tailwind CSS | 4 (via `@tailwindcss/vite`) | Layout utilities |

No third-party UI component libraries were used. All components are built from scratch.

Pixel-exact styling was achieved by:
1. Extracting CSS from the original compiled JS bundle via regex grep on class name patterns
2. Mapping every visual token (colors, gradients, sizes, shadows) directly to inline styles in the React components
3. Matching the original layout: three-column podium with rank-1 elevated center, individual row cards for ranks 4+, a separate filter bar card, and the podium/title area sitting directly on the page background

---

## Data Replacement

The original leaderboard pulled employee data from a SharePoint list via the web part's internal API. This was replaced with a fully local mock:

- **`src/data/leaderboard.json`** — 15 fictional employees with invented names, job titles, scores, years, quarters, categories, and activity logs. No real names or corporate data are included.
- **`src/services/api.ts`** — wraps the JSON in a `Promise` with a simulated 300–500 ms delay, mimicking the shape of a real REST call. Swapping in a live endpoint only requires changing this one file.
- **Type safety** — the `LeaderboardUser` interface enforces the data shape across all components, so the real-data replacement is isolated to the service layer.

---

## Filtering Logic

All filtering runs client-side in `App.tsx` via `useMemo`:

- **Year**, **Quarter**, **Category** — exact-match dropdowns populated dynamically from the data
- **Search** — case-insensitive substring match on the full name

Filters are AND-combined and applied before sorting by score descending. The podium and ranked list share the same filtered array, so rankings stay consistent with any active filter state.


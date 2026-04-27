import { useState, useEffect, useMemo } from 'react';
import { getLeaderboard } from './services/api';
import type { LeaderboardUser } from './types';
import Filters from './components/Filters';
import Podium from './components/Podium';
import LeaderboardList from './components/LeaderboardList';
import './index.css';

function App() {
  const [data, setData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedYear, setSelectedYear] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getLeaderboard().then((entries) => {
      setData(entries);
      setLoading(false);
    });
  }, []);

  const years = useMemo(
    () => [...new Set(data.map((e) => e.year))].sort((a, b) => b - a),
    [data]
  );
  const quarters = useMemo(
    () => [...new Set(data.map((e) => e.quarter))].sort(),
    [data]
  );
  const categories = useMemo(
    () => [...new Set(data.map((e) => e.category))].sort(),
    [data]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data
      .filter((e) => {
        if (selectedYear && String(e.year) !== selectedYear) return false;
        if (selectedQuarter && e.quarter !== selectedQuarter) return false;
        if (selectedCategory && e.category !== selectedCategory) return false;
        if (q) {
          const fullName = `${e.firstName} ${e.lastName}`.toLowerCase();
          if (!fullName.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.score - a.score);
  }, [data, selectedYear, selectedQuarter, selectedCategory, search]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        {/* Main white card: title + subtitle + filters + podium */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="px-6 pt-6 pb-5">
            <h2 className="text-xl font-semibold text-gray-900">Leaderboard</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Top performers based on contributions and activity
            </p>
            <div className="mt-4">
              <Filters
                years={years}
                quarters={quarters}
                categories={categories}
                selectedYear={selectedYear}
                selectedQuarter={selectedQuarter}
                selectedCategory={selectedCategory}
                search={search}
                onYearChange={setSelectedYear}
                onQuarterChange={setSelectedQuarter}
                onCategoryChange={setSelectedCategory}
                onSearchChange={setSearch}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Podium entries={filtered} />
          )}
        </div>

        {/* Ranked list — individual cards per row */}
        {!loading && <LeaderboardList entries={filtered} />}
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect, useMemo } from 'react';
import { getLeaderboard } from './services/api';
import type { LeaderboardUser } from './types';
import Header from './components/Header';
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
    <div className="min-h-screen" style={{ backgroundColor: '#f6f7f9' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <Header />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Section header */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Leaderboard</h2>
          <p className="text-sm text-gray-500 mt-1">
            Top performers based on contributions and activity
          </p>
        </div>

        {/* Filters */}
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Podium */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm py-6 px-4">
              <Podium entries={filtered} />
            </div>

            {/* List */}
            <LeaderboardList entries={filtered} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

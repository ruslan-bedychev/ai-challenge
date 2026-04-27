import type { ChangeEvent } from 'react';

interface FiltersProps {
  years: number[];
  quarters: string[];
  categories: string[];
  selectedYear: string;
  selectedQuarter: string;
  selectedCategory: string;
  search: string;
  onYearChange: (value: string) => void;
  onQuarterChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

const Filters = ({
  years,
  quarters,
  categories,
  selectedYear,
  selectedQuarter,
  selectedCategory,
  search,
  onYearChange,
  onQuarterChange,
  onCategoryChange,
  onSearchChange,
}: FiltersProps) => {
  const selectCls =
    'bg-white border border-gray-300 text-gray-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer';

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Year dropdown */}
      <select
        aria-label="Filter by year"
        className={selectCls}
        value={selectedYear}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onYearChange(e.target.value)}
      >
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={String(y)}>
            {y}
          </option>
        ))}
      </select>

      {/* Quarter dropdown */}
      <select
        aria-label="Filter by quarter"
        className={selectCls}
        value={selectedQuarter}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onQuarterChange(e.target.value)}
      >
        <option value="">All Quarters</option>
        {quarters.map((q) => (
          <option key={q} value={q}>
            {q}
          </option>
        ))}
      </select>

      {/* Category dropdown */}
      <select
        aria-label="Filter by category"
        className={selectCls}
        value={selectedCategory}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search employee..."
          className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;

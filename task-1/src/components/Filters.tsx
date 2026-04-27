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
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Year dropdown */}
      <select
        aria-label="Filter by year"
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
      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Filters;

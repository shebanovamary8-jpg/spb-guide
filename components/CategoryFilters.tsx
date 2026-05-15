"use client";

import type { Category } from "@/types/place";
import { ALL_CATEGORIES, CATEGORY_LABELS } from "@/types/place";

export type FilterValue = Category | null;

type CategoryFiltersProps = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
};

export function CategoryFilters({ value, onChange }: CategoryFiltersProps) {
  const handleClick = (category: Category) => {
    onChange(value === category ? null : category);
  };

  return (
    <div className="filters-block">
      <h2 className="filters-title">Какие планы?</h2>
      <div className="filters-list">
        {ALL_CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            label={CATEGORY_LABELS[category]}
            selected={value === category}
            onClick={() => handleClick(category)}
          />
        ))}
      </div>
    </div>
  );
}

type FilterChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

function FilterChip({ label, selected, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={selected ? "filter-chip filter-chip--selected" : "filter-chip"}
    >
      {label}
    </button>
  );
}

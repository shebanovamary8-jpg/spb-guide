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
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-base tracking-wide text-foreground">Какие планы?</h2>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
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
      className={[
        "rounded-full border border-foreground px-4 py-1.5 text-sm tracking-wide transition-colors",
        "hover:border-accent hover:text-accent",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        selected
          ? "border-foreground bg-foreground text-background"
          : "bg-transparent text-foreground",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

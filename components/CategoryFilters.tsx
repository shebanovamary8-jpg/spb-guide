"use client";

import type { Category } from "@/types/place";
import { ALL_CATEGORIES, CATEGORY_LABELS } from "@/types/place";

export type FilterValue = "all" | Category;

type CategoryFiltersProps = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
};

export function CategoryFilters({ value, onChange }: CategoryFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Что ищете?
      </p>
      <div className="flex flex-wrap gap-2">
        <FilterChip
          label="Все"
          selected={value === "all"}
          onClick={() => onChange("all")}
        />
        {ALL_CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            label={CATEGORY_LABELS[category]}
            selected={value === category}
            onClick={() => onChange(category)}
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
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-100",
        selected
          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
          : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-800",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

"use client";

import { useMemo, useState } from "react";
import { CategoryFilters, type FilterValue } from "@/components/CategoryFilters";
import { PlaceCard } from "@/components/PlaceCard";
import { places } from "@/data/places";
import type { Category } from "@/types/place";

function filterPlaces(
  list: typeof places,
  filter: FilterValue,
): typeof places {
  if (filter === "all") return list;
  return list.filter((p) =>
    p.categories.includes(filter as Category),
  );
}

export default function Home() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visible = useMemo(() => filterPlaces(places, filter), [filter]);

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            SPB Guide
          </h1>
          <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Подборка мест в Санкт-Петербурге: поесть, выпить, погулять и
            открыть для себя город. Выберите категорию — покажем подходящие
            локации.
          </p>
        </header>

        <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <CategoryFilters value={filter} onChange={setFilter} />
        </section>

        <section
          className="mt-10"
          aria-live="polite"
          aria-label="Список мест"
        >
          {visible.length === 0 ? (
            <p className="rounded-lg border border-dashed border-zinc-300 bg-white px-4 py-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
              По этой категории пока нет мест в подборке.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((place) => (
                <li key={place.id}>
                  <PlaceCard place={place} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

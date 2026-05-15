"use client";

import { useMemo, useState } from "react";
import { CategoryFilters, type FilterValue } from "@/components/CategoryFilters";
import { PlaceCard } from "@/components/PlaceCard";
import { places } from "@/data/places";
import type { Category } from "@/types/place";

function filterPlaces(list: typeof places, filter: FilterValue) {
  if (filter === null) return list;
  return list.filter((p) => p.categories.includes(filter as Category));
}

export default function Home() {
  const [filter, setFilter] = useState<FilterValue>(null);

  const visible = useMemo(() => filterPlaces(places, filter), [filter]);

  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-0 pt-10 sm:px-8 sm:pt-14">
        {/* Hero */}
        <header className="relative text-center">
          <p className="text-sm tracking-wide">привет!</p>

          <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
            <span className="absolute right-0 top-2 h-16 w-12 border-b-2 border-foreground" />
            <span className="absolute left-4 top-24 h-20 w-14 border-2 border-foreground" />
            <span className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col gap-2">
              <span className="mx-auto block h-px w-16 bg-foreground" />
              <span className="mx-auto block h-px w-24 bg-foreground" />
              <span className="mx-auto block h-px w-12 bg-foreground" />
              <span className="mx-auto block h-px w-20 bg-foreground" />
            </span>
          </div>

          <p className="mx-auto mt-16 max-w-md text-sm leading-relaxed sm:mt-20 sm:max-w-lg sm:text-base">
            Я Маруся, уже 4 раза была в Питере и каждый раз открываю этот город с
            новой стороны. Тут собраны места, которые я уже успела посетить. И если
            ты доверяешь моему мнению — добро пожаловать в подборку
          </p>

          <div className="mt-10 flex items-center justify-between border-t border-foreground/30 pt-3 text-xs tracking-wide sm:text-sm">
            <span>Смотреть Питер</span>
            <span
              className="inline-block h-3 w-5 border border-foreground"
              aria-hidden
            />
            <span>Обновлено: 2024</span>
          </div>
        </header>

        {/* Filters */}
        <section className="mt-14 sm:mt-16">
          <CategoryFilters value={filter} onChange={setFilter} />
        </section>

        {/* Places */}
        <section
          className="mt-12 sm:mt-14"
          aria-live="polite"
          aria-label="Список мест"
        >
          {visible.length === 0 ? (
            <p className="border border-dashed border-foreground/40 px-4 py-10 text-center text-sm">
              По этой категории пока нет мест в подборке.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-6">
              {visible.map((place) => (
                <li key={place.id}>
                  <PlaceCard place={place} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gradient-to-b from-background via-[#ddb89e] to-accent px-5 pb-8 pt-20 text-center text-sm sm:mt-20 sm:px-8 sm:pt-28">
        <p className="text-base tracking-wide">Классной поездки!</p>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 text-xs tracking-wide sm:flex-row sm:text-sm">
          <span>Задизайнила Маруся</span>
          <span className="flex gap-3">
            <a href="#" className="transition-colors hover:text-background">
              телега
            </a>
            <span>/</span>
            <a href="#" className="transition-colors hover:text-background">
              инста
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

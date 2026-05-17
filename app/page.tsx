"use client";

import { useMemo, useState } from "react";
import { CategoryFilters, type FilterValue } from "@/components/CategoryFilters";
import { PlaceCard } from "@/components/PlaceCard";
import { places } from "@/data/places";
import type { Category } from "@/types/place";

const CARD_SPAN_CLASSES = [
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-3",
] as const;

function getCardSpan(index: number): (typeof CARD_SPAN_CLASSES)[number] {
  return CARD_SPAN_CLASSES[index % CARD_SPAN_CLASSES.length];
}

function filterPlaces(list: typeof places, filter: FilterValue) {
  if (filter === null) return list;
  return list.filter((p) => p.categories.includes(filter as Category));
}

export default function Home() {
  const [filter, setFilter] = useState<FilterValue>(null);

  const visible = useMemo(() => filterPlaces(places, filter), [filter]);

  return (
    <div className="page-wrapper">
      <main className="w-full flex-1">
        <section className="hero-section">
          <div className="site-container">
            <div className="hero-layout">
              <header className="hero-layout-inner">
                <div className="hero-top">
                  <p className="hero-greeting">привет!</p>
                </div>

                <div className="hero-center">
                  <p className="hero-intro">
                    Я Маруся, уже 4 раза была в Питере и каждый раз открываю
                    этот город с новой стороны. Тут собраны места, которые я уже
                    успела посетить. И если ты доверяешь моему мнению — добро
                    пожаловать в подборку
                  </p>
                </div>

                <div className="hero-bottom">
                  <div className="hero-status-bar">
                    <span>Смотреть Питер</span>
                    <span>Обновлено: 2026</span>
                  </div>
                </div>
              </header>
            </div>
          </div>
        </section>

        <section className="filters-section">
          <div className="site-container">
            <CategoryFilters value={filter} onChange={setFilter} />
          </div>
        </section>

        <section
          className="places-section"
          aria-live="polite"
          aria-label="Список мест"
        >
          <div className="site-container">
            {visible.length === 0 ? (
              <p className="places-empty">
                По этой категории пока нет мест в подборке.
              </p>
            ) : (
              <ul className="places-grid">
                {visible.map((place, index) => (
                  <li
                    key={place.id}
                    className={`min-w-0 ${getCardSpan(index)}`}
                  >
                    <PlaceCard place={place} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <footer className="footer-section">
        <div className="footer-gradient">
          <div className="site-container">
            <p className="footer-message">Классной поездки!</p>
            <div className="footer-credits">
              <span>Задизайнила Маруся</span>
              <span className="footer-links">
                <a href="#" className="footer-link">
                  телега
                </a>
                <span>/</span>
                <a href="#" className="footer-link">
                  инста
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

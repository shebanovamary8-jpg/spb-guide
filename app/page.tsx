"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CategoryFilters, type FilterValue } from "@/components/CategoryFilters";
import { PlaceCard } from "@/components/PlaceCard";
import { places } from "@/data/places";
import type { Category } from "@/types/place";
import { preventHangingPrepositions } from "@/lib/typography";
import { getPlacesFromSupabase } from "@/lib/getPlacesFromSupabase";

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
  const [loadedPlaces, setLoadedPlaces] = useState<typeof places>(places);
  const [isStatusActive, setIsStatusActive] = useState(false);
  const [isStatusPinned, setIsStatusPinned] = useState(false);
  const [showStickyFilters, setShowStickyFilters] = useState(false);

  const statusAnchorRef = useRef<HTMLDivElement | null>(null);
  const filtersSectionRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);

  const visible = useMemo(
    () => filterPlaces(loadedPlaces, filter),
    [loadedPlaces, filter],
  );
  const contentLayerClassName = [
    "content-layer",
    isStatusActive && !isStatusPinned ? "content-layer--shadow" : "",
  ]
    .filter(Boolean)
    .join(" ");
  
  const statusArrowClassName = isStatusActive
    ? "hero-status-arrow hero-status-arrow--active"
    : "hero-status-arrow";
  
  const statusIconSrc = isStatusActive
    ? "/icons/status-scroll.svg"
    : "/icons/arrow-down.svg";

    useEffect(() => {
      let isMounted = true;
    
      async function loadPlaces() {
        try {
          const supabasePlaces = await getPlacesFromSupabase();
    
          if (isMounted && supabasePlaces.length > 0) {
            setLoadedPlaces(supabasePlaces);
          }
        } catch (error) {
          console.error("Failed to load places from Supabase", error);
        }
      }
    
      loadPlaces();
    
      return () => {
        isMounted = false;
      };
    }, []);
    
    useEffect(() => {
      function updateScrollState() {
        const statusAnchor = statusAnchorRef.current;
    
        if (!statusAnchor) return;
    
        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY < lastScrollYRef.current;
    
        const statusRect = statusAnchor.getBoundingClientRect();
    
        const shouldActivateStatus = currentScrollY > 1;
        const shouldPinStatus = shouldActivateStatus && statusRect.top <= 0;
    
        const shouldShowStickyFilters =
          shouldPinStatus && isScrollingUp && currentScrollY > 300;
    
        setIsStatusActive(shouldActivateStatus);
        setIsStatusPinned(shouldPinStatus);
        setShowStickyFilters(shouldShowStickyFilters);
    
        lastScrollYRef.current = currentScrollY;
      }
    
      updateScrollState();
    
      window.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
    
      return () => {
        window.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }, []);

  return (
    <div className="page-wrapper">
      <section className="hero-section">
        <div className="site-container">
          <div className="hero-layout">
            <header className="hero-layout-inner">
              <div className="hero-top">
                <p className="hero-greeting">Привет!</p>
              </div>
  
              <div className="hero-center">
              <p className="hero-intro">
  {preventHangingPrepositions(
    "Я Маруся, уже 4 раза была в Питере и каждый раз открываю этот город с новой стороны. Тут собраны места, которые я уже успела посетить. И если ты доверяешь моему мнению — добро пожаловать в подборку",
  )}
</p>
              </div>
            </header>
          </div>
        </div>
      </section>
  
      <div className={contentLayerClassName}>
       <div ref={statusAnchorRef} className="hero-status-shell">
         <div className="hero-status-bar">
           <span className="hero-status-left">Смотреть Питер</span>

           <img
             src={statusIconSrc}
             alt=""
             aria-hidden="true"
             className={statusArrowClassName}
           />

           <span className="hero-status-right">Обновлено: 2026</span>
         </div>
       </div>

       {showStickyFilters ? (
         <div className="sticky-filters-panel">
           <CategoryFilters value={filter} onChange={setFilter} />
         </div>
       ) : null}

       <main className="w-full flex-1">
  
       <section ref={filtersSectionRef} className="filters-section">
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
    <div className="footer-grid">
      <p className="footer-left">
        Задизайнила и завайбкодила Маруся.
        <br />
        Связь:{" "}
        <a
          href="https://t.me/maresikkk"
          className="footer-link"
          target="_blank"
          rel="noreferrer"
        >
          телега
        </a>{" "}
        / инста
      </p>

      <p className="footer-center">Классной поездки!</p>

      <p className="footer-right">
  {preventHangingPrepositions(
    "Здесь скоро появится форма для ваших любимых мест Питера. Пока можно написать в телегу",
  )}
</p>
    </div>
  </div>
</footer>
      </div>
    </div>
  );
}

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
  "lg:col-span-4",

  "lg:col-span-3",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",

  "lg:col-span-5",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-4",

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
  const stickyFiltersShownAtYRef = useRef(0);
  const stickyFiltersRef = useRef<HTMLDivElement | null>(null);

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
        const filtersSection = filtersSectionRef.current;
    
        if (!statusAnchor || !filtersSection) return;
    
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollYRef.current;
    
        const isTouchDevice =
          window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    
        const showThreshold = isTouchDevice ? -8 : -6;
        const hideDistance = isTouchDevice ? 220 : 60;
    
        const isScrollingUp = scrollDelta < showThreshold;
        const isScrollingDown = scrollDelta > hideDistance;
    
        const statusRect = statusAnchor.getBoundingClientRect();
    
        const shouldActivateStatus = currentScrollY > 1;
        const shouldPinStatus = shouldActivateStatus && statusRect.top <= 0;
    
        const statusHeight = statusAnchor.offsetHeight || 60;
    
        const filtersTop = filtersSection.offsetTop;
        const filtersBottom = filtersTop + filtersSection.offsetHeight;
    
        /**
         * Когда мы скроллим вверх, sticky-фильтры должны исчезнуть
         * только когда оригинальные фильтры уже почти доехали до зоны под status bar.
         */
        const originalFiltersReachedStickyZone =
          currentScrollY <= filtersTop - statusHeight;
    
        /**
         * Показываем sticky-фильтры только если оригинальные фильтры уже давно выше экрана.
         */
        const originalFiltersAreFarAbove =
          currentScrollY > filtersBottom + statusHeight;
    
        setIsStatusActive(shouldActivateStatus);
        setIsStatusPinned(shouldPinStatus);
    
        setShowStickyFilters((previousValue) => {
          if (!shouldPinStatus || currentScrollY < 300) {
            return false;
          }
    
          if (originalFiltersReachedStickyZone) {
            return false;
          }
    
          if (isScrollingUp && originalFiltersAreFarAbove) {
            stickyFiltersShownAtYRef.current = currentScrollY;
            return true;
          }
    
          if (previousValue && isScrollingDown) {
            return false;
          }
    
          if (previousValue && originalFiltersAreFarAbove) {
            return true;
          }
    
          return previousValue;
        });
    
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
      <svg
  className="rough-filter-defs"
  width="0"
  height="0"
  aria-hidden="true"
  focusable="false"
>
  <filter
    id="rough-border-filter"
    x="-20%"
    y="-20%"
    width="140%"
    height="140%"
  >
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.85"
      numOctaves="2"
      seed="8"
      result="noise"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="noise"
      scale="1.2"
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
</svg>
      <section className="hero-section">
        <div className="hero-illustration" aria-hidden="true" />
        <div className="site-container">
          <div className="hero-layout">
            <header className="hero-layout-inner">
              <div className="hero-top">
                <p className="hero-greeting">Привет!</p>
              </div>
  
              <div className="hero-center">
              <p className="hero-intro">
  Я Маруся,
  <br />
  уже&nbsp;4&nbsp;раза&nbsp;была в&nbsp;Питере
  <br />
  и&nbsp;каждый раз открываю этот город с&nbsp;новой стороны. Тут&nbsp;собраны места, которые
  <br />
  я&nbsp;уже&nbsp;успела посетить. И&nbsp;если
  <br />
  ты&nbsp;доверяешь моему мнению&nbsp;— добро
  <br />
  пожаловать в&nbsp;подборку
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
         <div ref={stickyFiltersRef} className="sticky-filters-panel">
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
          href="https://t.me/mmarrusyaa"
          className="footer-link"
          target="_blank"
          rel="noreferrer"
        >
          телега
        </a>{" "}
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

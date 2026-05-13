import type { Place } from "@/types/place";
import { CATEGORY_LABELS } from "@/types/place";

type PlaceCardProps = {
  place: Place;
};

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {place.name}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {place.shortDescription}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Категории">
        {place.categories.map((cat) => (
          <li key={cat}>
            <span className="inline-block rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {CATEGORY_LABELS[cat]}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

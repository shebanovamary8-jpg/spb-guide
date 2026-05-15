"use client";

import Image from "next/image";
import { useState } from "react";
import type { Category, Place } from "@/types/place";

const PLACEHOLDER_GRADIENTS: Record<Category, string> = {
  eat: "from-[#c4a88a] to-[#8b6f5c]",
  drink: "from-[#7a8b9a] to-[#4a5568]",
  see: "from-[#9a8b7a] to-[#5c5348]",
  relax: "from-[#a8b5a0] to-[#6b7a62]",
};

type PlaceCardProps = {
  place: Place;
};

export function PlaceCard({ place }: PlaceCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const gradientKey = place.categories[0] ?? "see";

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-background">
        {imageFailed ? (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[gradientKey]}`}
            aria-hidden
          />
        ) : (
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover transition-opacity group-hover:opacity-95"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImageFailed(true)}
          />
        )}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5"
          aria-hidden
        >
          <span className="h-1.5 w-1.5 rounded-full bg-background opacity-100" />
          <span className="h-1.5 w-1.5 rounded-full bg-background opacity-50" />
          <span className="h-1.5 w-1.5 rounded-full bg-background opacity-50" />
        </div>
      </div>
      <h2 className="mt-3 text-base leading-snug text-foreground">{place.name}</h2>
      <p className="mt-1 text-sm leading-relaxed text-foreground/80">
        {place.shortDescription}
      </p>
    </article>
  );
}

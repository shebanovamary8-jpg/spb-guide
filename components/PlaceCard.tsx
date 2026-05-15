"use client";

import Image from "next/image";
import { useState } from "react";
import type { Category, Place } from "@/types/place";

const PLACEHOLDER_CLASS: Record<Category, string> = {
  eat: "place-image-placeholder--eat",
  drink: "place-image-placeholder--drink",
  see: "place-image-placeholder--see",
  relax: "place-image-placeholder--relax",
};

type PlaceCardProps = {
  place: Place;
};

export function PlaceCard({ place }: PlaceCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const gradientKey = place.categories[0] ?? "see";

  return (
    <article className="card group">
      <div className="card-image-wrapper">
        {imageFailed ? (
          <div
            className={`absolute inset-0 ${PLACEHOLDER_CLASS[gradientKey]}`}
            aria-hidden
          />
        ) : (
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover transition-opacity group-hover:opacity-95"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 42vw"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="photo-dots" aria-hidden>
          <span className="photo-dot photo-dot-active" />
          <span className="photo-dot photo-dot-inactive" />
          <span className="photo-dot photo-dot-inactive" />
        </div>
      </div>
      <div className="card-content">
        <h2 className="card-title">{place.name}</h2>
        <p className="card-description">{place.shortDescription}</p>
      </div>
    </article>
  );
}

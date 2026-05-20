"use client";

import Image from "next/image";
import { useState } from "react";
import type { Category, Place } from "@/types/place";
import { preventHangingPrepositions } from "@/lib/typography";

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
  const images = place.images?.length
    ? place.images
    : place.image
      ? [place.image]
      : [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  const gradientKey = place.categories[0] ?? "see";
  const currentImage = images[currentImageIndex];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  function showPreviousImage() {
    if (!hasMultipleImages) return;

    setImageFailed(false);
    setCurrentImageIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  }

  function showNextImage() {
    if (!hasMultipleImages) return;

    setImageFailed(false);
    setCurrentImageIndex((currentIndex) =>
      currentIndex === images.length - 1 ? 0 : currentIndex + 1,
    );
  }

  function showImage(index: number) {
    setImageFailed(false);
    setCurrentImageIndex(index);
  }

  return (
    <article className="card">
      <div className="card-image-wrapper">
        {hasImages && currentImage && !imageFailed ? (
          <Image
            src={currentImage}
            alt={`${place.name}, фото ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-opacity group-hover:opacity-95"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${PLACEHOLDER_GRADIENTS[gradientKey]}`}
            aria-hidden
          />
        )}

        {hasMultipleImages ? (
          <>
            <button
              type="button"
              className="slider-click-zone slider-click-zone-left"
              aria-label={`Предыдущее фото места ${place.name}`}
              onClick={showPreviousImage}
            />

            <button
              type="button"
              className="slider-click-zone slider-click-zone-right"
              aria-label={`Следующее фото места ${place.name}`}
              onClick={showNextImage}
            />

            <div className="photo-dots" aria-label="Фотографии места">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={
                    index === currentImageIndex
                      ? "photo-dot photo-dot-active"
                      : "photo-dot photo-dot-inactive"
                  }
                  aria-label={`Показать фото ${index + 1}`}
                  aria-pressed={index === currentImageIndex}
                  onClick={() => showImage(index)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="card-content">
        <h2 className="card-title">{place.name}</h2>
        <p className="card-description">
  {preventHangingPrepositions(place.shortDescription)}
</p>
      </div>
    </article>
  );
}
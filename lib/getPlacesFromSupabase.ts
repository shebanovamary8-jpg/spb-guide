import { supabase } from "@/lib/supabase";
import type { Place } from "@/types/place";

type PlaceRow = {
  id: string;
  name: string;
  short_description: string;
  categories: string[];
};

type PlaceImageRow = {
  place_id: string;
  image_url: string;
  sort_order: number;
};

export async function getPlacesFromSupabase(): Promise<Place[]> {
  const { data: places, error: placesError } = await supabase
    .from("places")
    .select("id, name, short_description, categories")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  if (placesError) {
    throw placesError;
  }

  const { data: images, error: imagesError } = await supabase
    .from("place_images")
    .select("place_id, image_url, sort_order")
    .order("sort_order", { ascending: true });

  if (imagesError) {
    throw imagesError;
  }

  const imageRows = (images ?? []) as PlaceImageRow[];

  return ((places ?? []) as PlaceRow[]).map((place) => {
    const placeImages = imageRows
      .filter((image) => image.place_id === place.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((image) => image.image_url);

    return {
      id: place.id,
      name: place.name,
      shortDescription: place.short_description,
      categories: place.categories as Place["categories"],
      images: placeImages,
    };
  });
}
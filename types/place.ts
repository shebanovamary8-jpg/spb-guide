export type Category =
  | "eat"
  | "drink"
  | "walk"
  | "fun"
  | "scenic"
  | "atmosphere";

export type Place = {
  id: string;
  name: string;
  shortDescription: string;
  categories: Category[];
};

export const CATEGORY_LABELS: Record<Category, string> = {
  eat: "Поесть",
  drink: "Выпить",
  walk: "Погулять",
  fun: "Развлечься",
  scenic: "Красивое место",
  atmosphere: "Атмосферная локация",
};

export const ALL_CATEGORIES: Category[] = [
  "eat",
  "drink",
  "walk",
  "fun",
  "scenic",
  "atmosphere",
];

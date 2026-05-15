export type Category = "eat" | "drink" | "see" | "relax";

export type Place = {
  id: string;
  name: string;
  shortDescription: string;
  categories: Category[];
  image: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  eat: "поесть",
  drink: "выпить",
  see: "посмотреть",
  relax: "расслабиться",
};

export const ALL_CATEGORIES: Category[] = ["eat", "drink", "see", "relax"];

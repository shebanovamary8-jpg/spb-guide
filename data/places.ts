import type { Place } from "@/types/place";

export const places: Place[] = [
  {
    id: "umami",
    name: "Umami Shinkansen",
    shortDescription: "Азиатское бистро, где еда едет на поезде",
    categories: ["eat"],
    images: [
      "/places/umami/1.webp",
      "/places/umami/2.webp",
      "/places/umami/3.webp",
    ],
  },
  {
    id: "2",
    name: "1,5 комнаты Бродского",
    shortDescription: "Музей-квартира поэта на набережной Мойки",
    categories: ["see"],
  },
  {
    id: "3",
    name: "Laboratorio Distilita",
    shortDescription: "Бар с дистиллятами и коктейлями в центре",
    categories: ["drink"],
  },
  {
    id: "4",
    name: "Эрмитаж",
    shortDescription: "Музейный комплекс на Дворцовой набережной",
    categories: ["see"],
  },
  {
    id: "5",
    name: "Дом Зингера (книжный)",
    shortDescription: "Кафе наверху и вид на Казанский собор",
    categories: ["eat", "drink", "see"],
  },
  {
    id: "6",
    name: "Летний сад",
    shortDescription: "Парк с аллеями и фонтанами в центре города",
    categories: ["see", "relax"],
  },
  {
    id: "7",
    name: "«Севкабель Порт»",
    shortDescription: "Еда, музыка и закаты над Финским заливом",
    categories: ["eat", "drink", "see"],
  },
  {
    id: "8",
    name: "Крыша «Этажи»",
    shortDescription: "Смотровая площадка и бар с панорамой",
    categories: ["drink", "see"],
  },
  {
    id: "9",
    name: "Мариинский театр",
    shortDescription: "Опера и балет в классическом интерьере",
    categories: ["see"],
  },
  {
    id: "10",
    name: "Чайная «Китай-город»",
    shortDescription: "Чайная церемония и спокойная атмосфера",
    categories: ["relax"],
  },
  {
    id: "11",
    name: "Спас на Крови",
    shortDescription: "Храм и набережная канала Грибоедова",
    categories: ["see"],
  },
  {
    id: "12",
    name: "Новая Голландия",
    shortDescription: "Рестораны, рынок и прогулки у воды",
    categories: ["eat", "drink", "see", "relax"],
  },
];

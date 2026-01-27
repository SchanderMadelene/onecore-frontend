import type { UnpublishedHousingSpace } from "../types/unpublished-housing";

export const unpublishedHousingSpaces: UnpublishedHousingSpace[] = [
  {
    id: "234-234-234-0201",
    address: "Vasagatan 25, 3tr",
    area: "Centrum",
    type: "Lägenhet",
    size: "72m²",
    rent: "9200kr/mån",
    rooms: 3,
    floor: "3",
    seekers: 0,
    publishedFrom: "",
    publishedTo: "",
    status: "draft",
    lastModified: "2024-01-20",
    createdBy: "Anna Andersson",
    description: "",
    availableFrom: "2024-03-01"
  },
  {
    id: "234-234-234-0202",
    address: "Drottninggatan 18, 1tr",
    area: "Gamla Stan",
    type: "Lägenhet",
    size: "58m²",
    rent: "8100kr/mån",
    rooms: 2,
    floor: "1",
    seekers: 0,
    publishedFrom: "",
    publishedTo: "",
    status: "needs_review",
    lastModified: "2024-01-18",
    createdBy: "Erik Larsson",
    description: "",
    availableFrom: "2024-02-15"
  },
  {
    id: "234-234-234-0203",
    address: "Kungsgatan 42, 4tr",
    area: "Vasastan",
    type: "Lägenhet",
    size: "95m²",
    rent: "13500kr/mån",
    rooms: 4,
    floor: "4",
    seekers: 0,
    publishedFrom: "",
    publishedTo: "",
    status: "ready_to_publish",
    lastModified: "2024-01-22",
    createdBy: "Maria Nilsson",
    description: "",
    availableFrom: "2024-03-15"
  }
];

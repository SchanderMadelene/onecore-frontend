export interface HistoricalHousingSpace {
  id: string;
  address: string;
  area: string;
  type: string;
  size: string;
  rent: string;
  rooms: number;
  floor: string;
  seekers: number;
  publishedFrom: string;
  publishedTo: string;
  availableFrom: string;
  description: string;
  assignedTo: string;
  contractSignedDate: string;
  moveInDate: string;
}

export const historicalHousingSpaces: HistoricalHousingSpace[] = [
  {
    id: "234-234-234-9001",
    address: "Haga Parkgata 3, 2tr",
    area: "Haga",
    type: "Lägenhet",
    size: "74m²",
    rent: "9600kr/mån",
    rooms: 3,
    floor: "2",
    seekers: 22,
    publishedFrom: "2025-10-01",
    publishedTo: "2025-10-31",
    availableFrom: "2025-12-01",
    description: "Ljus trea med nytt kök",
    assignedTo: "Karin Svensson",
    contractSignedDate: "2025-11-10",
    moveInDate: "2025-12-01"
  },
  {
    id: "234-234-234-9002",
    address: "Östra Ringvägen 18, 1tr",
    area: "Malmaberg",
    type: "Lägenhet",
    size: "55m²",
    rent: "7400kr/mån",
    rooms: 2,
    floor: "1",
    seekers: 17,
    publishedFrom: "2025-09-15",
    publishedTo: "2025-10-15",
    availableFrom: "2025-11-15",
    description: "Renoverad tvåa med balkong",
    assignedTo: "Lars Olsson",
    contractSignedDate: "2025-10-28",
    moveInDate: "2025-11-15"
  },
  {
    id: "234-234-234-9003",
    address: "Skallbergsvägen 7, 4tr",
    area: "Skallberget",
    type: "Lägenhet",
    size: "48m²",
    rent: "6200kr/mån",
    rooms: 1,
    floor: "4",
    seekers: 9,
    publishedFrom: "2025-11-01",
    publishedTo: "2025-11-30",
    availableFrom: "2026-01-01",
    description: "Etta med fin utsikt",
    assignedTo: "Amir Khalil",
    contractSignedDate: "2025-12-12",
    moveInDate: "2026-01-01"
  },
  {
    id: "234-234-234-9004",
    address: "Pilgatan 14, 3tr",
    area: "Centrum",
    type: "Lägenhet",
    size: "88m²",
    rent: "11800kr/mån",
    rooms: 3,
    floor: "3",
    seekers: 38,
    publishedFrom: "2025-12-01",
    publishedTo: "2025-12-31",
    availableFrom: "2026-02-01",
    description: "Stor trea centralt",
    assignedTo: "Eva Lindgren",
    contractSignedDate: "2026-01-15",
    moveInDate: "2026-02-01"
  },
  {
    id: "234-234-234-9005",
    address: "Domkyrkoesplanaden 9, 2tr",
    area: "Centrum",
    type: "Lägenhet",
    size: "62m²",
    rent: "8500kr/mån",
    rooms: 2,
    floor: "2",
    seekers: 29,
    publishedFrom: "2026-01-01",
    publishedTo: "2026-01-31",
    availableFrom: "2026-03-01",
    description: "Charmig tvåa nära centrum",
    assignedTo: "Peter Nilsson",
    contractSignedDate: "2026-02-10",
    moveInDate: "2026-03-01"
  }
];

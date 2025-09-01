export interface PublishedHousingSpace {
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
}

export const publishedHousingSpaces: PublishedHousingSpace[] = [
  {
    id: "234-234-234-1001",
    address: "Kopparbergsvägen 14, 2tr",
    area: "Björkbacken",
    type: "Lägenhet",
    size: "68m²",
    rent: "8900kr/mån",
    rooms: 2,
    floor: "2",
    seekers: 15,
    publishedFrom: "2024-01-15",
    publishedTo: "2024-01-20", // Expired - should be ready for offer
    availableFrom: "2024-03-01",
    description: "Fin tvårummare med balkong"
  },
  {
    id: "234-234-234-1002", 
    address: "Sigurdsgatan 8, 4tr",
    area: "Centrum",
    type: "Lägenhet",
    size: "52m²",
    rent: "7200kr/mån",
    rooms: 2,
    floor: "4",
    seekers: 23,
    publishedFrom: "2024-09-01",
    publishedTo: "2025-12-01", // Future - should remain published
    availableFrom: "2024-02-20",
    description: "Centralt belägen lägenhet"
  },
  {
    id: "234-234-234-1003",
    address: "Metallgatan 22, 1tr",
    area: "Malmaberg",
    type: "Lägenhet", 
    size: "85m²",
    rent: "11200kr/mån",
    rooms: 3,
    floor: "1",
    seekers: 31,
    publishedFrom: "2024-01-08",
    publishedTo: "2024-01-25", // Expired - should be ready for offer
    availableFrom: "2024-02-15",
    description: "Rymlig trea i lugnt område"
  },
  {
    id: "234-234-234-1004",
    address: "Ängsbacken 5, 3tr",
    area: "Hammarby",
    type: "Lägenhet",
    size: "44m²", 
    rent: "6100kr/mån",
    rooms: 1,
    floor: "3",
    seekers: 8,
    publishedFrom: "2024-01-20",
    publishedTo: "2025-03-20", // Future - should remain published
    availableFrom: "2024-03-10",
    description: "Mysig etta för singel"
  },
  {
    id: "234-234-234-1005",
    address: "Villagatan 12, 2tr",
    area: "Tillberga",
    type: "Lägenhet",
    size: "72m²",
    rent: "9400kr/mån", 
    rooms: 3,
    floor: "2",
    seekers: 19,
    publishedFrom: "2024-01-12",
    publishedTo: "2025-02-12", // Future - should remain published
    availableFrom: "2024-02-25",
    description: "Familjevänlig bostad"
  },
  {
    id: "234-234-234-1006",
    address: "Ringvägen 33, 1tr",
    area: "Frösunda",
    type: "Lägenhet",
    size: "95m²",
    rent: "12500kr/mån",
    rooms: 4,
    floor: "1",
    seekers: 42,
    publishedFrom: "2024-09-01",
    publishedTo: "2025-12-15", // Future - should remain published
    availableFrom: "2024-03-15",
    description: "Stor fyra för familjen"
  },
  {
    id: "234-234-234-1007",
    address: "Storgatan 15, 3tr",
    area: "Centrum",
    type: "Lägenhet",
    size: "58m²",
    rent: "8200kr/mån",
    rooms: 2,
    floor: "3",
    seekers: 28,
    publishedFrom: "2024-09-01",
    publishedTo: "2025-12-20", // Future - should remain published
    availableFrom: "2024-03-20",
    description: "Central tvåa med utsikt"
  },
  {
    id: "234-234-234-1008",
    address: "Lundagatan 7, 2tr",
    area: "Pettersberg",
    type: "Lägenhet",
    size: "42m²",
    rent: "5800kr/mån",
    rooms: 1,
    floor: "2",
    seekers: 12,
    publishedFrom: "2024-09-01",
    publishedTo: "2025-12-25", // Future - should remain published
    availableFrom: "2024-03-25",
    description: "Perfekt studentbostad"
  },
  {
    id: "234-234-234-1009",
    address: "Järnvägsgatan 28, 4tr",
    area: "Malmaberg",
    type: "Lägenhet",
    size: "78m²",
    rent: "10200kr/mån",
    rooms: 3,
    floor: "4",
    seekers: 35,
    publishedFrom: "2024-09-01",
    publishedTo: "2025-12-30", // Future - should remain published
    availableFrom: "2024-04-01",
    description: "Ljus trea med balkong mot söder"
  },
  {
    id: "234-234-234-1010",
    address: "Björkgatan 12, 1tr",
    area: "Hammarby",
    type: "Lägenhet",
    size: "65m²",
    rent: "8900kr/mån",
    rooms: 2,
    floor: "1",
    seekers: 18,
    publishedFrom: "2024-09-01",
    publishedTo: "2026-01-05", // Future - should remain published
    availableFrom: "2024-04-05",
    description: "Rymlig tvåa i barnvänligt område"
  }
];
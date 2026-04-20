export interface HistoryHousingSpace {
  id: string;
  address: string;
  area: string;
  type: string;
  size: string;
  rent: string;
  rooms: number;
  floor: string;
  contractedTo: string;
  contractedToCustomerNumber: string;
  contractStart: string;
  signedAt: string;
  applicants: number;
  preferredMoveOutDate: string;
}

export const historyHousingSpaces: HistoryHousingSpace[] = [
  {
    id: "234-234-234-9001",
    address: "Bergslagsvägen 22, 2tr",
    area: "Bjurhovda",
    type: "Lägenhet",
    size: "62m²",
    rent: "8200kr/mån",
    rooms: 2,
    floor: "2",
    contractedTo: "Lina Sjöberg",
    contractedToCustomerNumber: "P-104852",
    contractStart: "2024-09-01",
    preferredMoveOutDate: "2024-08-02",
    signedAt: "2024-07-18",
    applicants: 24,
  },
  {
    id: "234-234-234-9002",
    address: "Vegagatan 5, 1tr",
    area: "Centrum",
    type: "Lägenhet",
    size: "47m²",
    rent: "6900kr/mån",
    rooms: 2,
    floor: "1",
    contractedTo: "Mikael Forsberg",
    contractedToCustomerNumber: "P-098231",
    contractStart: "2024-10-01",
    preferredMoveOutDate: "2024-09-01",
    signedAt: "2024-08-22",
    applicants: 41,
  },
  {
    id: "234-234-234-9003",
    address: "Nybyggegatan 14, 3tr",
    area: "Malmaberg",
    type: "Lägenhet",
    size: "84m²",
    rent: "11100kr/mån",
    rooms: 3,
    floor: "3",
    contractedTo: "Eva Lindqvist",
    contractedToCustomerNumber: "P-115640",
    contractStart: "2024-11-01",
    preferredMoveOutDate: "2024-10-02",
    signedAt: "2024-09-12",
    applicants: 33,
  },
  {
    id: "234-234-234-9004",
    address: "Karlfeldtsgatan 8, 4tr",
    area: "Hammarby",
    type: "Lägenhet",
    size: "55m²",
    rent: "7800kr/mån",
    rooms: 2,
    floor: "4",
    contractedTo: "Oskar Lundgren",
    contractedToCustomerNumber: "P-121903",
    contractStart: "2024-12-01",
    preferredMoveOutDate: "2024-11-01",
    signedAt: "2024-10-04",
    applicants: 19,
  },
  {
    id: "234-234-234-9005",
    address: "Rosengatan 31, 2tr",
    area: "Skallberget",
    type: "Lägenhet",
    size: "92m²",
    rent: "12300kr/mån",
    rooms: 4,
    floor: "2",
    contractedTo: "Hanna Petersson",
    contractedToCustomerNumber: "P-088471",
    contractStart: "2025-01-15",
    preferredMoveOutDate: "2024-12-16",
    signedAt: "2024-11-20",
    applicants: 38,
  },
  {
    id: "234-234-234-9006",
    address: "Smedjegatan 17, 1tr",
    area: "Råby",
    type: "Lägenhet",
    size: "44m²",
    rent: "6300kr/mån",
    rooms: 1,
    floor: "1",
    contractedTo: "Daniel Åström",
    contractedToCustomerNumber: "P-132088",
    contractStart: "2025-02-01",
    preferredMoveOutDate: "2025-01-02",
    signedAt: "2024-12-09",
    applicants: 15,
  },
];

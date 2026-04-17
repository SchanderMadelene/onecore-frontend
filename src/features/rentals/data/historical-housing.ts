export interface HistoricalHousingSpace {
  id: string;
  address: string;
  area: string;
  type: string;
  size: string;
  rent: string;
  rooms: number;
  floor: string;
  publishedFrom: string;
  publishedTo: string;
  contractStart: string;
  contractEnd: string;
  tenant: string;
  tenantCustomerNumber: string;
  outcome: "rented" | "withdrawn" | "expired";
}

export const historicalHousingSpaces: HistoricalHousingSpace[] = [
  {
    id: "234-234-234-9001",
    address: "Sigurdsgatan 8, 1tr",
    area: "Hammarby",
    type: "Lägenhet",
    size: "62m²",
    rent: "8450kr/mån",
    rooms: 2,
    floor: "1",
    publishedFrom: "2023-09-04",
    publishedTo: "2023-09-18",
    contractStart: "2023-11-01",
    contractEnd: "2025-02-28",
    tenant: "Astrid Bergqvist",
    tenantCustomerNumber: "P158842",
    outcome: "rented",
  },
  {
    id: "234-234-234-9002",
    address: "Pilgatan 22, 4tr",
    area: "Centrum",
    type: "Lägenhet",
    size: "78m²",
    rent: "10200kr/mån",
    rooms: 3,
    floor: "4",
    publishedFrom: "2023-06-12",
    publishedTo: "2023-06-26",
    contractStart: "2023-08-15",
    contractEnd: "2024-12-31",
    tenant: "Henrik Sjödin",
    tenantCustomerNumber: "P162017",
    outcome: "rented",
  },
  {
    id: "234-234-234-9003",
    address: "Norra Allégatan 5, 2tr",
    area: "Vasastan",
    type: "Lägenhet",
    size: "54m²",
    rent: "7600kr/mån",
    rooms: 2,
    floor: "2",
    publishedFrom: "2024-02-01",
    publishedTo: "2024-02-15",
    contractStart: "",
    contractEnd: "",
    tenant: "—",
    tenantCustomerNumber: "—",
    outcome: "withdrawn",
  },
  {
    id: "234-234-234-9004",
    address: "Linnégatan 41, BV",
    area: "Skiljebo",
    type: "Lägenhet",
    size: "44m²",
    rent: "6450kr/mån",
    rooms: 1,
    floor: "BV",
    publishedFrom: "2023-11-20",
    publishedTo: "2023-12-04",
    contractStart: "2024-01-15",
    contractEnd: "2025-01-14",
    tenant: "Maja Lindholm",
    tenantCustomerNumber: "P171455",
    outcome: "rented",
  },
  {
    id: "234-234-234-9005",
    address: "Kvarngatan 11, 3tr",
    area: "Bäckby",
    type: "Lägenhet",
    size: "85m²",
    rent: "11800kr/mån",
    rooms: 4,
    floor: "3",
    publishedFrom: "2024-04-08",
    publishedTo: "2024-04-22",
    contractStart: "2024-06-01",
    contractEnd: "2025-09-30",
    tenant: "Oskar Wahlström",
    tenantCustomerNumber: "P180023",
    outcome: "rented",
  },
  {
    id: "234-234-234-9006",
    address: "Stallgatan 3, 1tr",
    area: "Pettersberg",
    type: "Lägenhet",
    size: "70m²",
    rent: "9100kr/mån",
    rooms: 3,
    floor: "1",
    publishedFrom: "2023-08-15",
    publishedTo: "2023-08-29",
    contractStart: "",
    contractEnd: "",
    tenant: "—",
    tenantCustomerNumber: "—",
    outcome: "expired",
  },
  {
    id: "234-234-234-9007",
    address: "Smedjegatan 18, 5tr",
    area: "Centrum",
    type: "Lägenhet",
    size: "92m²",
    rent: "13400kr/mån",
    rooms: 4,
    floor: "5",
    publishedFrom: "2024-01-22",
    publishedTo: "2024-02-05",
    contractStart: "2024-03-15",
    contractEnd: "2025-06-30",
    tenant: "Ingrid Falk",
    tenantCustomerNumber: "P184902",
    outcome: "rented",
  },
];

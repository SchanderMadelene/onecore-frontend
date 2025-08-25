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
    publishedTo: "2024-02-15",
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
    publishedFrom: "2024-01-10",
    publishedTo: "2024-02-10", 
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
    publishedTo: "2024-02-08",
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
    publishedTo: "2024-02-20",
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
    publishedTo: "2024-02-12",
    availableFrom: "2024-02-25",
    description: "Familjevänlig bostad"
  }
];
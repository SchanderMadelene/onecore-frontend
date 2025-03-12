
import { PropertyDetail } from "@/types/api";

// Property 2: Lindaren 2
export const property2: PropertyDetail = {
  id: "2",
  propertyObjectId: "P2",
  code: "FAST-002",
  designation: "Lindaren 2",
  municipality: "Västerås",
  parish: "Bäckby",
  propertyNumber: "Bäckby 1:22",
  direction: "S",
  address: "Götgatan 15, 72130 Västerås",
  purpose: "Bostad",
  buildingType: "Flerbostadshus",
  buildings: [
    {
      id: "B3",
      name: "Hus A",
      type: "Flerbostadshus",
      constructionYear: 1992,
      area: 1500,
      floors: 5,
      units: 20,
      tenants: 18,
      apartments: [
        {
          id: "A6",
          code: "3001",
          area: 78,
          rooms: 3,
          status: "Uthyrd"
        },
        {
          id: "A7",
          code: "3002",
          area: 55,
          rooms: 2,
          status: "Vakant"
        },
        {
          id: "A8",
          code: "3003",
          area: 92,
          rooms: 4,
          status: "Uthyrd"
        }
      ]
    }
  ],
  propertyMap: {
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg==",
    buildings: [
      {
        id: "B3",
        name: "Hus A",
        x: 200,
        y: 150,
        width: 250,
        height: 180
      }
    ]
  }
};

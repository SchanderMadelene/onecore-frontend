
import { PropertyDetail } from "@/types/api";

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
      name: "Byggnad A",
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
  maintenanceUnits: [
    {
      id: "MU4",
      name: "Tvättstuga Götgatan",
      type: "Tvättstuga",
      area: 60,
      constructionYear: 1995,
      lastRenovated: "2018-09-22",
      status: "Aktiv",
      description: "Gemensam tvättstuga för hela fastigheten"
    },
    {
      id: "MU5",
      name: "Miljörum",
      type: "Miljöbod",
      area: 35,
      constructionYear: 1992,
      status: "Under renovering",
      description: "Under renovering fram till 2023-09-01"
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

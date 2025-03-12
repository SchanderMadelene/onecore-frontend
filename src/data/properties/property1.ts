import { PropertyDetail } from "@/types/api";

export const property1: PropertyDetail = {
  id: "1",
  propertyObjectId: "P1",
  code: "FAST-001",
  designation: "Älgen 1",
  municipality: "Västerås",
  parish: "Lundby",
  propertyNumber: "Lundby 3:15",
  direction: "N",
  address: "Odenplan 5, 72346 Västerås",
  purpose: "Bostad",
  buildingType: "Flerbostadshus",
  buildings: [
    {
      id: "B1",
      name: "Hus A",
      type: "Flerbostadshus",
      constructionYear: 1985,
      area: 1200,
      floors: 4,
      units: 12,
      tenants: 10,
      apartments: [
        {
          id: "A1",
          code: "LGH-1001",
          area: 56,
          rooms: 2,
          status: "Uthyrd"
        },
        {
          id: "A2",
          code: "LGH-1002",
          area: 72,
          rooms: 3,
          status: "Uthyrd"
        },
        {
          id: "A3",
          code: "LGH-1003",
          area: 45,
          rooms: 1,
          status: "Vakant"
        }
      ]
    },
    {
      id: "B2",
      name: "Hus B",
      type: "Flerbostadshus",
      constructionYear: 1987,
      area: 800,
      floors: 3,
      units: 9,
      tenants: 8,
      apartments: [
        {
          id: "A4",
          code: "LGH-2001",
          area: 65,
          rooms: 2,
          status: "Uthyrd"
        },
        {
          id: "A5",
          code: "LGH-2002",
          area: 85,
          rooms: 3,
          status: "Uthyrd"
        }
      ]
    }
  ],
  propertyMap: {
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg==",
    buildings: [
      {
        id: "B1",
        name: "Hus A",
        x: 100,
        y: 100,
        width: 200,
        height: 150
      },
      {
        id: "B2",
        name: "Hus B",
        x: 400,
        y: 200,
        width: 200,
        height: 100
      }
    ]
  }
};

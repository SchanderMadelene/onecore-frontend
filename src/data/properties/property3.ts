
import { PropertyDetail } from "@/types/api";

export const property3: PropertyDetail = {
  id: "3",
  propertyObjectId: "P3",
  code: "FAST-003",
  designation: "Björnen 4",
  municipality: "Västerås",
  parish: "Domkyrkan",
  propertyNumber: "Domkyrkan 2:33",
  direction: "Ö",
  address: "Sveavägen 10, 72213 Västerås",
  purpose: "Kontor",
  buildingType: "Kontorsbyggnad",
  buildings: [
    {
      id: "B4",
      name: "Kontorsbyggnad A",
      type: "Kontor",
      constructionYear: 2005,
      area: 2800,
      floors: 6,
      units: 25,
      tenants: 22,
      apartments: [
        {
          id: "A9",
          code: "101",
          area: 120,
          rooms: 4,
          status: "Uthyrd"
        },
        {
          id: "A10",
          code: "102",
          area: 85,
          rooms: 3,
          status: "Uthyrd"
        }
      ]
    },
    {
      id: "B5",
      name: "Kontorsbyggnad B",
      type: "Kontor",
      constructionYear: 2007,
      area: 1800,
      floors: 4,
      units: 16,
      tenants: 15,
      apartments: []
    }
  ],
  propertyMap: {
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg==",
    buildings: [
      {
        id: "B4",
        name: "Kontorsbyggnad A",
        x: 150,
        y: 100,
        width: 250,
        height: 200
      },
      {
        id: "B5",
        name: "Kontorsbyggnad B",
        x: 450,
        y: 250,
        width: 200,
        height: 150
      }
    ]
  }
};

import { PropertyDetail } from "@/types/api";

// Add constructionYear and units to all building objects
export const mockPropertyDetails: Record<string, PropertyDetail> = {
  "vasteras/lundby/odenplan-5": {
    id: "1",
    propertyObjectId: "P1",
    code: "FAST-001",
    designation: "Odenplan 5",
    municipality: "Västerås",
    parish: "Lundby",
    propertyNumber: "Lundby 3:15",
    direction: "N",
    address: "Odenplan, 5, 72346 Västerås",
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
            code: "1001",
            area: 56,
            rooms: 2,
            status: "Uthyrd"
          },
          {
            id: "A2",
            code: "1002",
            area: 72,
            rooms: 3,
            status: "Uthyrd"
          },
          {
            id: "A3",
            code: "1003",
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
            code: "2001",
            area: 65,
            rooms: 2,
            status: "Uthyrd"
          },
          {
            id: "A5",
            code: "2002",
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
  },
  "vasteras/backby/gotgatan-15": {
    id: "2",
    propertyObjectId: "P2",
    code: "FAST-002",
    designation: "Götgatan 15",
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
  },
  "vasteras/domkyrkan/sveavagen-10": {
    id: "3",
    propertyObjectId: "P3",
    code: "FAST-003",
    designation: "Sveavägen 10",
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
    ]
  }
};

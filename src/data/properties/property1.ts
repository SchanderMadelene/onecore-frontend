
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
      name: "Byggnad A",
      type: "Flerbostadshus",
      constructionYear: 1985,
      area: 1200,
      floors: 4,
      units: 20,
      tenants: 18,
      entrances: [
        {
          id: "E3",
          name: "Uppgång A",
          apartments: ["A1", "A2", "A6", "A7", "A8"]
        },
        {
          id: "E4",
          name: "Uppgång B",
          apartments: ["A3", "A9", "A10"]
        },
        {
          id: "E5",
          name: "Uppgång C",
          apartments: ["A11", "A12", "A13"]
        },
        {
          id: "E6",
          name: "Uppgång D",
          apartments: ["A14", "A15", "A16", "A17"]
        }
      ],
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
        },
        {
          id: "A6",
          code: "LGH-1004",
          area: 62,
          rooms: 2,
          status: "Uthyrd"
        },
        {
          id: "A7",
          code: "LGH-1005",
          area: 85,
          rooms: 4,
          status: "Uthyrd"
        },
        {
          id: "A8",
          code: "LGH-1006",
          area: 32,
          rooms: 1,
          status: "Vakant"
        },
        {
          id: "A9",
          code: "LGH-1007",
          area: 75,
          rooms: 3,
          status: "Uthyrd"
        },
        {
          id: "A10",
          code: "LGH-1008",
          area: 95,
          rooms: 4,
          status: "Uthyrd"
        },
        {
          id: "A11",
          code: "LGH-1009",
          area: 42,
          rooms: 1,
          status: "Uthyrd"
        },
        {
          id: "A12",
          code: "LGH-1010",
          area: 64,
          rooms: 2,
          status: "Uthyrd"
        },
        {
          id: "A13",
          code: "LGH-1011",
          area: 78,
          rooms: 3,
          status: "Vakant"
        },
        {
          id: "A14",
          code: "LGH-1012",
          area: 112,
          rooms: 5,
          status: "Uthyrd"
        },
        {
          id: "A15",
          code: "LGH-1013",
          area: 57,
          rooms: 2,
          status: "Uthyrd"
        },
        {
          id: "A16",
          code: "LGH-1014",
          area: 48,
          rooms: 2,
          status: "Uthyrd"
        },
        {
          id: "A17",
          code: "LGH-1015",
          area: 98,
          rooms: 4,
          status: "Vakant"
        }
      ]
    },
    {
      id: "B2",
      name: "Byggnad B",
      type: "Flerbostadshus",
      constructionYear: 1987,
      area: 800,
      floors: 3,
      units: 9,
      tenants: 8,
      entrances: [
        {
          id: "E5",
          name: "Uppgång A",
          apartments: ["A4", "A5"]
        }
      ],
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
  maintenanceUnits: [
    {
      id: "MU1",
      name: "Miljöbod Nord",
      type: "Miljöbod",
      area: 25,
      constructionYear: 1990,
      lastRenovated: "2019-05-15",
      status: "Aktiv",
      description: "Återvinningscentral för hushållsavfall och sortering"
    },
    {
      id: "MU2",
      name: "Tvättstuga A",
      type: "Tvättstuga",
      area: 45,
      constructionYear: 1985,
      lastRenovated: "2020-03-10",
      status: "Aktiv",
      description: "Gemensam tvättstuga för Hus A och B"
    },
    {
      id: "MU3",
      name: "Undercentral 1",
      type: "Undercentral",
      area: 30,
      constructionYear: 1985,
      status: "Aktiv",
      description: "Värmecentral för fastigheten"
    }
  ],
  propertyMap: {
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg==",
    buildings: [
      {
        id: "B1",
        name: "Byggnad A",
        x: 100,
        y: 100,
        width: 200,
        height: 150
      },
      {
        id: "B2",
        name: "Byggnad B",
        x: 400,
        y: 200,
        width: 200,
        height: 100
      }
    ]
  }
};


import type { Property, Company, Residence, Room, PropertyDetail, APIResponse } from "@/types/api";

// Property mock data
export const mockProperties: Property[] = [
  {
    id: "1",
    propertyObjectId: "P1",
    code: "FAST-001",
    designation: "Kontorskomplex City",
    municipality: "Stockholm",
    purpose: "Kontor",
    buildingType: "Kontorsbyggnad"
  },
  {
    id: "2",
    propertyObjectId: "P2",
    code: "FAST-002",
    designation: "Bostadshus Centrum",
    municipality: "Stockholm",
    purpose: "Bostad",
    buildingType: "Flerfamiljshus"
  }
];

// Companies mock data
export const mockCompanies: Company[] = [
  {
    id: "1",
    propertyObjectId: "C1",
    code: "FTG-001",
    name: "Företag AB",
    organizationNumber: "556123-1234"
  },
  {
    id: "2",
    propertyObjectId: "C2",
    code: "FTG-002",
    name: "Fastigheter & Co KB",
    organizationNumber: "556789-0123"
  }
];

// Occupancy mock data
export const mockOccupancyData = {
  total: 150,
  occupied: 135,
  available: 15
};

// Mock search results
export interface SearchResult {
  id: string;
  name: string;
  type: "property" | "building" | "apartment";
  address: string;
  path: string;
  tenant?: {
    name: string;
    active: boolean;
  };
}

export const mockSearchResults: SearchResult[] = [
  {
    id: "lgh-101",
    name: "Lägenhet 1001",
    type: "apartment",
    address: "Odenplan 5, Lundby",
    path: "/properties/vasteras/lundby/odenplan-5/lgh-101",
    tenant: {
      name: "Anna Andersson",
      active: true
    }
  },
  {
    id: "lgh-201",
    name: "Lägenhet 1002",
    type: "apartment",
    address: "Odenplan 5, Lundby",
    path: "/properties/vasteras/lundby/odenplan-5/lgh-201",
    tenant: {
      name: "Johan Svensson",
      active: true
    }
  },
  {
    id: "lgh-301",
    name: "Lägenhet 2001",
    type: "apartment",
    address: "Odenplan 5, Lundby",
    path: "/properties/vasteras/lundby/odenplan-5/lgh-301",
    tenant: {
      name: "Maria Eriksson",
      active: true
    }
  },
  {
    id: "lgh-301",
    name: "Lägenhet 3001",
    type: "apartment",
    address: "Götgatan 15, Bäckby",
    path: "/properties/vasteras/backby/gotgatan-15/lgh-301",
    tenant: {
      name: "Henrik Johansson",
      active: true
    }
  },
  {
    id: "lgh-302",
    name: "Lägenhet 3002",
    type: "apartment",
    address: "Götgatan 15, Bäckby",
    path: "/properties/vasteras/backby/gotgatan-15/lgh-302"
  },
  {
    id: "lgh-101",
    name: "Kontor 101",
    type: "apartment",
    address: "Sveavägen 10, Domkyrkan",
    path: "/properties/vasteras/domkyrkan/sveavagen-10/lgh-101",
    tenant: {
      name: "Tech AB",
      active: true
    }
  },
  {
    id: "odenplan-5",
    name: "Odenplan 5",
    type: "property",
    address: "Lundby, Västerås",
    path: "/properties/vasteras/lundby/odenplan-5"
  },
  {
    id: "sveavagen-10",
    name: "Sveavägen 10",
    type: "property",
    address: "Domkyrkan, Västerås",
    path: "/properties/vasteras/domkyrkan/sveavagen-10"
  },
  {
    id: "gotgatan-15",
    name: "Götgatan 15",
    type: "property",
    address: "Bäckby, Västerås",
    path: "/properties/vasteras/backby/gotgatan-15"
  }
];

// Residence mock data
export const mockResidenceData: Record<string, APIResponse<Residence>> = {
  "lgh-101": {
    content: {
      id: "lgh-101",
      code: "LGH-101",
      name: "3 rum och kök, Odenplan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
  "lgh-201": {
    content: {
      id: "lgh-201",
      code: "LGH-201",
      name: "4 rum och kök, Sveavägen",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
  "lgh-301": {
    content: {
      id: "lgh-301",
      code: "LGH-301",
      name: "3 rum och kök, Götgatan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
  "lgh-302": {
    content: {
      id: "lgh-302",
      code: "LGH-302",
      name: "2 rum och kök, Götgatan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  }
};

// Room mock data
export const mockRoomsData: APIResponse<Room[]> = {
  content: [
    {
      id: "1",
      code: "RUM-101",
      name: "Vardagsrum",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 1
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 1
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 1,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "1",
        roomTypeCode: "VARDAGSRUM",
        name: "Vardagsrum",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "2",
      code: "RUM-102",
      name: "Kök",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 2
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 2
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 2,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "2",
        roomTypeCode: "KOK",
        name: "Kök",
        use: 2,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "3",
      code: "RUM-103",
      name: "Sovrum 1",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 1
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 3
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 3,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "3",
        roomTypeCode: "SOVRUM",
        name: "Sovrum",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "4",
      code: "RUM-104",
      name: "Badrum",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 3
      },
      features: {
        hasToilet: true,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 2
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 4,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "4",
        roomTypeCode: "BADRUM",
        name: "Badrum",
        use: 3,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "5",
      code: "RUM-105",
      name: "Sovrum 2",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 1
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 4
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 5,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "3",
        roomTypeCode: "SOVRUM",
        name: "Sovrum",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "6",
      code: "RUM-106",
      name: "Hall",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 4
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: false,
        orientation: 1
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 6,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "5",
        roomTypeCode: "HALL",
        name: "Hall",
        use: 4,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    }
  ]
};

// Tenant mock data
export const mockTenant = {
  firstName: "Anna",
  lastName: "Andersson",
  phone: "070-123 45 67",
  email: "anna.andersson@example.com",
  contractStatus: "permanent" as const,
  moveInDate: "2023-01-01",
  contractNumber: "KT2023-001",
  personalNumber: "19850101-1234"
};

// Property details mock data
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

// Debugging för att se tillgängliga nycklar i konsolen
console.log("Available property keys:", Object.keys(mockPropertyDetails));

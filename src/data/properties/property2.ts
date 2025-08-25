
import { PropertyDetail } from "@/types/api";

// Property 2 (Lindaren 2) details
export const property2: PropertyDetail = {
  id: "2",
  propertyObjectId: "P2",
  code: "FAST-002",
  designation: "Lindaren 2",
  municipality: "Västerås",
  parish: "Backby",
  propertyNumber: "3:27",
  direction: "N",
  address: "Götgatan 15, 724 63 Västerås",
  purpose: "Bostad",
  buildingType: "Flerbostadshus",
  district: "Västerås Nord",
  propertyManagerArea: "Nord",
  buildings: [
    {
      id: "B3",
      name: "Huvudbyggnad",
      type: "Flerbostadshus",
      constructionYear: 1985,
      renovationYear: 2020,
      area: 2100,
      floors: 4,
      units: 38,
      tenants: 59,
      apartments: [
        {
          id: "A4",
          code: "234-567-02-0001",
          name: "Götgatan 15A, lgh 1001",
          deleted: false,
          size: 68,
          rooms: 2,
          status: "Uthyrd",
          apartmentType: "Standard",
          rent: 13600,
          malarenergiFacilityId: "MAL-234-001",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        },
        {
          id: "A5",
          code: "234-567-02-0002",
          name: "Götgatan 15A, lgh 1002",
          deleted: false,
          size: 52,
          rooms: 1,
          status: "Uthyrd",
          apartmentType: "Standard",
          rent: 10400,
          malarenergiFacilityId: "MAL-234-002",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        },
        {
          id: "A6",
          code: "234-567-02-0003",
          name: "Götgatan 15A, lgh 2001",
          deleted: false,
          size: 78,
          rooms: 3,
          status: "Uthyrd",
          apartmentType: "Standard",
          rent: 15600,
          malarenergiFacilityId: "MAL-234-003",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        },
        {
          id: "A7",
          code: "234-567-02-0004",
          name: "Götgatan 15A, lgh 2002",
          deleted: false,
          size: 64,
          rooms: 2,
          status: "Uthyrd",
          apartmentType: "Standard",
          rent: 12800,
          malarenergiFacilityId: "MAL-234-004",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        },
        {
          id: "A8",
          code: "234-567-02-0005",
          name: "Götgatan 15B, lgh 1001",
          deleted: false,
          size: 58,
          rooms: 2,
          status: "Uthyrd",
          apartmentType: "Standard",
          rent: 11600,
          malarenergiFacilityId: "MAL-234-005",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        },
        {
          id: "A9",
          code: "234-567-02-0006",
          name: "Götgatan 15B, lgh 1002",
          deleted: false,
          size: 75,
          rooms: 3,
          status: "Uthyrd",
          apartmentType: "Standard",
          rent: 15000,
          malarenergiFacilityId: "MAL-234-006",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        },
        {
          id: "A10",
          code: "234-567-02-0007",
          name: "Götgatan 15B, lgh 2001",
          deleted: false,
          size: 48,
          rooms: 1,
          status: "Ledig",
          apartmentType: "Standard",
          rent: 9600,
          malarenergiFacilityId: "MAL-234-007",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        },
        {
          id: "A11",
          code: "234-567-02-0008",
          name: "Götgatan 15B, lgh 2002",
          deleted: false,
          size: 82,
          rooms: 3,
          status: "Uthyrd",
          apartmentType: "Standard",
          rent: 16400,
          malarenergiFacilityId: "MAL-234-008",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        }
      ],
      entrances: [
        {
          id: "E1",
          name: "A",
          apartments: ["A4", "A5", "A6", "A7"]
        },
        {
          id: "E2",
          name: "B",
          apartments: ["A8", "A9", "A10", "A11"]
        }
      ]
    }
  ],
  maintenanceUnits: [
    {
      id: "M1",
      name: "Parkeringsområde",
      type: "Parkeringsområde",
      area: 500,
      constructionYear: 1985,
      status: "Aktiv",
      description: "Bilparkering för 25 bilar"
    },
    {
      id: "M2",
      name: "Återvinningscentral",
      type: "Återvinning",
      area: 60,
      constructionYear: 1985,
      status: "Aktiv",
      description: "Sorterat avfall, källsortering"
    },
    {
      id: "M3",
      name: "Tvättrum",
      type: "Tvättsugor",
      area: 75,
      constructionYear: 1985,
      lastRenovated: "2018-05-01",
      status: "Aktiv",
      description: "Tvättmaskiner och torkutrustning"
    },
    {
      id: "M4",
      name: "Teknisk installation",
      type: "Installation",
      area: 40,
      constructionYear: 1985,
      status: "Aktiv",
      description: "Värme- och ventilationssystem"
    },
    {
      id: "M5",
      name: "Låssystem",
      type: "Lås & passage",
      area: 0,
      constructionYear: 1985,
      lastRenovated: "2020-03-15",
      status: "Aktiv",
      description: "Digital passagekontroll"
    }
  ],
  propertyMap: {
    image: "/images/property-map-2.png",
    buildings: [
      {
        id: "B3",
        name: "Huvudbyggnad",
        x: 100,
        y: 100,
        width: 250,
        height: 120
      }
    ]
  }
};

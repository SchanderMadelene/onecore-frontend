
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

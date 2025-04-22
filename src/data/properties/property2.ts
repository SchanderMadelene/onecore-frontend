import { PropertyDetail } from "@/types/api";

// Property 2 (Götgatan 15) details
export const property2: PropertyDetail = {
  id: "2",
  propertyObjectId: "P2",
  code: "FAST-002",
  designation: "Götgatan 15",
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
      id: "M4",
      name: "Miljöstation",
      type: "Miljöbod",
      area: 60,
      constructionYear: 1985,
      status: "Aktiv",
      description: "Sorterat avfall, källsortering"
    },
    {
      id: "M5",
      name: "Tvättrum",
      type: "Tvättstuga",
      area: 75,
      constructionYear: 1985,
      lastRenovated: "2018-05-01",
      status: "Aktiv"
    },
    {
      id: "M6",
      name: "Takbyte",
      type: "Tak",
      area: 200,
      constructionYear: 1985,
      status: "Aktiv",
      description: "Planerat takbyte för hela fastigheten"
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


import { PropertyDetail } from "@/types/api";

// Property 1 (Odenplan 5) details
export const property1: PropertyDetail = {
  id: "1",
  propertyObjectId: "P1",
  code: "FAST-001",
  designation: "Odenplan 5",
  municipality: "Västerås",
  parish: "Lundby",
  propertyNumber: "2:145",
  direction: "S",
  address: "Lundbyvägen 14, 722 31 Västerås",
  purpose: "Bostad",
  buildingType: "Flerbostadshus",
  district: "Västerås Centrum",
  propertyManagerArea: "Centrum Öst",
  buildings: [
    {
      id: "B1",
      name: "Byggnad A",
      type: "Flerbostadshus",
      constructionYear: 1973,
      area: 1450,
      floors: 3,
      units: 24,
      tenants: 38,
      apartments: [
        {
          id: "A1",
          code: "LGH-001",
          area: 65,
          rooms: 2,
          status: "Uthyrd"
        },
        {
          id: "A2",
          code: "LGH-002",
          area: 45,
          rooms: 1,
          status: "Uthyrd"
        },
        {
          id: "A3",
          code: "LGH-003",
          area: 85,
          rooms: 3,
          status: "Uthyrd"
        }
      ]
    },
    {
      id: "B2",
      name: "Byggnad B",
      type: "Flerbostadshus",
      constructionYear: 1975,
      area: 980,
      floors: 2,
      units: 12,
      tenants: 19
    }
  ],
  maintenanceUnits: [
    {
      id: "M1",
      name: "Miljöhuset",
      type: "Miljöbod",
      area: 45,
      constructionYear: 1980,
      status: "Aktiv"
    },
    {
      id: "M2",
      name: "Tvättstugan",
      type: "Tvättstuga",
      area: 65,
      constructionYear: 1973,
      lastRenovated: "2015-08-01",
      status: "Aktiv",
      description: "Fyra tvättmaskiner, två torktumlare och ett torkskåp"
    },
    {
      id: "M3",
      name: "Undervåning",
      type: "Undercentral",
      area: 30,
      constructionYear: 1973,
      status: "Aktiv"
    }
  ],
  propertyMap: {
    image: "/images/property-map-1.png",
    buildings: [
      {
        id: "B1",
        name: "A",
        x: 50,
        y: 100,
        width: 200,
        height: 100
      },
      {
        id: "B2",
        name: "B",
        x: 300,
        y: 150,
        width: 150,
        height: 80
      }
    ]
  }
};

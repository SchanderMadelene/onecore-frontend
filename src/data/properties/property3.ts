
import { PropertyDetail } from "@/types/api";

// Property 3 (Sveavägen 10) details
export const property3: PropertyDetail = {
  id: "3",
  propertyObjectId: "P3",
  code: "FAST-003",
  designation: "Sveavägen 10",
  municipality: "Västerås",
  parish: "Domkyrkan",
  propertyNumber: "5:12",
  direction: "E",
  address: "Sveavägen 10, 721 14 Västerås",
  purpose: "Kontor",
  buildingType: "Kontorsbyggnad",
  district: "Västerås Centrum",
  propertyManagerArea: "Centrum Väst",
  buildings: [
    {
      id: "B4",
      name: "Kontorshuset",
      type: "Kontorsbyggnad",
      constructionYear: 1992,
      area: 3200,
      floors: 6,
      units: 16
    },
    {
      id: "B5",
      name: "Annex",
      type: "Kontorsbyggnad",
      constructionYear: 1995,
      area: 850,
      floors: 2,
      units: 4
    }
  ],
  maintenanceUnits: [
    {
      id: "M6",
      name: "Parkering",
      type: "Annat",
      area: 800,
      constructionYear: 1992,
      status: "Aktiv",
      description: "Utomhusparkering för 32 bilar"
    },
    {
      id: "M7",
      name: "Undercentral",
      type: "Undercentral",
      area: 40,
      constructionYear: 1992,
      status: "Aktiv"
    },
    {
      id: "M8",
      name: "Avfallshantering",
      type: "Miljöbod",
      area: 35,
      constructionYear: 1992,
      lastRenovated: "2019-03-15",
      status: "Aktiv"
    }
  ],
  propertyMap: {
    image: "/images/property-map-3.png",
    buildings: [
      {
        id: "B4",
        name: "Huvudbyggnad",
        x: 150,
        y: 100,
        width: 180,
        height: 120
      },
      {
        id: "B5",
        name: "Annex",
        x: 350,
        y: 150,
        width: 100,
        height: 70
      }
    ]
  }
};

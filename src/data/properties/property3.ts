
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
      id: "M1",
      name: "Parkeringsgarage",
      type: "Parkeringsområde",
      area: 800,
      constructionYear: 1992,
      status: "Aktiv",
      description: "Underjordisk parkering för 32 bilar"
    },
    {
      id: "M2",
      name: "Uteområde",
      type: "Rekreationsytor",
      area: 200,
      constructionYear: 1992,
      status: "Aktiv",
      description: "Utomhusyta med bänkar och planteringar"
    },
    {
      id: "M3",
      name: "Avfallshantering",
      type: "Återvinning",
      area: 35,
      constructionYear: 1992,
      lastRenovated: "2019-03-15",
      status: "Aktiv",
      description: "Återvinningsstation för kontorsbyggnaden"
    },
    {
      id: "M4",
      name: "Förrådslokal",
      type: "Förråd",
      area: 80,
      constructionYear: 1992,
      status: "Aktiv",
      description: "Förrådsutrymme för kontorshyresgäster"
    },
    {
      id: "M5",
      name: "Tekniska installationer",
      type: "Installation",
      area: 120,
      constructionYear: 1992,
      lastRenovated: "2020-09-01",
      status: "Aktiv",
      description: "Ventilation, värme och kyla"
    },
    {
      id: "M6",
      name: "Säkerhetssystem",
      type: "Lås & passage",
      area: 0,
      constructionYear: 1992,
      lastRenovated: "2021-05-20",
      status: "Aktiv",
      description: "Säkerhetslås och passagesystem"
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

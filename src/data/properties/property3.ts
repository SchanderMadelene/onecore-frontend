
import { PropertyDetail } from "@/types/api";

// Property 3 (Björnen 4) details
export const property3: PropertyDetail = {
  id: "3",
  propertyObjectId: "P3",
  code: "FAST-003",
  designation: "Björnen 4",
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
      units: 16,
      apartments: [
        {
          id: "A1",
          code: "345-678-03-0001",
          name: "Sveavägen 10, kontor 101",
          deleted: false,
          size: 120,
          rooms: 4,
          status: "Uthyrd",
          apartmentType: "Standard",
          rent: 24000,
          malarenergiFacilityId: "MAL-345-001",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        },
        {
          id: "A2",
          code: "345-678-03-0002",
          name: "Sveavägen 10, kontor 102",
          deleted: false,
          size: 85,
          rooms: 3,
          status: "Uthyrd",
          apartmentType: "Standard",
          rent: 17000,
          malarenergiFacilityId: "MAL-345-002",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        }
      ]
    },
    {
      id: "B5",
      name: "Annex",
      type: "Kontorsbyggnad",
      constructionYear: 1995,
      area: 850,
      floors: 2,
      units: 4,
      apartments: [
        {
          id: "A3",
          code: "345-678-03-0003",
          name: "Sveavägen 10, annex 201",
          deleted: false,
          size: 65,
          rooms: 2,
          status: "Ledig",
          apartmentType: "Standard",
          rent: 13000,
          malarenergiFacilityId: "MAL-345-003",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        },
        {
          id: "A4",
          code: "345-678-03-0004",
          name: "Sveavägen 10, annex 202",
          deleted: false,
          size: 78,
          rooms: 3,
          status: "Uthyrd",
          apartmentType: "Standard",
          rent: 15600,
          malarenergiFacilityId: "MAL-345-004",
          validityPeriod: {
            fromDate: "2020-01-01",
            toDate: "2025-12-31"
          }
        }
      ]
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


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
      name: "Parkeringsplats",
      type: "Parkeringsområde",
      area: 800,
      constructionYear: 1973,
      status: "Aktiv",
      description: "Utomhusparkering för hyresgäster"
    },
    {
      id: "M2",
      name: "Lekplats för barn",
      type: "Lekplats",
      area: 120,
      constructionYear: 1980,
      status: "Aktiv",
      description: "Lekplats med gungor och klätterställning"
    },
    {
      id: "M3",
      name: "Innergård",
      type: "Rekreationsytor",
      area: 300,
      constructionYear: 1973,
      status: "Aktiv",
      description: "Gemensam rekreationsyta för hyresgäster"
    },
    {
      id: "M4",
      name: "Återvinningsstation",
      type: "Återvinning",
      area: 45,
      constructionYear: 1980,
      status: "Aktiv",
      description: "Sorterat avfall och återvinning"
    },
    {
      id: "M5",
      name: "Tvättstuga A",
      type: "Tvättsugor",
      area: 65,
      constructionYear: 1973,
      lastRenovated: "2015-08-01",
      status: "Aktiv",
      description: "Fyra tvättmaskiner, två torktumlare och ett torkskåp"
    },
    {
      id: "M6",
      name: "Skyddsrum källare",
      type: "Skyddsrum",
      area: 120,
      constructionYear: 1973,
      status: "Aktiv",
      description: "Skyddsrum enligt BBR"
    },
    {
      id: "M7",
      name: "Förråd källare",
      type: "Förråd",
      area: 350,
      constructionYear: 1973,
      status: "Aktiv",
      description: "Förrådsutrymmen för hyresgäster"
    },
    {
      id: "M8",
      name: "Ventilation och värme",
      type: "Installation",
      area: 50,
      constructionYear: 1973,
      lastRenovated: "2018-05-01",
      status: "Aktiv",
      description: "Ventilationsaggregat och värmesystem"
    },
    {
      id: "M9",
      name: "Passagesystem",
      type: "Lås & passage",
      area: 0,
      constructionYear: 1973,
      lastRenovated: "2021-09-10",
      status: "Aktiv",
      description: "Elektroniska lås och passagesystem"
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

import { PropertyDetail } from "@/types/api";

// Property 1 (Älgen 1) details
export const property1: PropertyDetail = {
  id: "1",
  propertyObjectId: "P1",
  code: "FAST-001",
  designation: "Älgen 1",
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
      name: "Bellmansgatan 1A - 2C",
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
        },
        {
          id: "A4",
          code: "LGH-004",
          area: 72,
          rooms: 3,
          status: "Uthyrd"
        },
        {
          id: "A5",
          code: "LGH-005",
          area: 58,
          rooms: 2,
          status: "Uthyrd"
        },
        {
          id: "A6",
          code: "LGH-006",
          area: 91,
          rooms: 4,
          status: "Uthyrd"
        },
        {
          id: "A7",
          code: "LGH-007",
          area: 48,
          rooms: 1,
          status: "Ledig"
        },
        {
          id: "A8",
          code: "LGH-008",
          area: 67,
          rooms: 2,
          status: "Uthyrd"
        },
        {
          id: "A9",
          code: "LGH-009",
          area: 82,
          rooms: 3,
          status: "Uthyrd"
        }
      ],
      entrances: [
        {
          id: "E1",
          name: "Bellmansgatan 1A",
          apartments: ["A1", "A2", "A3"],
          components: [
            {
              id: "C1",
              name: "Postboxar",
              type: "Postboxar",
              description: "Säkra postlådor för hyresgäster",
              status: "Aktiv"
            },
            {
              id: "C2", 
              name: "Digital bokningstavla",
              type: "Digital bokningstavla",
              description: "Interaktiv displayenhet för bokningar",
              status: "Aktiv"
            }
          ]
        },
        {
          id: "E2", 
          name: "Bellmansgatan 1B",
          apartments: ["A4", "A5", "A6"],
          components: [
            {
              id: "C3",
              name: "Postboxar",
              type: "Postboxar",
              description: "Säkra postlådor för hyresgäster",
              status: "Aktiv"
            },
            {
              id: "C4", 
              name: "Digital bokningstavla",
              type: "Digital bokningstavla",
              description: "Interaktiv displayenhet för bokningar",
              status: "Aktiv"
            }
          ]
        },
        {
          id: "E3",
          name: "Bellmansgatan 1C", 
          apartments: ["A7", "A8", "A9"],
          components: [
            {
              id: "C5",
              name: "Postboxar",
              type: "Postboxar",
              description: "Säkra postlådor för hyresgäster",
              status: "Aktiv"
            },
            {
              id: "C6", 
              name: "Digital bokningstavla",
              type: "Digital bokningstavla",
              description: "Interaktiv displayenhet för bokningar",
              status: "Aktiv"
            }
          ]
        }
      ],
      spaces: [
        {
          id: "1",
          type: "Trapphus",
          name: "Trapphus A-C",
          totalArea: 45,
          components: [
            {
              id: "1a",
              name: "Trappor",
              description: "Betongtrappor med räcke",
              area: 30,
              status: "Aktiv",
              specs: { "Material": "Betong", "Antal våningar": "5" }
            },
            {
              id: "1b", 
              name: "Väggar",
              description: "Målade väggar",
              area: 15,
              status: "Aktiv",
              specs: { "Färg": "Vit", "Senast målat": "2022" }
            }
          ]
        },
        {
          id: "2",
          type: "Vind",
          name: "Vindsutrymme",
          totalArea: 120,
          components: [
            {
              id: "2a",
              name: "Förvaringsutrymme",
              description: "Öppet förvaringsutrymme för hyresgäster",
              area: 80,
              status: "Aktiv",
              specs: { "Antal platser": "24", "Tillgänglighet": "Hyresgäster" }
            },
            {
              id: "2b",
              name: "Ventilation",
              description: "Vindventilation",
              area: 40,
              status: "Under underhåll",
              specs: { "Typ": "Naturlig", "Senast service": "2023-08" }
            }
          ]
        },
        {
          id: "3",
          type: "Terrasser",
          name: "Balkong- och terrassytor",
          totalArea: 85,
          components: [
            {
              id: "3a",
              name: "Balkonger våning 1-3",
              description: "Individuella balkonger per lägenhet",
              area: 60,
              status: "Aktiv",
              specs: { "Antal": "18", "Material": "Betong", "Räcke": "Glas" }
            },
            {
              id: "3b",
              name: "Gemensam takterrass",
              description: "Takterrass för alla hyresgäster",
              area: 25,
              status: "Aktiv",
              specs: { "Tillgänglighet": "Alla hyresgäster", "Möblering": "Bänkar, bord" }
            }
          ]
        },
        {
          id: "4",
          type: "Källare",
          name: "Källarutrymmen",
          totalArea: 200,
          components: [
            {
              id: "4a",
              name: "Förråd",
              description: "Individuella förråd för hyresgäster",
              area: 120,
              status: "Aktiv",
              specs: { "Antal förråd": "18", "Låstyp": "Hänglås" }
            },
            {
              id: "4b",
              name: "Allmänna utrymmen",
              description: "Gemensamma källarutrymmen",
              area: 80,
              status: "Aktiv",
              specs: { "Innehåll": "Cykelrum, hobbyrum", "Säkerhet": "Låst" }
            }
          ]
        },
        {
          id: "5",
          type: "Lokaler",
          name: "Verksamhetslokaler",
          totalArea: 150,
          components: [
            {
              id: "5a",
              name: "Butik bottenvåning",
              description: "Kommersiell lokal i bottenvåning",
              area: 100,
              status: "Aktiv",
              specs: { "Typ": "Butik", "Hyresgäst": "Livsmedelsbutik", "Öppettider": "07-22" }
            },
            {
              id: "5b",
              name: "Kontorslokaler",
              description: "Mindre kontorslokaler",
              area: 50,
              status: "Ur funktion",
              specs: { "Antal rum": "3", "Lämplig för": "Mindre företag" }
            }
          ]
        },
        {
          id: "6",
          type: "Skyddsrum i byggnaden",
          name: "Skyddsrum källare",
          totalArea: 120,
          components: [
            {
              id: "6a",
              name: "Huvudskyddsrum",
              description: "Skyddsrum enligt BBR",
              area: 120,
              status: "Aktiv",
              specs: { "Kapacitet": "50 personer", "Senast kontroll": "2023-06-15", "Nästa kontroll": "2025-06-15" }
            }
          ]
        },
        {
          id: "7",
          type: "Förråd i byggnaden",
          name: "Förråd källare",
          totalArea: 350,
          components: [
            {
              id: "7a",
              name: "Individuella förråd",
              description: "Förrådsutrymmen för hyresgäster",
              area: 300,
              status: "Aktiv",
              specs: { "Antal enheter": "24", "Storlek per enhet": "12.5 m²", "Låstyp": "Cylinderlås" }
            },
            {
              id: "7b",
              name: "Gemensamma förråd",
              description: "Förråd för fastighetsunderhåll",
              area: 50,
              status: "Aktiv",
              specs: { "Innehåll": "Redskap, reservdelar", "Åtkomst": "Endast personal" }
            }
          ]
        },
        {
          id: "8",
          type: "Tvättstugor i byggnaden",
          name: "Tvättstuga",
          totalArea: 25,
          components: [
            {
              id: "8a",
              name: "Tvättmaskiner",
              description: "4 tvättmaskiner",
              status: "Aktiv",
              specs: { "Antal": "4", "Märke": "Electrolux", "Senast service": "2024-01" }
            },
            {
              id: "8b",
              name: "Torktumlare",
              description: "2 torktumlare",
              status: "Aktiv",
              specs: { "Antal": "2", "Märke": "Electrolux", "Senast service": "2024-01" }
            }
          ]
        },
        {
          id: "9",
          type: "Miljöbodar i byggnaden",
          name: "Miljöstation",
          totalArea: 15,
          components: [
            {
              id: "9a",
              name: "Sopcontainers",
              description: "Containers för olika fraktioner",
              status: "Aktiv",
              specs: { "Antal containers": "6", "Fraktioner": "Restavfall, Papper, Plast" }
            }
          ]
        },
        {
          id: "10",
          type: "Teknikutrymmen",
          name: "UC Värme",
          totalArea: 45,
          components: [
            {
              id: "10a",
              name: "Värmeväxlare",
              description: "Centralvärme distribution",
              status: "Aktiv",
              specs: {
                "Typ": "VVS",
                "Kapacitet": "150 kW",
                "Medium": "Vatten",
                "Senast underhåll": "2023-10-12",
                "Nästa underhåll": "2024-10-12"
              }
            },
            {
              id: "10b",
              name: "Cirkulationspumpar",
              description: "Pumpar för värmecirkulation",
              status: "Aktiv",
              specs: {
                "Typ": "VVS",
                "Antal": "3",
                "Effekt": "2.2 kW",
                "Senast service": "2024-02-15"
              }
            }
          ]
        },
        {
          id: "11",
          type: "Teknikutrymmen",
          name: "UC Ventilation",
          totalArea: 30,
          components: [
            {
              id: "11a",
              name: "Ventilationsaggregat",
              description: "Centralt ventilationssystem",
              status: "Under underhåll",
              specs: {
                "Typ": "VVS",
                "Luftflöde": "2400 m³/h",
                "System": "FTX",
                "Senast underhåll": "2024-05-01"
              }
            },
            {
              id: "11b",
              name: "Fläktar",
              description: "Till- och frånluftsfläktar",
              status: "Aktiv",
              specs: {
                "Typ": "VVS",
                "Antal": "2",
                "Kapacitet": "1200 m³/h",
                "Senast service": "2024-03-20"
              }
            }
          ]
        },
        {
          id: "12",
          type: "Teknikutrymmen",
          name: "UC El",
          totalArea: 20,
          components: [
            {
              id: "12a",
              name: "Huvudcentral",
              description: "Elcentral för hela byggnaden",
              status: "Aktiv",
              specs: {
                "Typ": "El",
                "Huvudsäkring": "125A",
                "Märke": "ABB",
                "Senast kontroll": "2024-01-15",
                "Nästa kontroll": "2025-01-15"
              }
            },
            {
              id: "12b",
              name: "Lägenhetsfördelning",
              description: "Fördelningscentraler för lägenheter",
              status: "Aktiv",
              specs: {
                "Typ": "El",
                "Antal centraler": "24",
                "Senast kontroll": "2024-01-15"
              }
            }
          ]
        },
        {
          id: "13",
          type: "Teknikutrymmen",
          name: "UC Tele/data/säkerhet",
          totalArea: 15,
          components: [
            {
              id: "13a",
              name: "Huvudentré passagesystem",
              description: "Elektroniskt låssystem för alla uppgångar",
              status: "Aktiv",
              specs: {
                "Typ": "Säkerhet",
                "System": "ASSA ABLOY",
                "Antal lås": "12",
                "Senast underhåll": "2024-03-15",
                "Nästa underhåll": "2024-09-15"
              }
            },
            {
              id: "13b",
              name: "Passerkort system",
              description: "RFID-kort för hyresgäster",
              status: "Aktiv",
              specs: {
                "Typ": "Säkerhet", 
                "Antal kort": "45",
                "Teknologi": "RFID 125kHz"
              }
            },
            {
              id: "13c",
              name: "Dataförbindelser",
              description: "Fiber och nätverksinfrastruktur",
              status: "Aktiv",
              specs: {
                "Typ": "Data",
                "Leverantör": "Telia",
                "Hastighet": "1000/1000 Mbps",
                "Senast uppgradering": "2023-09-10"
              }
            }
          ]
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

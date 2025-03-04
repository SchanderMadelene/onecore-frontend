
import { PropertyDetail } from "@/types/api";

export const mockPropertyDetails: Record<string, PropertyDetail> = {
  "odenplan-5": {
    id: "1",
    propertyObjectId: "P1",
    code: "FAST-001",
    designation: "Odenplan 5",
    municipality: "Västerås",
    parish: "Lundby",
    purpose: "Bostäder",
    buildingType: "Flerfamiljshus",
    propertyNumber: "12345-678",
    direction: "Nordväst",
    propertyMap: {
      image: "/placeholder.svg",
      buildings: [
        { id: "b1", name: "Huvudbyggnad A", x: 100, y: 120, width: 180, height: 80 },
        { id: "b2", name: "Gårdshus B", x: 150, y: 250, width: 100, height: 60 }
      ]
    },
    buildings: [
      {
        id: "b1",
        name: "Huvudbyggnad A",
        type: "Bostadshus",
        constructionYear: 1962,
        area: 2450,
        floors: 6,
        units: 24
      },
      {
        id: "b2",
        name: "Gårdshus B",
        type: "Bostadshus",
        constructionYear: 1965,
        area: 1200,
        floors: 3,
        units: 12
      }
    ]
  },
  "sveavagen-10": {
    id: "2",
    propertyObjectId: "P2",
    code: "FAST-002",
    designation: "Sveavägen 10",
    municipality: "Västerås",
    parish: "Domkyrkan",
    purpose: "Kontor och bostäder",
    buildingType: "Kontorskomplex",
    propertyNumber: "56789-012",
    direction: "Sydost",
    propertyMap: {
      image: "/placeholder.svg",
      buildings: [
        { id: "b3", name: "Kontorsbyggnad", x: 80, y: 100, width: 200, height: 100 },
        { id: "b4", name: "Bostadsdel", x: 120, y: 240, width: 120, height: 80 }
      ]
    },
    buildings: [
      {
        id: "b3",
        name: "Kontorsbyggnad",
        type: "Kontor",
        constructionYear: 1978,
        area: 4200,
        floors: 8,
        units: 36
      },
      {
        id: "b4",
        name: "Bostadsdel",
        type: "Bostadshus",
        constructionYear: 1980,
        area: 1800,
        floors: 6,
        units: 18
      }
    ]
  },
  "gotgatan-15": {
    id: "3",
    propertyObjectId: "P3",
    code: "FAST-003",
    designation: "Götgatan 15",
    municipality: "Västerås",
    parish: "Bäckby",
    purpose: "Bostäder och handel",
    buildingType: "Flerfamiljshus",
    propertyNumber: "34567-890",
    direction: "Sydväst",
    propertyMap: {
      image: "/placeholder.svg",
      buildings: [
        { id: "b5", name: "Bostadshus", x: 90, y: 80, width: 180, height: 90 },
        { id: "b6", name: "Butiksbyggnad", x: 130, y: 200, width: 100, height: 50 }
      ]
    },
    buildings: [
      {
        id: "b5",
        name: "Bostadshus",
        type: "Bostadshus",
        constructionYear: 1925,
        area: 2800,
        floors: 5,
        units: 30
      },
      {
        id: "b6",
        name: "Butiksbyggnad",
        type: "Butik",
        constructionYear: 1926,
        area: 450,
        floors: 1,
        units: 4
      }
    ]
  }
};

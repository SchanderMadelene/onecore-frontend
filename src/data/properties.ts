
import type { Property } from "@/types/api";

// Property mock data
export const mockProperties: Property[] = [
  {
    id: "1",
    propertyObjectId: "P1",
    code: "FAST-001",
    designation: "Kontorskomplex City",
    municipality: "Stockholm",
    purpose: "Kontor",
    buildingType: "Kontorsbyggnad"
  },
  {
    id: "2",
    propertyObjectId: "P2",
    code: "FAST-002",
    designation: "Bostadshus Centrum",
    municipality: "Stockholm",
    purpose: "Bostad",
    buildingType: "Flerfamiljshus"
  }
];

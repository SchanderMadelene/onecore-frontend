import type { Property } from "@/types/api";
import { mockPropertyDetails as propertyDetails } from "./properties/index";

// Export mockPropertyDetails for backwards compatibility
export const mockPropertyDetails = propertyDetails;

// Helper function to get building count
const getBuildingCount = (propertyId: string): number => {
  const propertyKey = Object.keys(mockPropertyDetails).find(key => 
    mockPropertyDetails[key].id === propertyId
  );
  
  if (propertyKey) {
    return mockPropertyDetails[propertyKey].buildings.length;
  }
  
  // Default to 0 if not found
  return 0;
};

// Property mock data
export const mockProperties: Property[] = [
  {
    id: "1",
    propertyObjectId: "P1",
    code: "FAST-001",
    designation: "Älgen 1",
    municipality: "Västerås",
    purpose: "Bostad",
    buildingType: "Flerbostadshus",
    buildingCount: 2
  },
  {
    id: "2",
    propertyObjectId: "P2",
    code: "FAST-002",
    designation: "Lindaren 2",
    municipality: "Västerås",
    purpose: "Bostad",
    buildingType: "Flerbostadshus",
    buildingCount: 1
  },
  {
    id: "3",
    propertyObjectId: "P3",
    code: "FAST-003",
    designation: "Björnen 4",
    municipality: "Västerås",
    purpose: "Kontor",
    buildingType: "Kontorsbyggnad",
    buildingCount: 2
  },
  {
    id: "4",
    propertyObjectId: "P4",
    code: "FAST-004",
    designation: "Pipan 1",
    municipality: "Västerås",
    purpose: "Bostad",
    buildingType: "Flerfamiljshus",
    buildingCount: 1
  },
  {
    id: "5",
    propertyObjectId: "P5",
    code: "FAST-005",
    designation: "Oskaria 1",
    municipality: "Västerås",
    purpose: "Kontor",
    buildingType: "Kontorsbyggnad",
    buildingCount: 1
  },
  {
    id: "6",
    propertyObjectId: "P6",
    code: "FAST-006",
    designation: "Styrhylsan 9",
    municipality: "Västerås",
    purpose: "Bostad",
    buildingType: "Radhus",
    buildingCount: 1
  },
  {
    id: "7",
    propertyObjectId: "P7",
    code: "FAST-007",
    designation: "Bävern 1",
    municipality: "Västerås",
    purpose: "Kontor",
    buildingType: "Kontorskomplex",
    buildingCount: 1
  }
];

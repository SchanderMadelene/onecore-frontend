import { mockPropertyDetails } from "@/entities/property/data";

export interface Building {
  id: string;
  propertyId: string;
  name: string;
}

// Extract all buildings from property details
export const mockBuildings: Building[] = Object.values(mockPropertyDetails).flatMap(property => 
  property.buildings.map(building => ({
    id: building.id,
    propertyId: property.id,
    name: building.name
  }))
);

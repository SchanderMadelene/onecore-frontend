
import { useQuery } from "@tanstack/react-query";
import { Building } from "@/types/api";
import { mockPropertyDetails } from "@/data/properties";

// Mapping of building URL segments to building IDs in mock data
const buildingIdMappings = {
  "building-a": "B1",
  "building-b": "B2", 
  "hus-a-lindaren": "B1",
  "kontorsbyggnad-a": "B1",
  "kontorsbyggnad-b": "B2",
  "flerfamiljshus-pipan": "B1",
  "kontorsbyggnad-oskaria": "B1", 
  "radhus-styrhylsan": "B1",
  "kontorskomplex-bavern": "B1",
};

export const useBuildingDetail = (
  propertyKey?: string, 
  buildingId?: string
) => {
  return useQuery({
    queryKey: ['building', propertyKey, buildingId],
    queryFn: async () => {
      // Simulating API call with a slight delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!propertyKey || !buildingId) return null;
      
      // Get property from mockPropertyDetails using propertyKey
      const property = mockPropertyDetails[propertyKey];
      
      if (!property) return null;
      
      // Map URL building ID to actual building ID in mock data
      const actualBuildingId = buildingIdMappings[buildingId];
      
      if (!actualBuildingId) {
        console.warn(`No mapping found for building ID: ${buildingId}`);
        return null;
      }
      
      // Find the building using the mapped ID
      const building = property.buildings.find(b => b.id === actualBuildingId);
      
      return building || null;
    },
    enabled: !!propertyKey && !!buildingId,
  });
};

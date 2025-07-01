
import { useQuery } from "@tanstack/react-query";
import { Building } from "@/types/api";
import { mockPropertyDetails } from "@/data/properties";

// Korrigerad mapping som matchar treeData struktur
const buildingIdMappings = {
  // Älgen 1 (bellmansgatan-1a-2c)
  "building-a": "B1", 
  "building-b": "B2",
  
  // Lindaren 2 (gotgatan-15)
  "hus-a-lindaren": "B3",
  
  // Björnen 4 (sveavagen-10) 
  "kontorsbyggnad-a": "B1",
  "kontorsbyggnad-b": "B2",
  
  // Pipan 1
  "flerfamiljshus-pipan": "B1",
  
  // Oskaria 1
  "kontorsbyggnad-oskaria": "B1",
  
  // Styrhylsan 9
  "radhus-styrhylsan": "B1", 
  
  // Bävern 1
  "kontorskomplex-bavern": "B1",
};

export const useBuildingDetail = (
  propertyKey?: string, 
  buildingId?: string
) => {
  return useQuery({
    queryKey: ['building', propertyKey, buildingId],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!propertyKey || !buildingId) return null;
      
      console.log("Looking for property:", propertyKey, "building:", buildingId);
      
      const property = mockPropertyDetails[propertyKey];
      
      if (!property) {
        console.warn(`Property not found: ${propertyKey}`);
        return null;
      }
      
      const actualBuildingId = buildingIdMappings[buildingId];
      
      if (!actualBuildingId) {
        console.warn(`No building mapping found for: ${buildingId}`);
        console.log("Available mappings:", Object.keys(buildingIdMappings));
        return null;
      }
      
      const building = property.buildings.find(b => b.id === actualBuildingId);
      
      if (!building) {
        console.warn(`Building not found with ID: ${actualBuildingId} in property: ${propertyKey}`);
        console.log("Available buildings:", property.buildings.map(b => b.id));
      }
      
      return building || null;
    },
    enabled: !!propertyKey && !!buildingId,
  });
};

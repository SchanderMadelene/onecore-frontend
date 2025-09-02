
import { useQuery } from "@tanstack/react-query";
import { Building } from "@/types/api";
import { mockPropertyDetails } from "@/data/properties";

// Korrigerad mapping som matchar treeData struktur
const buildingIdMappings = {
  // Älgen 1 (algen-1)
  "bellmansgatan-1a-2c": "B1", 
  "building-b": "B2",
  
  // Lindaren 2 (lindaren-2)
  "hus-a-lindaren": "B3",
  
  // Björnen 4 (bjornen-4) 
  "kontorsbyggnad-a": "B4",
  "kontorsbyggnad-b": "B5",
  
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
      
      const property = mockPropertyDetails[propertyKey];
      
      if (!property) {
        return null;
      }
      
      const actualBuildingId = buildingIdMappings[buildingId];
      
      if (!actualBuildingId) {
        return null;
      }
      
      const building = property.buildings.find(b => b.id === actualBuildingId);
      
      return building || null;
    },
    enabled: !!propertyKey && !!buildingId,
  });
};

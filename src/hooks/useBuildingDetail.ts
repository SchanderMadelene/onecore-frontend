
import { useQuery } from "@tanstack/react-query";
import { Building, PropertyDetail } from "@/types/api";
import { mockPropertyDetails } from "@/data/properties";

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
      
      // Find the building within the property
      const building = property.buildings.find(b => {
        // Extract the building name from the URL
        const buildingPath = buildingId.split('-').pop();
        return b.name.toLowerCase().includes(buildingPath || '');
      });
      
      return building || null;
    },
    enabled: !!propertyKey && !!buildingId,
  });
};

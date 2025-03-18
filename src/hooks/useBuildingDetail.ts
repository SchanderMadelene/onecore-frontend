
import { useQuery } from "@tanstack/react-query";
import { Building, PropertyDetail } from "@/types/api";
import { property1, property2, property3 } from "@/data/properties";

// Combined properties data
const properties = [property1, property2, property3];

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
      
      // Find the property
      const property = properties.find(p => {
        const [_, district, propertyName] = propertyKey.split('/');
        return p.parish.toLowerCase() === district && 
               p.address?.toLowerCase().includes(propertyName.replace('-', ' '));
      });
      
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

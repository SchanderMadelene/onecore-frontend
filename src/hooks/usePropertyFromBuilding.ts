
import { useQuery } from "@tanstack/react-query";
import { PropertyDetail } from "@/types/api";
import { property1, property2, property3 } from "@/data/properties";

// Combined properties data
const properties = [property1, property2, property3];

export const usePropertyFromBuilding = (
  propertyKey?: string
) => {
  return useQuery({
    queryKey: ['property-from-building', propertyKey],
    queryFn: async () => {
      // Simulating API call with a slight delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!propertyKey) return null;
      
      // Find the property
      const property = properties.find(p => {
        const [_, district, propertyName] = propertyKey.split('/');
        return p.parish.toLowerCase() === district && 
               p.address?.toLowerCase().includes(propertyName.replace('-', ' '));
      });
      
      return property || null;
    },
    enabled: !!propertyKey,
  });
};

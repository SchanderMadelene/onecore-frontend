import { useQuery } from "@tanstack/react-query";
import { PropertyDetail } from "@/types/api";
import { mockPropertyDetails } from "@/features/properties/data";

export const usePropertyFromBuilding = (
  propertyKey?: string
) => {
  return useQuery({
    queryKey: ['property-from-building', propertyKey],
    queryFn: async () => {
      // Simulating API call with a slight delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!propertyKey) return null;
      
      // Get property directly from mockPropertyDetails
      const property = mockPropertyDetails[propertyKey];
      
      return property || null;
    },
    enabled: !!propertyKey,
  });
};

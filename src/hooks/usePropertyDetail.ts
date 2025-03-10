
import { useQuery } from "@tanstack/react-query";
import { mockPropertyDetails } from "@/data/propertyDetails";
import { PropertyDetail } from "@/types/api";

export function usePropertyDetail(propertyId: string | undefined) {
  return useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => {
      // Simulera API-anrop med en fördröjning
      return new Promise<PropertyDetail>((resolve, reject) => {
        setTimeout(() => {
          if (propertyId && mockPropertyDetails[propertyId]) {
            resolve(mockPropertyDetails[propertyId]);
          } else {
            console.error('Property not found:', propertyId);
            console.log('Available properties:', Object.keys(mockPropertyDetails));
            reject(new Error('Fastighet hittades inte'));
          }
        }, 500);
      });
    },
    enabled: !!propertyId
  });
}

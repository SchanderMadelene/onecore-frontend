
import { useQuery } from "@tanstack/react-query";
import { mockPropertyDetails } from "../data/mockPropertyData";
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
            reject(new Error('Fastighet hittades inte'));
          }
        }, 500);
      });
    },
    enabled: !!propertyId
  });
}

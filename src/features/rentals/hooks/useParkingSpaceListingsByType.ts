import { useQuery } from "@tanstack/react-query";
import type { ParkingSpace } from "../types/parking";

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api';

export type ListingType = 'published' | 'ready-for-offer' | 'offered' | 'history' | 'needs-republish';

interface ListingWithOffer extends ParkingSpace {
  offer?: {
    id: number;
    status: "Active" | "Accepted" | "Declined" | "Expired";
    expiresAt: string;
  };
}

export const useParkingSpaceListingsByType = (type: ListingType) => {
  return useQuery({
    queryKey: ['parkingSpaceListings', type],
    queryFn: async (): Promise<ListingWithOffer[]> => {
      try {
        const response = await fetch(`${backendUrl}/listings/with-applicants?type=${type}`, {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.content || [];
      } catch (error) {
        // Fallback till mock data för utveckling
        return getMockDataByType(type);
      }
    },
    retry: (failureCount, error) => {
      // Inte försök igen för 401 (ej auktoriserad)
      if (error && 'response' in error && (error as any).response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Mock data för utveckling
const getMockDataByType = (type: ListingType): ListingWithOffer[] => {
  const baseData: ParkingSpace[] = [
    {
      id: "P-001",
      address: "Stenhamravägen 12",
      area: "Centrum",
      type: "Garage m el",
      queueType: "Kronologisk",
      rent: "650 kr/mån",
      seekers: 8,
      publishedFrom: "2024-01-15",
      publishedTo: "2024-02-15"
    },
    {
      id: "P-002", 
      address: "Karlsgatan 5",
      area: "Malmaberg",
      type: "Carport",
      queueType: "Poängfri",
      rent: "450 kr/mån",
      seekers: 3,
      publishedFrom: "2024-01-20",
      publishedTo: "2024-02-20"
    }
  ];

  switch (type) {
    case 'published':
      return baseData.map(item => ({ ...item, seekers: Math.floor(Math.random() * 10) }));
    case 'ready-for-offer':
      return baseData;
    case 'offered':
      return baseData.map(item => ({ 
        ...item, 
        offer: {
          id: 1,
          status: "Active" as const,
          expiresAt: "2024-02-25"
        }
      }));
    case 'history':
      return baseData.map(item => ({ 
        ...item, 
        publishedFrom: "2023-12-01",
        publishedTo: "2023-12-31"
      }));
    case 'needs-republish':
      return baseData.map(item => ({ ...item, seekers: 0 }));
    default:
      return [];
  }
};

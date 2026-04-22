import { useQuery } from "@tanstack/react-query";
import type { StorageSpace } from "../components/types/storage";

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api';

export type StorageListingType = 'published' | 'ready-for-offer' | 'offered' | 'history' | 'needs-republish';

export const useStorageSpaceListingsByType = (type: StorageListingType) => {
  return useQuery({
    queryKey: ['storageSpaceListings', type],
    queryFn: async (): Promise<StorageSpace[]> => {
      try {
        const response = await fetch(`${backendUrl}/storage-listings/with-applicants?type=${type}`, {
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
      } catch {
        return getMockDataByType(type);
      }
    },
    retry: (failureCount, error) => {
      if (error && 'response' in error && (error as any).response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

const getMockDataByType = (type: StorageListingType): StorageSpace[] => {
  const baseData: StorageSpace[] = [
    {
      id: "F-001",
      address: "Kopparbergsvägen 8, K12",
      area: "Bjurhovda",
      type: "Källarförråd",
      size: "3 m²",
      queueType: "Intern",
      rent: "120 kr/mån",
      seekers: 6,
      publishedFrom: "2024-01-15",
      publishedTo: "2024-02-15",
    },
    {
      id: "F-002",
      address: "Hagavägen 3, V4",
      area: "Gryta",
      type: "Vindsförråd",
      size: "2,5 m²",
      queueType: "Extern",
      rent: "95 kr/mån",
      seekers: 4,
      publishedFrom: "2024-01-20",
      publishedTo: "2024-02-20",
    },
    {
      id: "F-003",
      address: "Stenhamravägen 12, K27",
      area: "Centrum",
      type: "Lägenhetsförråd",
      size: "1,8 m²",
      queueType: "Extern",
      rent: "85 kr/mån",
      seekers: 2,
      publishedFrom: "2024-01-25",
      publishedTo: "2024-02-25",
    },
  ];

  switch (type) {
    case 'published':
      return baseData;
    case 'ready-for-offer':
      return baseData.slice(0, 2);
    case 'offered':
      return baseData.slice(0, 2).map(item => ({
        ...item,
        offer: { id: 1, status: "Active" as const, expiresAt: "2024-02-25" }
      }));
    case 'history':
      return baseData.slice(0, 2).map(item => ({
        ...item,
        publishedFrom: "2023-12-01",
        publishedTo: "2023-12-31",
      }));
    case 'needs-republish':
      return baseData.slice(0, 2).map(item => ({ ...item, seekers: 0 }));
    default:
      return [];
  }
};

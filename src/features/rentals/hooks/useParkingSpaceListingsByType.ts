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
  const published: ListingWithOffer[] = [
    {
      id: "P-101",
      address: "Stenhamravägen 12",
      area: "Centrum",
      type: "Garage m el",
      queueType: "Intern",
      rent: "650 kr/mån",
      seekers: 12,
      publishedFrom: "2026-04-10",
      publishedTo: "2026-04-24",
    },
    {
      id: "P-102",
      address: "Karlsgatan 5",
      area: "Malmaberg",
      type: "Carport",
      queueType: "Extern",
      rent: "450 kr/mån",
      seekers: 4,
      publishedFrom: "2026-04-12",
      publishedTo: "2026-04-26",
    },
    {
      id: "P-103",
      address: "Bellmansgatan 18",
      area: "Vasastaden",
      type: "Garage utan el",
      queueType: "Intern",
      rent: "520 kr/mån",
      seekers: 9,
      publishedFrom: "2026-04-08",
      publishedTo: "2026-04-22",
    },
    {
      id: "P-104",
      address: "Hagavägen 22",
      area: "Hagaberg",
      type: "Utomhusplats",
      queueType: "Extern",
      rent: "295 kr/mån",
      seekers: 2,
      publishedFrom: "2026-04-15",
      publishedTo: "2026-04-29",
    },
    {
      id: "P-105",
      address: "Kopparbergsvägen 4",
      area: "Bjurhovda",
      type: "Garage m el",
      queueType: "Intern",
      rent: "615 kr/mån",
      seekers: 7,
      publishedFrom: "2026-04-11",
      publishedTo: "2026-04-25",
    },
  ];

  const readyForOffer: ListingWithOffer[] = [
    {
      id: "P-201",
      address: "Vasagatan 9",
      area: "Vasastaden",
      type: "Garage m el",
      queueType: "Intern",
      rent: "595 kr/mån",
      seekers: 14,
      publishedFrom: "2026-03-20",
      publishedTo: "2026-04-03",
    },
    {
      id: "P-202",
      address: "Stigbergsgatan 7",
      area: "Stigberget",
      type: "Carport",
      queueType: "Extern",
      rent: "390 kr/mån",
      seekers: 5,
      publishedFrom: "2026-03-25",
      publishedTo: "2026-04-08",
    },
    {
      id: "P-203",
      address: "Norrgatan 14",
      area: "Skallberget",
      type: "Garage m el",
      queueType: "Intern",
      rent: "640 kr/mån",
      seekers: 10,
      publishedFrom: "2026-03-22",
      publishedTo: "2026-04-05",
    },
  ];

  const offered: ListingWithOffer[] = [
    {
      id: "P-301",
      address: "Bellmansgatan 1",
      area: "Centrum",
      type: "Garage m el",
      queueType: "Intern",
      rent: "540 kr/mån",
      seekers: 11,
      publishedFrom: "2026-03-15",
      publishedTo: "2026-03-29",
      offer: { id: 301, status: "Active", expiresAt: "2026-04-25" },
    },
    {
      id: "P-302",
      address: "Hagavägen 3",
      area: "Gryta",
      type: "Utomhusplats",
      queueType: "Extern",
      rent: "275 kr/mån",
      seekers: 3,
      publishedFrom: "2026-03-18",
      publishedTo: "2026-04-01",
      offer: { id: 302, status: "Active", expiresAt: "2026-04-26" },
    },
    {
      id: "P-303",
      address: "Kungsgatan 22",
      area: "Centrum",
      type: "Carport",
      queueType: "Intern",
      rent: "470 kr/mån",
      seekers: 8,
      publishedFrom: "2026-03-12",
      publishedTo: "2026-03-26",
      offer: { id: 303, status: "Accepted", expiresAt: "2026-04-20" },
    },
  ];

  const history: ListingWithOffer[] = [
    {
      id: "P-401",
      address: "Bellmansgatan 1",
      area: "Centrum",
      type: "Garage m el",
      queueType: "Intern",
      rent: "540 kr/mån",
      seekers: 13,
      publishedFrom: "2026-01-10",
      publishedTo: "2026-01-24",
    },
    {
      id: "P-402",
      address: "Stigbergsgatan 7",
      area: "Stigberget",
      type: "Utomhusplats",
      queueType: "Extern",
      rent: "295 kr/mån",
      seekers: 4,
      publishedFrom: "2026-02-01",
      publishedTo: "2026-02-15",
    },
    {
      id: "P-403",
      address: "Vasagatan 22",
      area: "Vasastaden",
      type: "Garage m el",
      queueType: "Intern",
      rent: "595 kr/mån",
      seekers: 9,
      publishedFrom: "2026-02-05",
      publishedTo: "2026-02-19",
    },
    {
      id: "P-404",
      address: "Norrgatan 14",
      area: "Skallberget",
      type: "Carport",
      queueType: "Extern",
      rent: "415 kr/mån",
      seekers: 2,
      publishedFrom: "2026-02-10",
      publishedTo: "2026-02-24",
    },
  ];

  const needsRepublish: ListingWithOffer[] = [
    {
      id: "P-501",
      address: "Hagavägen 22",
      area: "Hagaberg",
      type: "Utomhusplats",
      queueType: "Extern",
      rent: "295 kr/mån",
      seekers: 0,
      publishedFrom: "2026-02-15",
      publishedTo: "2026-03-01",
    },
    {
      id: "P-502",
      address: "Stenhamravägen 30",
      area: "Skallberget",
      type: "Garage utan el",
      queueType: "Intern",
      rent: "480 kr/mån",
      seekers: 0,
      publishedFrom: "2026-02-20",
      publishedTo: "2026-03-06",
    },
    {
      id: "P-503",
      address: "Kopparbergsvägen 18",
      area: "Bjurhovda",
      type: "Carport",
      queueType: "Extern",
      rent: "385 kr/mån",
      seekers: 0,
      publishedFrom: "2026-03-01",
      publishedTo: "2026-03-15",
    },
  ];

  switch (type) {
    case 'published':
      return published;
    case 'ready-for-offer':
      return readyForOffer;
    case 'offered':
      return offered;
    case 'history':
      return history;
    case 'needs-republish':
      return needsRepublish;
    default:
      return [];
  }
};

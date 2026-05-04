import { useQuery } from "@tanstack/react-query";
import type { StorageSpace } from "../types/storage";
import type { ListingType } from "./useParkingSpaceListingsByType";

interface StorageListingWithOffer extends StorageSpace {
  offer?: {
    id: number;
    status: "Active" | "Accepted" | "Declined" | "Expired";
    expiresAt: string;
  };
}

export const useStorageSpaceListingsByType = (type: ListingType) => {
  return useQuery({
    queryKey: ["storageSpaceListings", type],
    queryFn: async (): Promise<StorageListingWithOffer[]> =>
      getMockDataByType(type),
  });
};

const baseData: StorageSpace[] = [
  {
    id: "F-001",
    address: "Lärkstigen 4",
    area: "Bäckby",
    type: "Källarförråd",
    queueType: "Intern",
    rent: "180 kr/mån",
    seekers: 6,
    publishedFrom: "2024-01-12",
    publishedTo: "2024-02-12",
  },
  {
    id: "F-002",
    address: "Hammarbacksvägen 22",
    area: "Hammarby",
    type: "Vindsförråd",
    queueType: "Extern",
    rent: "210 kr/mån",
    seekers: 2,
    publishedFrom: "2024-01-18",
    publishedTo: "2024-02-18",
  },
  {
    id: "F-003",
    address: "Nybyggegatan 7",
    area: "Centrum",
    type: "Förråd inomhus",
    queueType: "Intern",
    rent: "240 kr/mån",
    seekers: 9,
    publishedFrom: "2024-01-22",
    publishedTo: "2024-02-22",
  },
  {
    id: "F-004",
    address: "Vallbyleden 14",
    area: "Vallby",
    type: "Förråd utomhus",
    queueType: "Extern",
    rent: "150 kr/mån",
    seekers: 0,
    publishedFrom: "2024-01-25",
    publishedTo: "2024-02-25",
  },
];

const getMockDataByType = (
  type: ListingType,
): StorageListingWithOffer[] => {
  switch (type) {
    case "published":
      return baseData.map((item) => ({
        ...item,
        seekers: Math.max(1, Math.floor(Math.random() * 8) + 1),
      }));
    case "ready-for-offer":
      return baseData.slice(0, 3);
    case "offered":
      return baseData.slice(0, 2).map((item) => ({
        ...item,
        offer: {
          id: 1,
          status: "Active" as const,
          expiresAt: "2024-02-25",
        },
      }));
    case "history":
      return baseData.map((item) => ({
        ...item,
        publishedFrom: "2023-12-01",
        publishedTo: "2023-12-31",
      }));
    case "needs-republish":
      return baseData
        .filter((item) => item.seekers === 0)
        .map((item) => ({ ...item, seekers: 0 }));
    default:
      return [];
  }
};

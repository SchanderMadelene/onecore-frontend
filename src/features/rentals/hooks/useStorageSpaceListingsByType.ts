import { useQuery } from "@tanstack/react-query";
import type { StorageSpace } from "../types/storage";
import { storageSpaces } from "../data/storage-spaces";
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
    queryFn: async (): Promise<StorageListingWithOffer[]> => {
      // Backend för förråd finns inte än — använder mockdata direkt.
      return getMockDataByType(type);
    },
  });
};

const getMockDataByType = (type: ListingType): StorageListingWithOffer[] => {
  switch (type) {
    case "published":
      return storageSpaces.slice(0, 4);
    case "ready-for-offer":
      return storageSpaces.slice(2, 5);
    case "offered":
      return storageSpaces.slice(0, 2).map((item) => ({
        ...item,
        offer: {
          id: 1,
          status: "Active" as const,
          expiresAt: "2024-03-01",
        },
      }));
    case "history":
      return storageSpaces.slice(4, 7).map((item) => ({
        ...item,
        publishedFrom: "2023-12-01",
        publishedTo: "2023-12-31",
      }));
    case "needs-republish":
      return storageSpaces.filter((s) => s.seekers === 0);
    default:
      return [];
  }
};

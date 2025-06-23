
import { useQuery } from "@tanstack/react-query";

export interface ParkingSpaceForPublishing {
  id: string;
  address: string;
  area: string;
  district: string;
  type: string;
  rentIncl: string;
  rentExcl: string;
  publications: number;
  queueTypes: {
    intern: boolean;
    external: boolean;
    poangfri: boolean;
  };
  selected: boolean;
}

export const useParkingSpaceListings = (type: 'published' | 'available' = 'available') => {
  return useQuery({
    queryKey: ['parkingSpaceListings', type],
    queryFn: () => {
      // Mock implementation - skulle anropa backend i verkliga applikationen
      return Promise.resolve([
        {
          id: "123-123-123-0201",
          address: "Bellmansgatan 1",
          area: "Centrum",
          district: "Centrum",
          type: "Garage m el",
          rentIncl: "540kr/mån",
          rentExcl: "540kr/mån",
          publications: 1,
          queueTypes: { intern: true, external: false, poangfri: false },
          selected: false
        },
        {
          id: "123-123-123-0202",
          address: "Bellmansgatan 2", 
          area: "Gryta",
          district: "Gryta",
          type: "Garage m el",
          rentIncl: "540kr/mån",
          rentExcl: "540kr/mån",
          publications: 1,
          queueTypes: { intern: true, external: false, poangfri: false },
          selected: false
        },
        {
          id: "123-123-123-0203",
          address: "Kungsgatan 15",
          area: "Centrum", 
          district: "Centrum",
          type: "Carport",
          rentIncl: "450kr/mån",
          rentExcl: "450kr/mån",
          publications: 1,
          queueTypes: { intern: true, external: false, poangfri: false },
          selected: false
        },
        {
          id: "123-123-123-0204",
          address: "Stigbergsgatan 7",
          area: "Stigberget",
          district: "Stigberget",
          type: "Utomhusplats", 
          rentIncl: "350kr/mån",
          rentExcl: "350kr/mån",
          publications: 1,
          queueTypes: { intern: false, external: false, poangfri: true },
          selected: false
        },
        {
          id: "123-123-123-0205",
          address: "Vasagatan 22",
          area: "Vasastaden",
          district: "Vasastaden",
          type: "Garage m el",
          rentIncl: "595kr/mån",
          rentExcl: "595kr/mån",
          publications: 1,
          queueTypes: { intern: true, external: false, poangfri: false },
          selected: false
        }
      ] as ParkingSpaceForPublishing[]);
    }
  });
};

import { useQuery } from "@tanstack/react-query";

export interface StorageSpaceForPublishing {
  id: string;
  address: string;
  area: string;
  district: string;
  type: string;
  size: string;
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

export const useStorageSpaceListings = (type: 'published' | 'available' = 'available') => {
  return useQuery({
    queryKey: ['storageSpaceListings', type],
    queryFn: () => {
      return Promise.resolve([
        {
          id: "456-456-456-K012",
          address: "Kopparbergsvägen 8, K12",
          area: "Bjurhovda",
          district: "Bjurhovda",
          type: "Källarförråd",
          size: "3 m²",
          rentIncl: "120kr/mån",
          rentExcl: "120kr/mån",
          publications: 1,
          queueTypes: { intern: true, external: false, poangfri: false },
          selected: false
        },
        {
          id: "456-456-456-V004",
          address: "Hagavägen 3, V4",
          area: "Gryta",
          district: "Gryta",
          type: "Vindsförråd",
          size: "2,5 m²",
          rentIncl: "95kr/mån",
          rentExcl: "95kr/mån",
          publications: 1,
          queueTypes: { intern: true, external: false, poangfri: false },
          selected: false
        },
        {
          id: "456-456-456-K027",
          address: "Stenhamravägen 12, K27",
          area: "Centrum",
          district: "Centrum",
          type: "Lägenhetsförråd",
          size: "1,8 m²",
          rentIncl: "85kr/mån",
          rentExcl: "85kr/mån",
          publications: 1,
          queueTypes: { intern: false, external: false, poangfri: true },
          selected: false
        },
      ] as StorageSpaceForPublishing[]);
    }
  });
};

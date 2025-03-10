
import { useQuery } from "@tanstack/react-query";
import type { Residence, Room } from "@/types/api";
import { mockResidenceData } from "@/data/residences";
import { mockRoomsData } from "@/data/rooms";

const fetchResidence = async (id: string): Promise<Residence> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  if (mockResidenceData[id]) {
    return mockResidenceData[id].content;
  }
  throw new Error('Lägenhet hittades inte');
};

const fetchRooms = async (id: string): Promise<Room[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRoomsData.content;
};

export function useResidenceData(id: string | undefined) {
  const residenceQuery = useQuery({
    queryKey: ['residence', id],
    queryFn: () => fetchResidence(id || ''),
    enabled: !!id
  });

  const roomsQuery = useQuery({
    queryKey: ['rooms', id],
    queryFn: () => fetchRooms(id || ''),
    enabled: !!id
  });

  return {
    residenceData: residenceQuery.data,
    roomsData: roomsQuery.data,
    isLoading: residenceQuery.isLoading || roomsQuery.isLoading,
    error: residenceQuery.error || roomsQuery.error
  };
}

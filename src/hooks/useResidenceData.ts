
import { useQuery } from "@tanstack/react-query";
import type { Residence, Room } from "@/types/api";
import { mockResidenceData } from "@/data/residences";
import { mockRoomsData } from "@/data/rooms";

const fetchResidence = async (id: string): Promise<Residence> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Try to find the residence by ID
  if (mockResidenceData[id]) {
    return mockResidenceData[id].content;
  }
  
  // If not found by direct ID, try to extract from potential path format
  const lastSegment = id.split('/').pop();
  if (lastSegment && mockResidenceData[lastSegment]) {
    return mockResidenceData[lastSegment].content;
  }
  
  // If still not found, throw error
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
    enabled: !!id,
    retry: false // Don't retry if the residence doesn't exist
  });

  const roomsQuery = useQuery({
    queryKey: ['rooms', id],
    queryFn: () => fetchRooms(id || ''),
    enabled: !!id && !residenceQuery.error
  });

  return {
    residenceData: residenceQuery.data,
    roomsData: roomsQuery.data,
    isLoading: residenceQuery.isLoading || roomsQuery.isLoading,
    error: residenceQuery.error || roomsQuery.error
  };
}

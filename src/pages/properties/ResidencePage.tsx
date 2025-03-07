
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Residence, Room } from "@/types/api";
import { ResidenceInfo } from "@/components/residence/ResidenceInfo";
import { ResidenceBasicInfo } from "@/components/residence/ResidenceBasicInfo";
import { PageLayout } from "@/components/layout/PageLayout";
import { ResidenceInspection } from "@/components/residence/ResidenceInspection";
import { TenantInformation } from "@/components/residence/inspection/form/TenantInformation";
import { CreateIssue } from "@/components/residence/CreateIssue";
import { mockResidenceData, mockRoomsData, mockTenant } from "@/data/mockData";

const fetchResidence = async (id: string): Promise<Residence> => {
  // Simulera en nätverksfördröjning
  await new Promise(resolve => setTimeout(resolve, 500));
  if (mockResidenceData[id]) {
    return mockResidenceData[id].content;
  }
  throw new Error('Lägenhet hittades inte');
};

const fetchRooms = async (id: string): Promise<Room[]> => {
  // Simulera en nätverksfördröjning
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRoomsData.content;
};

const getOrientationText = (orientation: number) => {
  switch (orientation) {
    case 1: return "Norr";
    case 2: return "Öster";
    case 3: return "Söder";
    case 4: return "Väster";
    default: return "Okänd";
  }
};

export const ResidencePage = () => {
  const { city, district, property, id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: residenceData, isLoading: isLoadingResidence, error: residenceError } = useQuery({
    queryKey: ['residence', id],
    queryFn: () => fetchResidence(id || ''),
    enabled: !!id
  });

  const { data: roomsData, isLoading: isLoadingRooms, error: roomsError } = useQuery({
    queryKey: ['rooms', id],
    queryFn: () => fetchRooms(id || ''),
    enabled: !!id
  });

  if (isLoadingResidence || isLoadingRooms) {
    return <div>Laddar...</div>;
  }

  if (residenceError || roomsError) {
    return <div>Ett fel uppstod: {(residenceError || roomsError)?.message}</div>;
  }

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <ResidenceBasicInfo
          residence={residenceData}
          property={property}
          district={district}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TenantInformation tenant={mockTenant} />
          <CreateIssue />
        </div>
        
        {roomsData && (
          <>
            <ResidenceInfo 
              rooms={roomsData}
              getOrientationText={getOrientationText}
            />
            <ResidenceInspection
              rooms={roomsData}
            />
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default ResidencePage;

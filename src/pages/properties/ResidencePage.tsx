
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Residence, Room } from "@/types/api";
import type { APIResponse } from "@/types/api";
import { ResidenceInfo } from "@/components/residence/ResidenceInfo";
import { ResidenceBasicInfo } from "@/components/residence/ResidenceBasicInfo";
import { PageLayout } from "@/components/layout/PageLayout";
import { ResidenceInspection } from "@/components/residence/ResidenceInspection";

const mockResidenceData: APIResponse<Residence> = {
  content: {
    id: "101",
    code: "LGH-101",
    name: "Kontorslokal med utsikt",
    deleted: false,
    validityPeriod: {
      fromDate: "2024-01-01T00:00:00Z",
      toDate: "2024-12-31T23:59:59Z"
    }
  }
};

const mockRoomsData: APIResponse<Room[]> = {
  content: [
    {
      id: "1",
      code: "RUM-101",
      name: "Vardagsrum",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 1
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 1
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 1,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "1",
        roomTypeCode: "VARDAGSRUM",
        name: "Vardagsrum",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "2",
      code: "RUM-102",
      name: "Kök",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 2
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 2
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 2,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "2",
        roomTypeCode: "KOK",
        name: "Kök",
        use: 2,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "3",
      code: "RUM-103",
      name: "Sovrum 1",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 1
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 3
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 3,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "3",
        roomTypeCode: "SOVRUM",
        name: "Sovrum",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "4",
      code: "RUM-104",
      name: "Badrum",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 3
      },
      features: {
        hasToilet: true,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 2
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 4,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "4",
        roomTypeCode: "BADRUM",
        name: "Badrum",
        use: 3,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "5",
      code: "RUM-105",
      name: "Sovrum 2",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 1
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 4
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 5,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "3",
        roomTypeCode: "SOVRUM",
        name: "Sovrum",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "6",
      code: "RUM-106",
      name: "Hall",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 4
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: false,
        orientation: 1
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 6,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "5",
        roomTypeCode: "HALL",
        name: "Hall",
        use: 4,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    }
  ]
};

const fetchResidence = async (id: string): Promise<Residence> => {
  // Simulera en nätverksfördröjning
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockResidenceData.content;
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

const ResidencePage = () => {
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

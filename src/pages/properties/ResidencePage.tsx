
import { useParams } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";
import { TreeView } from "@/components/TreeView";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Residence, Room, APIResponse } from "@/types/api";
import { InspectionDialog } from "@/components/inspection/inspection-dialog";
import { ResidenceInfo } from "@/components/residence/ResidenceInfo";

const mockResidenceData: APIResponse<Residence> = {
  content: {
    id: "1002",
    code: "LGH-1002",
    name: "Lägenhet 1002, Odenplan 5",
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
      code: "HALL-101",
      name: "Hall",
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
        roomTypeCode: "HALL",
        name: "Hall",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "2",
      code: "VRUM-101",
      name: "Vardagsrum",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 2
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
      sortingOrder: 2,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "2",
        roomTypeCode: "VRUM",
        name: "Vardagsrum",
        use: 2,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "3",
      code: "KOK-101",
      name: "Kök",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 3
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
      sortingOrder: 3,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "3",
        roomTypeCode: "KOK",
        name: "Kök",
        use: 3,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "4",
      code: "SOV-101",
      name: "Sovrum (Master)",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 4
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
      sortingOrder: 4,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "4",
        roomTypeCode: "SOV",
        name: "Sovrum",
        use: 4,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "5",
      code: "SOV-102",
      name: "Sovrum 2",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 4
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
      sortingOrder: 5,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "4",
        roomTypeCode: "SOV",
        name: "Sovrum",
        use: 4,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "6",
      code: "BAD-101",
      name: "Badrum",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 5
      },
      features: {
        hasToilet: true,
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
      sortingOrder: 6,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "5",
        roomTypeCode: "BAD",
        name: "Badrum",
        use: 5,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    }
  ]
};

const fetchResidence = async (id: string): Promise<Residence> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockResidenceData.content;
};

const fetchRooms = async (id: string): Promise<Room[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRoomsData.content;
};

const ResidencePage = () => {
  const { city, district, property, id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInspectionDialogOpen, setIsInspectionDialogOpen] = useState(false);

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

  const onCreateInspection = (data: any) => {
    console.log("Creating inspection protocol:", data);
    setIsInspectionDialogOpen(false);
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

  if (isLoadingResidence || isLoadingRooms) {
    return <div>Laddar...</div>;
  }

  if (residenceError || roomsError) {
    return <div>Ett fel uppstod: {(residenceError || roomsError)?.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <NavigationBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex h-[calc(100vh-3.5rem)] mt-14 relative">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            w-[280px] lg:w-64 
            bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
            fixed lg:static 
            left-0 top-14 
            h-[calc(100vh-3.5rem)] 
            transition-transform duration-300 ease-in-out
            z-50 lg:z-0
            border-r
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <TreeView onNavigate={() => setIsSidebarOpen(false)} />
        </aside>

        <main
          className={`
            flex-1 
            p-4 sm:p-6 lg:p-8 
            transition-all duration-300 
            w-full
            overflow-y-auto
            ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}
          `}
        >
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Lägenhet {residenceData?.code}</h1>
                <p className="text-muted-foreground">{property?.replace("-", " ")}, {district}</p>
              </div>
              
              <Button className="gap-2" onClick={() => setIsInspectionDialogOpen(true)}>
                <PlusCircle className="h-4 w-4" />
                Skapa nytt besiktningsprotokoll
              </Button>
            </div>

            <InspectionDialog
              open={isInspectionDialogOpen}
              onOpenChange={setIsInspectionDialogOpen}
              rooms={roomsData}
              onSubmit={onCreateInspection}
            />

            <ResidenceInfo
              rooms={roomsData}
              getOrientationText={getOrientationText}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResidencePage;


import { useState } from "react";
import { toast } from "sonner";
import type { Room } from "@/types/api";
import { InspectionStart } from "./inspection/InspectionStart";
import { InspectionHistory } from "./inspection/InspectionHistory";
import type { InspectionRoom, Inspection } from "./inspection/types";
import { InspectionProgress } from "./inspection/InspectionProgress";
import { useInspectionProgress } from "./inspection/useInspectionProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicInformation } from "./inspection/form/BasicInformation";

interface ResidenceInspectionProps {
  rooms: Room[];
}

const LOCAL_STORAGE_KEY = "inspections";

const loadInspections = (): Inspection[] => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveInspections = (inspections: Inspection[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inspections));
};

export const ResidenceInspection = ({ rooms }: ResidenceInspectionProps) => {
  const [inspectionHistory, setInspectionHistory] = useState<Inspection[]>(loadInspections);
  const [currentInspection, setCurrentInspection] = useState<{
    inspectorName: string;
    rooms: Record<string, InspectionRoom>;
  } | null>(null);
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  const progress = useInspectionProgress(rooms, currentInspection?.rooms ?? null);

  const handleSaveInspection = (inspectorName: string, inspectionData: Record<string, InspectionRoom>) => {
    const newInspection: Inspection = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      inspectedBy: inspectorName,
      rooms: inspectionData
    };

    const updatedHistory = [newInspection, ...inspectionHistory];
    setInspectionHistory(updatedHistory);
    saveInspections(updatedHistory);
    setCurrentInspection(null);
    
    toast.success("Besiktningen har sparats");
  };

  const handleRoomToggle = (roomId: string) => {
    setExpandedRoomId(expandedRoomId === roomId ? null : roomId);
  };

  const renderInspectionContent = () => {
    return (
      <div className="space-y-4">
        {rooms.map(room => (
          <InspectionStart
            key={room.id}
            rooms={[room]}
            onSave={handleSaveInspection}
            isExpanded={expandedRoomId === room.id}
            onToggle={() => handleRoomToggle(room.id)}
            currentInspection={currentInspection}
          />
        ))}
      </div>
    );
  };

  if (!currentInspection) {
    return (
      <div className="space-y-6 w-full max-w-4xl mx-auto">
        <InspectionHistory 
          inspections={inspectionHistory}
        />
        <InspectionStart
          rooms={rooms}
          onSave={handleSaveInspection}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <InspectionHistory 
        inspections={inspectionHistory}
      />
      
      <div className="space-y-6">
        {progress && (
          <InspectionProgress
            progress={progress.progress}
            stats={progress.stats}
            inspectorName={currentInspection.inspectorName}
          />
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Besiktning - {currentInspection.inspectorName}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="w-full justify-start bg-background border-b rounded-none px-0">
                <TabsTrigger value="basic" className="text-base data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Grundläggande info
                </TabsTrigger>
                <TabsTrigger value="protocol" className="text-base data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Protokoll
                </TabsTrigger>
                <TabsTrigger value="floorplan" className="text-base data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Planritning
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="mt-6">
                <BasicInformation 
                  inspectorName={currentInspection.inspectorName}
                  roomCount={rooms.length}
                />
              </TabsContent>

              <TabsContent value="protocol" className="mt-6">
                {renderInspectionContent()}
              </TabsContent>

              <TabsContent value="floorplan" className="mt-6">
                <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Planritning är inte tillgänglig</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

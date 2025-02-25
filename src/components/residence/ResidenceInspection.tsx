
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

interface ResidenceInspectionProps {
  rooms: Room[];
}

// Simulera lokal lagring av besiktningar
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

  const handleLoadInspection = (inspection: Inspection) => {
    setCurrentInspection({
      inspectorName: inspection.inspectedBy,
      rooms: inspection.rooms
    });
    toast.success("Besiktning laddad");
  };

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

  return (
    <div className="space-y-6">
      <InspectionHistory 
        inspections={inspectionHistory}
        onLoadInspection={handleLoadInspection}
      />
      
      {currentInspection ? (
        <div className="space-y-6">
          {progress && (
            <InspectionProgress
              progress={progress.progress}
              stats={progress.stats}
              inspectorName={currentInspection.inspectorName}
            />
          )}
          <Tabs defaultValue="protocol" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Grundläggande info</TabsTrigger>
              <TabsTrigger value="protocol">Protokoll</TabsTrigger>
              <TabsTrigger value="floorplan">Planritning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Grundläggande information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Besiktningsman</p>
                      <p className="font-medium">{currentInspection.inspectorName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Datum</p>
                      <p className="font-medium">{new Date().toLocaleDateString("sv-SE")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Antal rum</p>
                      <p className="font-medium">{rooms.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">Pågående</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="protocol">
              {renderInspectionContent()}
            </TabsContent>

            <TabsContent value="floorplan">
              <Card>
                <CardHeader>
                  <CardTitle>Planritning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Planritning är inte tillgänglig</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <InspectionStart
          rooms={rooms}
          onSave={handleSaveInspection}
        />
      )}
    </div>
  );
};

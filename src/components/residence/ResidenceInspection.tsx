
import { useState } from "react";
import { toast } from "sonner";
import type { Room } from "@/types/api";
import { InspectionStart } from "./inspection/InspectionStart";
import { InspectionHistory } from "./inspection/InspectionHistory";
import type { InspectionRoom, Inspection } from "./inspection/types";
import { InspectionProgress } from "./inspection/InspectionProgress";
import { useInspectionProgress } from "./inspection/useInspectionProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadInspections, saveInspections } from "./inspection/utils/storage";
import { initializeRoomData } from "./inspection/utils/room";
import { InspectionTabs } from "./inspection/InspectionTabs";

interface ResidenceInspectionProps {
  rooms: Room[];
}

export const ResidenceInspection = ({ rooms }: ResidenceInspectionProps) => {
  const [inspectionHistory, setInspectionHistory] = useState<Inspection[]>(loadInspections);
  const [currentInspection, setCurrentInspection] = useState<{
    inspectorName: string;
    rooms: Record<string, InspectionRoom>;
  } | null>(null);
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  const progress = useInspectionProgress(rooms, currentInspection?.rooms ?? null);

  const handleLoadInspection = (inspection: Inspection) => {
    const currentRoomData = initializeRoomData(rooms);
    const mergedRooms = Object.keys(currentRoomData).reduce((acc, roomId) => {
      if (inspection.rooms[roomId]) {
        acc[roomId] = inspection.rooms[roomId];
      } else {
        acc[roomId] = currentRoomData[roomId];
      }
      return acc;
    }, {} as Record<string, InspectionRoom>);

    setCurrentInspection({
      inspectorName: inspection.inspectedBy,
      rooms: mergedRooms
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

  if (!currentInspection) {
    return (
      <div className="space-y-6 w-full max-w-4xl mx-auto">
        <InspectionHistory 
          inspections={inspectionHistory}
          onLoadInspection={handleLoadInspection}
        />
        <InspectionStart
          rooms={rooms}
          onSave={(inspectorName, _) => {
            const initialRoomData = initializeRoomData(rooms);
            handleSaveInspection(inspectorName, initialRoomData);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <InspectionHistory 
        inspections={inspectionHistory}
        onLoadInspection={handleLoadInspection}
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
            <InspectionTabs
              inspectorName={currentInspection.inspectorName}
              roomCount={rooms.length}
            >
              {renderInspectionContent()}
            </InspectionTabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

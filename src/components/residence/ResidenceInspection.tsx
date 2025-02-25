
import { useState } from "react";
import { toast } from "sonner";
import type { Room } from "@/types/api";
import { InspectionStart } from "./inspection/InspectionStart";
import { InspectionHistory } from "./inspection/InspectionHistory";
import type { InspectionRoom, Inspection } from "./inspection/types";
import { InspectionProgress } from "./inspection/InspectionProgress";
import { useInspectionProgress } from "./inspection/useInspectionProgress";

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
          <div className="space-y-4">
            {rooms.map(room => (
              <InspectionStart
                key={room.id}
                rooms={[room]}
                onSave={handleSaveInspection}
                isExpanded={expandedRoomId === room.id}
                onToggle={() => handleRoomToggle(room.id)}
              />
            ))}
          </div>
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

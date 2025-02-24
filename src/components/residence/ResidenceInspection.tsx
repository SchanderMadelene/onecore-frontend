
import { useState } from "react";
import { toast } from "sonner";
import type { Room } from "@/types/api";
import { InspectionStart } from "./inspection/InspectionStart";
import { InspectionHistory } from "./inspection/InspectionHistory";
import type { InspectionRoom as InspectionRoomType, Inspection } from "./inspection/types";

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

  const handleLoadInspection = (inspection: Inspection) => {
    // TODO: Implement edit functionality
    toast.success("Besiktning laddad");
  };

  const handleSaveInspection = (inspectorName: string, inspectionData: Record<string, InspectionRoomType>) => {
    const newInspection: Inspection = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      inspectedBy: inspectorName,
      rooms: inspectionData
    };

    const updatedHistory = [newInspection, ...inspectionHistory];
    setInspectionHistory(updatedHistory);
    saveInspections(updatedHistory);
    
    toast.success("Besiktningen har sparats");
  };

  return (
    <div className="space-y-6">
      <InspectionHistory 
        inspections={inspectionHistory}
        onLoadInspection={handleLoadInspection}
      />
      <InspectionStart
        rooms={rooms}
        onSave={handleSaveInspection}
      />
    </div>
  );
};


import { useState } from "react";
import { toast } from "sonner";
import type { Room } from "@/types/api";
import type { Inspection } from "./inspection/types";
import { InspectionsList } from "./inspection/InspectionsList";
import { InspectionHistory } from "./inspection/InspectionHistory";

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
  const [inspections, setInspections] = useState<Inspection[]>(loadInspections);

  const handleInspectionCreated = () => {
    setInspections(loadInspections());
    toast.success("Besiktningen har skapats");
  };

  return (
    <div className="space-y-6">
      {inspections.length > 0 && (
        <InspectionHistory inspections={inspections} />
      )}
      
      <InspectionsList
        rooms={rooms}
        inspections={inspections}
        onInspectionCreated={handleInspectionCreated}
      />
    </div>
  );
};

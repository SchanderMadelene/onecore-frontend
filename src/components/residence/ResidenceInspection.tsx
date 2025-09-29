
import { useState } from "react";
import { toast } from "sonner";
import type { Room } from "@/types/api";
import type { Inspection } from "./inspection/types";
import { InspectionsList } from "./inspection/InspectionsList";
import { TabLayout } from "@/components/ui/tab-layout";
import { ClipboardList } from "lucide-react";

interface ResidenceInspectionProps {
  rooms: Room[];
  tenant?: any;
}

const LOCAL_STORAGE_KEY = "inspections";

const loadInspections = (): Inspection[] => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveInspections = (inspections: Inspection[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inspections));
};

export const ResidenceInspection = ({ rooms, tenant }: ResidenceInspectionProps) => {
  const [inspections, setInspections] = useState<Inspection[]>(loadInspections);

  const handleInspectionCreated = () => {
    setInspections(loadInspections());
    toast.success("Besiktningen har skapats");
  };

  return (
    <TabLayout 
      title="Besiktningar" 
      count={inspections.length}
      showCard={true}
    >
      <InspectionsList
        rooms={rooms}
        inspections={inspections}
        onInspectionCreated={handleInspectionCreated}
        tenant={tenant}
      />
    </TabLayout>
  );
};

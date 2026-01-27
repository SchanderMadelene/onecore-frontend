
import { useState } from "react";
import { toast } from "sonner";
import type { Room, Residence } from "@/types/api";
import type { Inspection } from "./inspection/types";
import { InspectionsList } from "./inspection/InspectionsList";
import { TabLayout } from "@/components/ui/tab-layout";

interface ResidenceInspectionProps {
  rooms: Room[];
  tenant?: any;
  residence?: Residence;
}

const LOCAL_STORAGE_KEY = "inspections";

const loadInspections = (): Inspection[] => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const ResidenceInspection = ({ rooms, tenant, residence }: ResidenceInspectionProps) => {
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
        residence={residence}
      />
    </TabLayout>
  );
};

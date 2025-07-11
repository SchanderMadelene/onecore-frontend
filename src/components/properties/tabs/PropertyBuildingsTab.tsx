
import { PropertyBuildingsList } from "@/components/properties";
import { TabLayout } from "@/components/ui/tab-layout";
import { Building2 } from "lucide-react";
import type { Building } from "@/types/api";

interface PropertyBuildingsTabProps {
  buildings: Building[];
}

export const PropertyBuildingsTab = ({ buildings }: PropertyBuildingsTabProps) => {
  return (
    <TabLayout 
      title="Byggnader" 
      icon={Building2}
      count={buildings?.length || 0}
      showCard={false}
    >
      <PropertyBuildingsList buildings={buildings} />
    </TabLayout>
  );
};

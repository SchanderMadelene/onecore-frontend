
import { Building } from "@/types/api";
import { BuildingEntranceHierarchy } from "./BuildingEntranceHierarchy";
import { TabLayout } from "@/components/ui/tab-layout";
import { Users } from "lucide-react";

interface BuildingEntrancesProps {
  building: Building;
  basePath: string;
}

export const BuildingEntrances = ({
  building,
  basePath
}: BuildingEntrancesProps) => {
  return (
    <TabLayout 
      title="Uppgångar" 
      icon={Users}
      count={building.entrances?.length || 0}
      showCard={true}
    >
      <BuildingEntranceHierarchy 
        building={building} 
        basePath={basePath} 
      />
    </TabLayout>
  );
};

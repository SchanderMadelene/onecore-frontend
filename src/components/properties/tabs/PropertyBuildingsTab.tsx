
import { PropertyBuildingsList } from "@/components/properties";
import type { Building } from "@/types/api";

interface PropertyBuildingsTabProps {
  buildings: Building[];
}

export const PropertyBuildingsTab = ({ buildings }: PropertyBuildingsTabProps) => {
  return <PropertyBuildingsList buildings={buildings} />;
};

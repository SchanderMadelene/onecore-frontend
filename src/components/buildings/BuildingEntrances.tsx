
import { Building } from "@/types/api";
import { BuildingEntranceHierarchy } from "./BuildingEntranceHierarchy";

interface BuildingEntrancesProps {
  building: Building;
  basePath: string;
}

export const BuildingEntrances = ({
  building,
  basePath
}: BuildingEntrancesProps) => {
  return (
    <BuildingEntranceHierarchy 
      building={building} 
      basePath={basePath} 
    />
  );
};

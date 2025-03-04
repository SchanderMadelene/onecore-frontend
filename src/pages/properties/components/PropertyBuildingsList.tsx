
import { Building } from "@/types/api";
import PropertyBuildingCard from "./PropertyBuildingCard";

interface PropertyBuildingsListProps {
  buildings: Building[];
}

const PropertyBuildingsList = ({ buildings }: PropertyBuildingsListProps) => {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {buildings.map((building) => (
        <PropertyBuildingCard key={building.id} building={building} />
      ))}
    </div>
  );
};

export default PropertyBuildingsList;

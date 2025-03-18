
import { Building } from "@/types/api";
import { Building as BuildingIcon, Building2, MapPin } from "lucide-react";

interface BuildingHeaderProps {
  building: Building;
  propertyName?: string;
}

export const BuildingHeader = ({ building, propertyName }: BuildingHeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Building2 className="h-4 w-4" />
        <span>{propertyName}</span>
        <span>/</span>
        <BuildingIcon className="h-4 w-4" />
        <span>{building.name}</span>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{building.name}</h1>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <BuildingIcon className="h-4 w-4" />
            <span>{building.type}</span>
            <span className="mx-2">•</span>
            <MapPin className="h-4 w-4" />
            <span>{building.area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

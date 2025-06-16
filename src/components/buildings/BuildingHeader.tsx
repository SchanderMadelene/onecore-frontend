
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
        <span>Älgen 1</span>
        <span>/</span>
        <BuildingIcon className="h-4 w-4" />
        <span>Bellmansgatan 1A - 2C</span>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Bellmansgatan 1A - 2C</h1>
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


import { Building } from "@/types/api";
import { Building as BuildingIcon, Building2 } from "lucide-react";
import { PropertyBreadcrumb } from "@/components/navigation/Breadcrumb";

interface BuildingHeaderProps {
  building: Building;
  propertyName?: string;
}

export const BuildingHeader = ({ building, propertyName }: BuildingHeaderProps) => {
  return (
    <div className="space-y-4">
      <PropertyBreadcrumb />
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{building.name}</h1>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <BuildingIcon className="h-4 w-4" />
            <span>{building.type}</span>
            <span className="mx-2">•</span>
            <span>{building.area} m²</span>
            {building.constructionYear && (
              <>
                <span className="mx-2">•</span>
                <span>Byggnadsår: {building.constructionYear}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

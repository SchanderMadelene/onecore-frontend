
import { Building } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building as BuildingIcon, Home } from "lucide-react";

interface PropertyBuildingCardProps {
  building: Building;
}

const PropertyBuildingCard = ({ building }: PropertyBuildingCardProps) => {
  return (
    <Card key={building.id}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{building.name}</CardTitle>
          {building.type === "Bostadshus" ? (
            <Home className="h-5 w-5 text-muted-foreground" />
          ) : (
            <BuildingIcon className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{building.type}</p>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Byggår</p>
            <p className="font-medium">{building.constructionYear}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Yta</p>
            <p className="font-medium">{building.area} m²</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Våningar</p>
            <p className="font-medium">{building.floors}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Lägenheter/lokaler</p>
            <p className="font-medium">{building.units}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyBuildingCard;


import type { Building } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyBuildingCardProps {
  building: Building;
}

export const PropertyBuildingCard = ({ building }: PropertyBuildingCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{building.name}</CardTitle>
            <p className="text-muted-foreground text-sm">{building.type}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Byggnadsyta</p>
              <p className="font-medium">{building.area} m²</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Våningar</p>
              <p className="font-medium">{building.floors}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Byggår</p>
              <p className="font-medium">{building.constructionYear}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Enheter</p>
              <p className="font-medium">{building.units}</p>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-sm font-medium">Lägenheter</span>
              </div>
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                {building.apartments?.length || 0} st
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-medium">Hyresgäster</span>
              </div>
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                {building.tenants || 0} st
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { Building } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BuildingBasicInfoProps {
  building: Building;
  propertyName?: string;
  address?: string;
  objectNumber?: string;
}

export const BuildingBasicInfo = ({ 
  building, 
  propertyName, 
  address = "Bellmansgatan 1A - 2C",
  objectNumber = "OBJ-001"
}: BuildingBasicInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Grundinformation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Adress</p>
            <p className="font-medium">{address}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Objektsnummer</p>
            <p className="font-medium">{objectNumber}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Fastighet</p>
            <p className="font-medium">{propertyName || "Okänd fastighet"}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Allmän yta</p>
            <p className="font-medium">{building.area} m²</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Byggnadsår</p>
            <p className="font-medium">{building.constructionYear}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

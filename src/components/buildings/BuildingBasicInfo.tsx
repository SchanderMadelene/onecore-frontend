
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
  address,
  objectNumber
}: BuildingBasicInfoProps) => {
  // Calculate total apartments across all entrances
  const totalApartments = building.entrances?.reduce((total, entrance) => 
    total + (entrance.apartments?.length || 0), 0) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Grundinformation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Objektsnummer</p>
            <p className="font-medium">{objectNumber || building.id}</p>
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
            <p className="font-medium">{building.constructionYear || "Ej angivet"}</p>
          </div>
          
          {address && (
            <div>
              <p className="text-sm text-muted-foreground">Adress</p>
              <p className="font-medium">{address}</p>
            </div>
          )}
          
          <div>
            <p className="text-sm text-muted-foreground">Byggnadstyp</p>
            <p className="font-medium">{building.type}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Antal lägenheter</p>
            <p className="font-medium">{totalApartments}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

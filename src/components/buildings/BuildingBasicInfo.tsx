
import { Building } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building as BuildingIcon, MapPin, Hash, Home, Calendar, Square } from "lucide-react";

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
        <CardTitle className="flex items-center gap-2">
          <BuildingIcon className="h-5 w-5" />
          Grundinformation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Adress</p>
              <p className="font-medium">{address}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Hash className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Objektsnummer</p>
              <p className="font-medium">{objectNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Home className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fastighet</p>
              <p className="font-medium">{propertyName || "Okänd fastighet"}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Square className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Allmän yta</p>
              <p className="font-medium">{building.area} m²</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Byggnadsår</p>
              <p className="font-medium">{building.constructionYear}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

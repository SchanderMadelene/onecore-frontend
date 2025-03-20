
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin } from "lucide-react";
import type { PropertyDetail } from "@/types/api";

interface PropertyBasicInfoProps {
  propertyDetail: PropertyDetail;
}

export const PropertyBasicInfo = ({ propertyDetail }: PropertyBasicInfoProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle>Grundläggande information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Fastighetsbeteckning</p>
              <p className="font-medium">{propertyDetail.designation}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kommun</p>
              <p className="font-medium">{propertyDetail.municipality}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Adress</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{propertyDetail.address || "-"}</p>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Fastighetsstatus</p>
              <p className="font-medium">
                Aktiv
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Antal byggnader</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{propertyDetail.buildings.length}</p>
                <Building className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Byggnadsår</p>
              <p className="font-medium">
                {propertyDetail.buildings.length > 0 
                  ? propertyDetail.buildings[0].constructionYear 
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PropertyDetail } from "@/types/api";

interface PropertyBasicInfoProps {
  property: PropertyDetail;
}

export const PropertyBasicInfo = ({ property }: PropertyBasicInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Fastighetskod</p>
            <p className="font-medium">{property.code}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Beteckning</p>
            <p className="font-medium">{property.designation}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fastighetstyp</p>
            <p className="font-medium">{property.purpose}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Kommun</p>
            <p className="font-medium">{property.municipality}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

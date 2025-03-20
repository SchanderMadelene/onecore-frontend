
import { MapPin } from "lucide-react";
import { PropertyMapView } from "@/components/properties";
import type { PropertyDetail } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyMapTabProps {
  propertyDetail: PropertyDetail;
}

export const PropertyMapTab = ({
  propertyDetail
}: PropertyMapTabProps) => {
  return <Card>
      <CardHeader>
        <CardTitle>Ritningar</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-bold mb-6">Ritningar</h2>
        {propertyDetail.propertyMap ? (
          <PropertyMapView propertyDetail={propertyDetail} />
        ) : (
          <EmptyDrawingState label="Ritningar" />
        )}
      </CardContent>
    </Card>;
};

const EmptyDrawingState = ({
  label
}: {
  label: string;
}) => {
  return <div className="border rounded-lg p-6 text-center">
      <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">Ritningar saknas</h3>
      <p className="text-muted-foreground">
        Ritningar för {label} finns inte tillgängliga för denna fastighet.
      </p>
    </div>;
};

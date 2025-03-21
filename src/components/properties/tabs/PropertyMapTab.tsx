
import { PropertyMapView } from "@/components/properties";
import type { PropertyDetail } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyMapTabProps {
  propertyDetail: PropertyDetail;
}

export const PropertyMapTab = ({
  propertyDetail
}: PropertyMapTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ritningar</CardTitle>
      </CardHeader>
      <CardContent>
        {propertyDetail.propertyMap ? (
          <PropertyMapView propertyDetail={propertyDetail} />
        ) : (
          <EmptyDrawingState label="Ritningar" />
        )}
      </CardContent>
    </Card>
  );
};

const EmptyDrawingState = ({
  label
}: {
  label: string;
}) => {
  return (
    <div className="text-center py-6">
      <h3 className="text-xl font-medium mb-2">Ritningar saknas</h3>
      <p className="text-muted-foreground">
        Ritningar för {label} finns inte tillgängliga för denna fastighet.
      </p>
    </div>
  );
};

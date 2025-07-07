
import { PropertyMapView } from "@/components/properties";
import type { PropertyDetail } from "@/types/api";

interface PropertyMapTabProps {
  propertyDetail: PropertyDetail;
}

export const PropertyMapTab = ({
  propertyDetail
}: PropertyMapTabProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Ritningar</h3>
      {propertyDetail.propertyMap ? (
        <PropertyMapView propertyDetail={propertyDetail} />
      ) : (
        <EmptyDrawingState label="Ritningar" />
      )}
    </div>
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

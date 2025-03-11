
import { MapPin } from "lucide-react";
import { PropertyMapView } from "@/components/properties";
import type { PropertyDetail } from "@/types/api";

interface PropertyMapTabProps {
  propertyDetail: PropertyDetail;
}

export const PropertyMapTab = ({ propertyDetail }: PropertyMapTabProps) => {
  return (
    <>
      {propertyDetail.propertyMap && (
        <PropertyMapView propertyDetail={propertyDetail} />
      )}
      {!propertyDetail.propertyMap && (
        <div className="border rounded-lg p-6 text-center">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Karta saknas</h3>
          <p className="text-muted-foreground">
            Fastighetskarta finns inte tillgänglig för denna fastighet.
          </p>
        </div>
      )}
    </>
  );
};


import type { PropertyDetail } from "@/types/api";

interface PropertyHeaderProps {
  propertyDetail: PropertyDetail;
}

export const PropertyHeader = ({ propertyDetail }: PropertyHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">{propertyDetail.designation}</h1>
      <p className="text-muted-foreground text-sm">
        {propertyDetail.address || propertyDetail.designation}, {propertyDetail.municipality}
      </p>
    </div>
  );
};

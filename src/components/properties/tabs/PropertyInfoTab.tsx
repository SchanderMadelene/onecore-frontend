
import { PropertyBasicInfo } from "@/components/properties/PropertyBasicInfo";
import type { PropertyDetail } from "@/types/api";

interface PropertyInfoTabProps {
  property: PropertyDetail;
}

export const PropertyInfoTab = ({ property }: PropertyInfoTabProps) => {
  return (
    <div className="space-y-6">
      {/* Only show detailed property information here, basic info is shown above tabs */}
      <PropertyBasicInfo propertyDetail={property} showBasicInfoOnly={false} showDetailedInfo={true} />
    </div>
  );
};

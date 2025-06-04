
import { PropertyBasicInfo } from "@/components/properties/PropertyBasicInfo";
import type { PropertyDetail } from "@/types/api";

interface PropertyInfoTabProps {
  property: PropertyDetail;
}

export const PropertyInfoTab = ({ property }: PropertyInfoTabProps) => {
  return (
    <div className="space-y-6">
      {/* Basic information card */}
      <PropertyBasicInfo propertyDetail={property} showBasicInfoOnly={true} />
      
      {/* Detailed property information */}
      <PropertyBasicInfo propertyDetail={property} showBasicInfoOnly={false} showDetailedInfo={true} />
    </div>
  );
};

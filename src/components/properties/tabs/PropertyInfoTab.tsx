
import { PropertyBasicInfo, PropertyStatisticsSummary } from "@/components/properties";
import type { PropertyDetail } from "@/types/api";

interface PropertyInfoTabProps {
  property: PropertyDetail;
}

export const PropertyInfoTab = ({ property }: PropertyInfoTabProps) => {
  return (
    <div className="space-y-8">
      <PropertyBasicInfo property={property} />
      <PropertyStatisticsSummary property={property} />
    </div>
  );
};

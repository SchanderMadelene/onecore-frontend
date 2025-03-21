
import { PropertyStatisticsSummary } from "@/components/properties";
import type { PropertyDetail } from "@/types/api";

interface PropertyInfoTabProps {
  property: PropertyDetail;
}

export const PropertyInfoTab = ({ property }: PropertyInfoTabProps) => {
  return (
    <div className="space-y-8">
      <PropertyStatisticsSummary property={property} />
    </div>
  );
};


import { PropertyStatisticsSummary } from "@/components/properties/PropertyStatisticsSummary";
import type { PropertyDetail } from "@/types/api";

interface PropertyStatisticsTabProps {
  property: PropertyDetail;
}

export const PropertyStatisticsTab = ({ property }: PropertyStatisticsTabProps) => {
  return (
    <div className="space-y-6">
      <PropertyStatisticsSummary property={property} />
    </div>
  );
};

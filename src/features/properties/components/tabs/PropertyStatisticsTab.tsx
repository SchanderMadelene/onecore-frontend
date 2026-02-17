
import { PropertyStatisticsSummary } from "@/features/properties/components/PropertyStatisticsSummary";
import { TabLayout } from "@/components/ui/tab-layout";
import { BarChart3 } from "lucide-react";
import type { PropertyDetail } from "@/types/api";

interface PropertyStatisticsTabProps {
  property: PropertyDetail;
}

export const PropertyStatisticsTab = ({ property }: PropertyStatisticsTabProps) => {
  return (
    <TabLayout 
      title="Fastighetssammanställning" 
      showCard={true}
    >
      <PropertyStatisticsSummary property={property} />
    </TabLayout>
  );
};

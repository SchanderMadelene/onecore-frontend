
import { PropertyStatisticsSummary } from "@/components/properties/PropertyStatisticsSummary";
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
      icon={BarChart3}
      showCard={true}
    >
      <PropertyStatisticsSummary property={property} />
    </TabLayout>
  );
};

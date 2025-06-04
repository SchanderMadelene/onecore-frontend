
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyStatisticsSummary } from "@/components/properties/PropertyStatisticsSummary";
import type { PropertyDetail } from "@/types/api";

interface PropertyStatisticsTabProps {
  property: PropertyDetail;
}

export const PropertyStatisticsTab = ({ property }: PropertyStatisticsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fastighetssammanställning</CardTitle>
      </CardHeader>
      <PropertyStatisticsSummary property={property} />
    </Card>
  );
};

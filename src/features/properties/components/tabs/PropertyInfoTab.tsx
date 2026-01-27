
import { PropertyBasicInfo } from "@/features/properties/components";
import { TabLayout } from "@/components/ui/tab-layout";
import { Info } from "lucide-react";
import type { PropertyDetail } from "@/types/api";

interface PropertyInfoTabProps {
  property: PropertyDetail;
}

export const PropertyInfoTab = ({ property }: PropertyInfoTabProps) => {
  return (
    <TabLayout 
      title="Fastighetsinfo" 
      showCard={true}
    >
      <PropertyBasicInfo propertyDetail={property} showBasicInfoOnly={false} showDetailedInfo={true} />
    </TabLayout>
  );
};

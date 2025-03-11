
import { PropertyBasicInfo } from "@/components/properties";
import type { PropertyDetail } from "@/types/api";

interface PropertyInfoTabProps {
  property: PropertyDetail;
}

export const PropertyInfoTab = ({ property }: PropertyInfoTabProps) => {
  return <PropertyBasicInfo property={property} />;
};

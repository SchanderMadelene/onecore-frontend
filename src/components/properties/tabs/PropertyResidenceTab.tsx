
import { PropertyApartmentsTab } from "./PropertyApartmentsTab";
import type { Building } from "@/types/api";

interface PropertyResidenceTabProps {
  buildings: Building[];
}

export const PropertyResidenceTab = ({ buildings }: PropertyResidenceTabProps) => {
  return <PropertyApartmentsTab buildings={buildings} />;
};

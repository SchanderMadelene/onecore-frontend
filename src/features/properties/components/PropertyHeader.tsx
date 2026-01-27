
import type { PropertyDetail } from "@/types/api";

interface PropertyHeaderProps {
  propertyDetail: PropertyDetail;
}

export const PropertyHeader = ({ propertyDetail }: PropertyHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Älgen 1</h1>
    </div>
  );
};

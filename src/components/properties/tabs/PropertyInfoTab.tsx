
import type { PropertyDetail } from "@/types/api";

interface PropertyInfoTabProps {
  property: PropertyDetail;
}

export const PropertyInfoTab = ({ property }: PropertyInfoTabProps) => {
  return (
    <div className="space-y-8">
      <div className="text-muted-foreground">
        Grundläggande fastighetsinformation visas här.
      </div>
    </div>
  );
};

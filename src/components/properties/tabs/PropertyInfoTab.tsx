
import { Card, CardContent } from "@/components/ui/card";
import type { PropertyDetail } from "@/types/api";

interface PropertyInfoTabProps {
  property: PropertyDetail;
}

export const PropertyInfoTab = ({ property }: PropertyInfoTabProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Grundläggande fastighetsinformation visas här.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PropertyDetail } from "@/types/api";

interface PropertyInfoTabProps {
  property: PropertyDetail;
}

export const PropertyInfoTab = ({ property }: PropertyInfoTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fastighet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground">
          Grundläggande fastighetsinformation visas här.
        </div>
      </CardContent>
    </Card>
  );
};

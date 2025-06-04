
import { Card, CardContent } from "@/components/ui/card";

export const PropertyStatisticsTab = () => {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Ingen statistik tillgänglig för denna fastighet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

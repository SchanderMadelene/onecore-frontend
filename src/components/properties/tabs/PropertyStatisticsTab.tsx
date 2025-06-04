
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PropertyStatisticsTab = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Statistik</CardTitle>
      </CardHeader>
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

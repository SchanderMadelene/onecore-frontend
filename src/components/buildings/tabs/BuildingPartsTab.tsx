
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Building } from "@/types/api";

interface BuildingPartsTabProps {
  building: Building;
}

export const BuildingPartsTab = ({ building }: BuildingPartsTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-medium mb-2">Inga byggnadsdelar</h3>
          <p className="text-muted-foreground">
            Det finns inga byggnadsdelar registrerade för denna byggnad ännu.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

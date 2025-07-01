
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Building } from "@/types/api";

interface BuildingParkingTabProps {
  building: Building;
}

export const BuildingParkingTab = ({ building }: BuildingParkingTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-medium mb-2">Ingen parkering</h3>
          <p className="text-muted-foreground">
            Det finns inga parkeringsplatser registrerade för denna byggnad ännu.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

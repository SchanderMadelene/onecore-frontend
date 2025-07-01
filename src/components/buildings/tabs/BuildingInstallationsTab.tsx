
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Building } from "@/types/api";

interface BuildingInstallationsTabProps {
  building: Building;
}

export const BuildingInstallationsTab = ({ building }: BuildingInstallationsTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Installationer</h2>
      
      <Card>
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-medium mb-2">Inga installationer</h3>
          <p className="text-muted-foreground">
            Det finns inga installationer registrerade för denna byggnad ännu.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

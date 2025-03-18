
import { Card, CardContent } from "@/components/ui/card";
import { MaintenanceUnit } from "@/types/api";

interface PropertyMaintenanceUnitsTabProps {
  maintenanceUnits?: MaintenanceUnit[];
}

export const PropertyMaintenanceUnitsTab = ({ maintenanceUnits }: PropertyMaintenanceUnitsTabProps) => {
  if (!maintenanceUnits || maintenanceUnits.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-muted-foreground">
          Inga underhållsenheter registrerade för denna fastighet
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {maintenanceUnits.map((unit) => (
          <Card key={unit.id} className="hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg">{unit.type}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

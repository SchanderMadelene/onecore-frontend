
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceUnit } from "@/types/api";
import { Building } from "lucide-react";

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

  // Get icon based on maintenance unit type
  const getIcon = (type: MaintenanceUnit["type"]) => {
    // We'll just use the Building icon for all types for now
    return <Building className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {maintenanceUnits.map((unit) => (
          <Card key={unit.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {getIcon(unit.type)} {unit.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Typ:</div>
                <div>{unit.type}</div>
                
                <div className="text-muted-foreground">Area:</div>
                <div>{unit.area} m²</div>
                
                <div className="text-muted-foreground">Byggnadsår:</div>
                <div>{unit.constructionYear}</div>
                
                <div className="text-muted-foreground">Status:</div>
                <div>{unit.status}</div>
                
                {unit.lastRenovated && (
                  <>
                    <div className="text-muted-foreground">Senast renoverad:</div>
                    <div>{unit.lastRenovated}</div>
                  </>
                )}
                
                {unit.description && (
                  <div className="col-span-2 mt-2">
                    <div className="text-muted-foreground">Beskrivning:</div>
                    <div>{unit.description}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

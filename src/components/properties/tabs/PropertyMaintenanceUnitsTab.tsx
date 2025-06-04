
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MaintenanceUnit } from "@/types/api";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";

interface PropertyMaintenanceUnitsTabProps {
  maintenanceUnits?: MaintenanceUnit[];
}

export const PropertyMaintenanceUnitsTab = ({ maintenanceUnits }: PropertyMaintenanceUnitsTabProps) => {
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>(null);

  const handleUnitToggle = (unitId: string) => {
    setExpandedUnitId(expandedUnitId === unitId ? null : unitId);
  };

  // Subkomponenter för återvinning
  const renderRecyclingSubComponents = () => {
    return (
      <div className="space-y-3">
        <div className="border rounded-lg p-3 bg-background">
          <h4 className="font-medium text-sm mb-2">Miljöbod</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Subkomponent för återvinning</p>
          </div>
        </div>
        <div className="border rounded-lg p-3 bg-background">
          <h4 className="font-medium text-sm mb-2">Markbehållare</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Subkomponent för återvinning</p>
          </div>
        </div>
      </div>
    );
  };

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
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        {maintenanceUnits.map(unit => (
          <div key={unit.id}>
            <button
              className="w-full bg-card hover:bg-accent/50 border rounded-lg p-3 sm:p-4 transition-colors text-left"
              onClick={() => handleUnitToggle(unit.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{unit.type}</span>
                    {unit.area > 0 && (
                      <span className="text-sm text-muted-foreground">({unit.area} m²)</span>
                    )}
                  </div>
                  {unit.description && (
                    <p className="text-sm text-muted-foreground mt-1">{unit.description}</p>
                  )}
                </div>
                {expandedUnitId === unit.id ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </button>

            {expandedUnitId === unit.id && (
              <div className="mt-2 p-3 sm:p-4 border rounded-lg bg-muted/50 space-y-4">
                <div className="flex justify-end mb-4">
                  <CreateOrderDialog 
                    buttonSize="sm"
                    buttonVariant="outline"
                    contextType="residence"
                    maintenanceUnit={unit}
                  />
                </div>
                
                {unit.type === "Återvinning" ? (
                  renderRecyclingSubComponents()
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground text-sm">Innehåll kommer att läggas till senare</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

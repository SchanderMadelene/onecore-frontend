
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { Settings } from "lucide-react";
import { MaintenanceUnit } from "@/types/api";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";

interface PropertyMaintenanceUnitsTabProps {
  maintenanceUnits?: MaintenanceUnit[];
}

export const PropertyMaintenanceUnitsTab = ({ maintenanceUnits }: PropertyMaintenanceUnitsTabProps) => {
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
      <TabLayout 
        title="Underhållsenheter" 
        icon={Settings}
        count={0}
      >
        <EmptyState
          icon={Settings}
          title="Inga underhållsenheter"
          description="Inga underhållsenheter registrerade för denna fastighet."
        />
      </TabLayout>
    );
  }

  return (
    <TabLayout 
      title="Underhållsenheter" 
      icon={Settings}
      count={maintenanceUnits.length}
      showCard={true}
    >
      <Accordion type="single" collapsible className="space-y-2">
        {maintenanceUnits.map(unit => (
          <AccordionItem 
            key={unit.id} 
            value={unit.id}
            className="rounded-lg border border-slate-200 bg-white"
          >
            <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
              <div className="flex-1 text-left">
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
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-3 sm:px-4 pb-4 pt-1 space-y-4">
                <div className="flex justify-end">
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </TabLayout>
  );
};

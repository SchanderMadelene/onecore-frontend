
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { Building } from "@/types/api";
import { ComponentCard } from "@/components/design-system/showcase/cards/ComponentCard";

interface BuildingSpacesTabProps {
  building: Building;
}

// Helper function to get status badge
const getStatusBadge = (status?: string) => {
  if (!status) return null;
  
  const variant = status === "Aktiv" ? "default" : 
                  status === "Under underhåll" ? "secondary" : "destructive";
  
  return <Badge variant={variant} className="text-xs">{status}</Badge>;
};

export const BuildingSpacesTab = ({ building }: BuildingSpacesTabProps) => {
  const spaces = building.spaces || [];

  if (!spaces || spaces.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium mb-2">Inga utrymmen</h3>
        <p className="text-muted-foreground">
          Det finns inga utrymmen registrerade för denna byggnad.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-2">
        {spaces.map(space => (
          <AccordionItem 
            key={space.id} 
            value={space.id}
            className="rounded-lg border border-slate-200 bg-white"
          >
            <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{space.name}</span>
                  {space.totalArea && (
                    <span className="text-sm text-muted-foreground">({space.totalArea} m²)</span>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent>
              <div className="px-3 sm:px-4 pb-4 pt-1 space-y-4">
                {space.components && space.components.length > 0 ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {space.components.map(component => (
                        <ComponentCard
                          key={component.id}
                          title={component.name}
                          description={component.description}
                          type={space.name}
                          specs={[
                            { label: "Status", value: component.status || "Aktiv" },
                            ...(component.area ? [{ label: "Yta", value: `${component.area} m²` }] : []),
                            ...(component.specs ? Object.entries(component.specs).map(([key, value]) => ({
                              label: key,
                              value: String(value)
                            })) : [])
                          ]}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground p-2">
                    Inga komponenter registrerade för detta utrymme.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

// import { MaintenanceUnitCard } from "@/components/design-system/showcase/maintenance/MaintenanceUnitCard"; // TODO: Replace with new unified component
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { Info } from "lucide-react";
import type { Room } from "@/types/api";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResidenceInfoProps {
  rooms: Room[];
  getOrientationText: (orientation: number) => string;
}

export const ResidenceInfo = ({ rooms, getOrientationText }: ResidenceInfoProps) => {
  const isMobile = useIsMobile();

  // Mock data för underhållsenheter i köket
  const getMaintenanceUnitsForRoom = (roomId: string) => {
    
    if (roomId === "2") { // Kök (RUM-102)
      const units = [
        {
          name: "Diskmaskin",
          specs: {
            ekonomiskLivslangd: "12 år",
            tekniskLivslangd: "15 år", 
            year: "2019",
            quantity: "1 st",
            brand: "Electrolux",
            model: "ESF5555LOX"
          }
        },
        {
          name: "Spis",
          specs: {
            ekonomiskLivslangd: "15 år",
            tekniskLivslangd: "20 år",
            year: "2018", 
            quantity: "1 st",
            brand: "IKEA",
            model: "TILLREDA"
          }
        }
      ];
      return units;
    }
    return [];
  };

  if (!rooms || rooms.length === 0) {
    return (
      <TabLayout 
        title="Rumsinformation" 
        count={0}
      >
        <EmptyState
          icon={Info}
          title="Ingen rumsinformation tillgänglig"
          description="Det finns ingen information om rum i denna lägenhet."
        />
      </TabLayout>
    );
  }

  return (
    <TabLayout 
      title="Rumsinformation" 
      count={rooms.length}
      showCard={true}
    >
      <Accordion type="single" collapsible className="space-y-2">
        {rooms.map(room => (
          <AccordionItem 
            key={room.id} 
            value={room.id}
            className="rounded-lg border border-slate-200 bg-white"
          >
            <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
              <div className="flex items-center gap-2">
                <span className="font-medium">{room.name || room.roomType?.name}</span>
                {room.size && (
                  <span className="text-sm text-muted-foreground">({room.size} m²)</span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-3 sm:px-4 pb-4 pt-1">
                {getMaintenanceUnitsForRoom(room.id).length > 0 ? (
                  <div className="grid gap-3">
                    {getMaintenanceUnitsForRoom(room.id).map((unit, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground">Underhållskort kommer snart</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground text-sm">Ingen underhållsinformation tillgänglig</p>
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

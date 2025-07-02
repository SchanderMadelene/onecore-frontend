
import { MaintenanceUnitCard } from "@/components/design-system/showcase/maintenance/MaintenanceUnitCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Room } from "@/types/api";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResidenceInfoProps {
  rooms: Room[];
  getOrientationText: (orientation: number) => string;
}

export const ResidenceInfo = ({ rooms, getOrientationText }: ResidenceInfoProps) => {
  const isMobile = useIsMobile();

  console.log("ResidenceInfo rendering with rooms:", rooms);

  // Mock data för underhållsenheter i köket
  const getMaintenanceUnitsForRoom = (roomId: string) => {
    console.log("Getting maintenance units for room:", roomId);
    
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
      console.log("Returning units for kitchen:", units);
      return units;
    }
    console.log("No units for room:", roomId);
    return [];
  };

  if (!rooms || rooms.length === 0) {
    console.log("No rooms data available");
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Ingen rumsinformation tillgänglig</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible>
        {rooms.map(room => (
          <AccordionItem 
            key={room.id} 
            value={room.id}
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
                      <MaintenanceUnitCard 
                        key={index} 
                        subComponents={[unit]} 
                      />
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
    </div>
  );
};

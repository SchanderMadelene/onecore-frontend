
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaintenanceUnitCard } from "@/components/design-system/showcase/maintenance/MaintenanceUnitCard";
import type { Room } from "@/types/api";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResidenceInfoProps {
  rooms: Room[];
  getOrientationText: (orientation: number) => string;
}

export const ResidenceInfo = ({ rooms, getOrientationText }: ResidenceInfoProps) => {
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Mock data för underhållsenheter i köket
  const getMaintenanceUnitsForRoom = (roomId: string) => {
    if (roomId === "2") { // Kök (RUM-102)
      return [
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
    }
    return [];
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="rooms" className="w-full">
        <TabsList className="mb-4 bg-slate-100/70 p-1 rounded-lg">
          <TabsTrigger value="rooms">Rumsinformation</TabsTrigger>
          <TabsTrigger value="floorplan">Planritning</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms">
          <div className="grid grid-cols-1 gap-2">
            {rooms.map(room => (
              <div key={room.id}>
                <button
                  className="w-full bg-card hover:bg-accent/50 border rounded-lg p-3 sm:p-4 transition-colors text-left"
                  onClick={() => setExpandedRoomId(expandedRoomId === room.id ? null : room.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{room.name || room.roomType?.name}</span>
                        {room.size && (
                          <span className="text-sm text-muted-foreground">({room.size} m²)</span>
                        )}
                      </div>
                    </div>
                    {expandedRoomId === room.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {expandedRoomId === room.id && (
                  <div className="mt-2 p-3 sm:p-4 border rounded-lg bg-muted/50 space-y-4">
                    {/* Underhållsenheter */}
                    {getMaintenanceUnitsForRoom(room.id).length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700">Underhållsenheter</h4>
                        <div className="grid gap-3">
                          {getMaintenanceUnitsForRoom(room.id).map((unit, index) => (
                            <MaintenanceUnitCard 
                              key={index} 
                              subComponents={[unit]} 
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="floorplan">
          <div className="flex items-center justify-center h-[200px] sm:h-[400px] border-2 border-dashed rounded-lg bg-muted/10">
            <p className="text-muted-foreground text-sm">Planritning är inte tillgänglig</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

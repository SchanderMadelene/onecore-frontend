
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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

  const handleRoomToggle = (roomId: string) => {
    console.log("Toggling room:", roomId);
    setExpandedRoomId(expandedRoomId === roomId ? null : roomId);
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
      <div className="grid grid-cols-1 gap-2">
        {rooms.map(room => (
          <div key={room.id}>
            <button
              className="w-full bg-card hover:bg-accent/50 border rounded-lg p-3 sm:p-4 transition-colors text-left"
              onClick={() => handleRoomToggle(room.id)}
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
                {getMaintenanceUnitsForRoom(room.id).length > 0 && (
                  <div className="grid gap-3">
                    {getMaintenanceUnitsForRoom(room.id).map((unit, index) => (
                      <MaintenanceUnitCard 
                        key={index} 
                        subComponents={[unit]} 
                      />
                    ))}
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

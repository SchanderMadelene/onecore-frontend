
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Room } from "@/types/api";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResidenceInfoProps {
  rooms: Room[];
  getOrientationText: (orientation: number) => string;
}

export const ResidenceInfo = ({ rooms, getOrientationText }: ResidenceInfoProps) => {
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const isMobile = useIsMobile();

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
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                        <span className="font-medium">{room.name || room.roomType?.name || room.code}</span>
                        <span className="text-sm text-muted-foreground">{room.code}</span>
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
                    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
                      <div>
                        <p className="text-sm text-muted-foreground">Typ</p>
                        <p className="font-medium">{room.roomType?.name || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Orientering</p>
                        <p className="font-medium">{getOrientationText(room.features.orientation)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium">{room.deleted ? 'Borttagen' : 'Aktiv'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Delat utrymme</p>
                        <p className="font-medium">{room.usage.shared ? 'Ja' : 'Nej'}</p>
                      </div>
                    </div>

                    <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
                      <div>
                        <p className="text-sm text-muted-foreground">Uppvärmd</p>
                        <p className="font-medium">{room.features.isHeated ? 'Ja' : 'Nej'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Termostatventil</p>
                        <p className="font-medium">{room.features.hasThermostatValve ? 'Ja' : 'Nej'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Toalett</p>
                        <p className="font-medium">{room.features.hasToilet ? 'Ja' : 'Nej'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Periodiskt arbete</p>
                        <p className="font-medium">{room.usage.allowPeriodicWorks ? 'Tillåtet' : 'Ej tillåtet'}</p>
                      </div>
                    </div>
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


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Room } from "@/types/api";

interface ResidenceInfoProps {
  rooms: Room[];
  getOrientationText: (orientation: number) => string;
}

export const ResidenceInfo = ({ rooms, getOrientationText }: ResidenceInfoProps) => {
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rumsöversikt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              Totalt antal rum: {rooms.length}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Uppvärmda rum</p>
                <p className="font-medium">{rooms.filter(room => room.features.isHeated).length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Med termostatventil</p>
                <p className="font-medium">{rooms.filter(room => room.features.hasThermostatValve).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orientering</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(orientation => (
                <div key={orientation}>
                  <p className="text-sm text-muted-foreground">{getOrientationText(orientation)}</p>
                  <p className="font-medium">
                    {rooms.filter(room => room.features.orientation === orientation).length} rum
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rumsinformation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {rooms.map(room => (
              <div key={room.id}>
                <button
                  className="w-full bg-card hover:bg-accent/50 border rounded-lg p-4 transition-colors text-left"
                  onClick={() => setExpandedRoomId(expandedRoomId === room.id ? null : room.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
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
                  <div className="mt-2 p-4 border rounded-lg bg-muted/50 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </CardContent>
      </Card>
    </>
  );
};

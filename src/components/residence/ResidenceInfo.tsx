
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Room } from "@/types/api";
import { Badge } from "@/components/ui/badge";

interface ResidenceInfoProps {
  rooms?: Room[];
  getOrientationText: (orientation: number) => string;
}

export const ResidenceInfo = ({ rooms, getOrientationText }: ResidenceInfoProps) => {
  const getTotalArea = () => {
    // Detta skulle normalt beräknas från faktiska rumsareor
    return "92 m²";
  };

  const getRoomTypeCount = () => {
    const counts: Record<string, number> = {};
    rooms?.forEach(room => {
      const type = room.roomType?.name || 'Okänd';
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  };

  const roomTypeCounts = getRoomTypeCount();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Lägenhetsöversikt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Grundinformation</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Total area:</span> {getTotalArea()}</p>
                <p><span className="text-muted-foreground">Antal rum:</span> {rooms?.length || 0}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Rumsfördelning</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(roomTypeCounts).map(([type, count]) => (
                  <Badge key={type} variant="secondary">
                    {type}: {count}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Status</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Senast uppdaterad:</span>{" "}
                  {new Date().toLocaleDateString('sv-SE')}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rumsinformation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {rooms?.map((room, index) => (
              <div key={room.id}>
                {index > 0 && <Separator className="my-6" />}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{room.name || room.code}</h3>
                      <p className="text-sm text-muted-foreground">{room.roomType?.name}</p>
                    </div>
                    <Badge>{room.code}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Egenskaper</h4>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <span className="text-muted-foreground">Orientering:</span>{" "}
                          {getOrientationText(room.features.orientation)}
                        </li>
                        <li>
                          <span className="text-muted-foreground">Uppvärmd:</span>{" "}
                          {room.features.isHeated ? "Ja" : "Nej"}
                        </li>
                        <li>
                          <span className="text-muted-foreground">Termostatventil:</span>{" "}
                          {room.features.hasThermostatValve ? "Ja" : "Nej"}
                        </li>
                        <li>
                          <span className="text-muted-foreground">Toalett:</span>{" "}
                          {room.features.hasToilet ? "Ja" : "Nej"}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Användning</h4>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <span className="text-muted-foreground">Delat utrymme:</span>{" "}
                          {room.usage.shared ? "Ja" : "Nej"}
                        </li>
                        <li>
                          <span className="text-muted-foreground">Tillåter periodiskt arbete:</span>{" "}
                          {room.usage.allowPeriodicWorks ? "Ja" : "Nej"}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Datum</h4>
                      <ul className="space-y-1 text-sm">
                        <li>
                          <span className="text-muted-foreground">Från:</span>{" "}
                          {new Date(room.dates.from).toLocaleDateString('sv-SE')}
                        </li>
                        <li>
                          <span className="text-muted-foreground">Till:</span>{" "}
                          {new Date(room.dates.to).toLocaleDateString('sv-SE')}
                        </li>
                        {room.dates.installation && (
                          <li>
                            <span className="text-muted-foreground">Installation:</span>{" "}
                            {new Date(room.dates.installation).toLocaleDateString('sv-SE')}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Room } from "@/types/api";

interface ResidenceInfoProps {
  rooms?: Room[];
  getOrientationText: (orientation: number) => string;
}

export const ResidenceInfo = ({ rooms, getOrientationText }: ResidenceInfoProps) => {
  const mockInspectionItems = {
    floor: [
      { id: "f1", type: "floor" as const, name: "Parkettgolv", condition: "good" as const, notes: "" },
      { id: "f2", type: "floor" as const, name: "Trösklar", condition: "good" as const, notes: "" }
    ],
    wall: [
      { id: "w1", type: "wall" as const, name: "Väggar", condition: "good" as const, notes: "" },
      { id: "w2", type: "wall" as const, name: "Tapeter", condition: "good" as const, notes: "" }
    ],
    ceiling: [
      { id: "c1", type: "ceiling" as const, name: "Innertak", condition: "good" as const, notes: "" }
    ],
    appliance: [
      { id: "a1", type: "appliance" as const, name: "Kylskåp", condition: "good" as const, notes: "" },
      { id: "a2", type: "appliance" as const, name: "Spis", condition: "good" as const, notes: "" }
    ]
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Rum för besiktning</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {rooms?.map(room => (
            <div key={room.id} className="border rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rumskod</p>
                  <p className="font-medium">{room.code}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Namn</p>
                  <p className="font-medium">{room.name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Typ</p>
                  <p className="font-medium">{room.roomType?.name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orientering</p>
                  <p className="font-medium">{getOrientationText(room.features.orientation)}</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(mockInspectionItems).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-medium mb-2">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    <ul className="text-sm space-y-1">
                      {items.map(item => (
                        <li key={item.id} className="text-muted-foreground">
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

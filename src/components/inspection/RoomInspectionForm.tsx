
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Room, InspectionItem } from "@/types/api";

interface RoomInspectionFormProps {
  rooms?: Room[];
}

const mockInspectionItems: Record<string, InspectionItem[]> = {
  floor: [
    { id: "f1", type: "floor", name: "Parkettgolv", condition: "good", notes: "" },
    { id: "f2", type: "floor", name: "Trösklar", condition: "good", notes: "" }
  ],
  wall: [
    { id: "w1", type: "wall", name: "Väggar", condition: "good", notes: "" },
    { id: "w2", type: "wall", name: "Tapeter", condition: "good", notes: "" }
  ],
  ceiling: [
    { id: "c1", type: "ceiling", name: "Innertak", condition: "good", notes: "" }
  ],
  appliance: [
    { id: "a1", type: "appliance", name: "Kylskåp", condition: "good", notes: "" },
    { id: "a2", type: "appliance", name: "Spis", condition: "good", notes: "" }
  ]
};

export const RoomInspectionForm = ({ rooms }: RoomInspectionFormProps) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Rum att besiktiga</h3>
      <div className="grid gap-4">
        {rooms?.map((room) => (
          <div
            key={room.id}
            className="border rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{room.name || room.code}</h4>
                <p className="text-sm text-muted-foreground">
                  {room.roomType?.name || "Typ ej specificerad"}
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => setSelectedRoomId(room.id)}
              >
                Besiktiga rum
              </Button>
            </div>
            
            {selectedRoomId === room.id && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InspectionCategory title="Golv" items={mockInspectionItems.floor} />
                  <InspectionCategory title="Väggar" items={mockInspectionItems.wall} />
                  <InspectionCategory title="Tak" items={mockInspectionItems.ceiling} />
                  <InspectionCategory title="Vitvaror" items={mockInspectionItems.appliance} />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedRoomId(null)}
                  >
                    Stäng
                  </Button>
                  <Button
                    onClick={() => console.log("Sparar rumsbesiktning")}
                  >
                    Spara
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface InspectionCategoryProps {
  title: string;
  items: InspectionItem[];
}

const InspectionCategory = ({ title, items }: InspectionCategoryProps) => (
  <div className="space-y-3">
    <h5 className="font-medium">{title}</h5>
    {items.map((item) => (
      <div key={item.id} className="space-y-2">
        <div className="flex justify-between items-center">
          <span>{item.name}</span>
          <select
            className="text-sm border rounded p-1"
            value={item.condition}
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="good">Bra skick</option>
            <option value="fair">Acceptabelt</option>
            <option value="poor">Behöver åtgärd</option>
          </select>
        </div>
        <Textarea
          placeholder="Anteckningar om skicket..."
          className="text-sm"
          value={item.notes}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
    ))}
  </div>
);

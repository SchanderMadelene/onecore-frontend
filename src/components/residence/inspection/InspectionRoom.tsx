
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Camera } from "lucide-react";
import { ConditionSelect } from "./ConditionSelect";
import type { Room } from "@/types/api";

interface InspectionRoom {
  roomId: string;
  conditions: {
    walls: string;
    floor: string;
    ceiling: string;
    details: string;
  };
  actions: {
    walls: string[];
    floor: string[];
    ceiling: string[];
    details: string[];
  };
  notes: string;
  photos: string[];
}

interface InspectionRoomProps {
  room: Room;
  isExpanded: boolean;
  onToggle: () => void;
  inspectionData: InspectionRoom;
  onConditionUpdate: (field: keyof InspectionRoom["conditions"], value: string) => void;
  onActionUpdate: (field: keyof InspectionRoom["actions"], action: string) => void;
  onNotesUpdate: (notes: string) => void;
}

export const InspectionRoom = ({
  room,
  isExpanded,
  onToggle,
  inspectionData,
  onConditionUpdate,
  onActionUpdate,
  onNotesUpdate,
}: InspectionRoomProps) => {
  return (
    <div className="border rounded-lg">
      <button
        className="w-full bg-card hover:bg-accent/50 p-4 flex items-center justify-between text-left"
        onClick={onToggle}
      >
        <span className="font-medium">{room.name || room.roomType?.name || room.code}</span>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {isExpanded && (
        <div className="p-4 border-t space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ConditionSelect
              label="Väggar"
              value={inspectionData.conditions.walls}
              onChange={(value) => onConditionUpdate("walls", value)}
              actions={inspectionData.actions.walls}
              onActionUpdate={(action) => onActionUpdate("walls", action)}
              type="walls"
            />
            <ConditionSelect
              label="Golv"
              value={inspectionData.conditions.floor}
              onChange={(value) => onConditionUpdate("floor", value)}
              actions={inspectionData.actions.floor}
              onActionUpdate={(action) => onActionUpdate("floor", action)}
              type="floor"
            />
            <ConditionSelect
              label="Tak"
              value={inspectionData.conditions.ceiling}
              onChange={(value) => onConditionUpdate("ceiling", value)}
              actions={inspectionData.actions.ceiling}
              onActionUpdate={(action) => onActionUpdate("ceiling", action)}
              type="ceiling"
            />
            <ConditionSelect
              label="Detaljer"
              value={inspectionData.conditions.details}
              onChange={(value) => onConditionUpdate("details", value)}
              actions={inspectionData.actions.details}
              onActionUpdate={(action) => onActionUpdate("details", action)}
              type="details"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Anteckningar</label>
            <textarea
              className="w-full border rounded-md p-2 mt-1"
              rows={3}
              value={inspectionData.notes}
              onChange={(e) => onNotesUpdate(e.target.value)}
              placeholder="Skriv eventuella kommentarer eller noteringar här..."
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Foton</label>
            <Button variant="outline">
              <Camera className="mr-2 h-4 w-4" />
              Lägg till foto
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

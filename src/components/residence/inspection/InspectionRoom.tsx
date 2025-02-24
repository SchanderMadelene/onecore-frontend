
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Camera, CheckCircle } from "lucide-react";
import { ConditionSelect } from "./ConditionSelect";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";

interface InspectionRoomProps {
  room: Room;
  isExpanded: boolean;
  onToggle: () => void;
  inspectionData: InspectionRoomType;
  onConditionUpdate: (field: keyof InspectionRoomType["conditions"], value: string) => void;
  onActionUpdate: (field: keyof InspectionRoomType["actions"], action: string) => void;
  onComponentNoteUpdate: (field: keyof InspectionRoomType["componentNotes"], note: string) => void;
}

export const InspectionRoom = ({
  room,
  isExpanded,
  onToggle,
  inspectionData,
  onConditionUpdate,
  onActionUpdate,
  onComponentNoteUpdate,
}: InspectionRoomProps) => {
  const isRoomApproved = Object.values(inspectionData.conditions).every(
    condition => condition === "good" || condition === "acceptable"
  );

  const handleApproveRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const fields: (keyof InspectionRoomType["conditions"])[] = ["walls", "floor", "ceiling", "details"];
    fields.forEach(field => {
      onConditionUpdate(field, "good");
    });
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  return (
    <div className="border rounded-lg">
      <div className="w-full bg-card p-4 flex items-center justify-between">
        <button
          type="button"
          className="flex-1 text-left flex items-center gap-2"
          onClick={handleToggleClick}
        >
          <span className="font-medium">{room.name || room.roomType?.name || room.code}</span>
          {isRoomApproved && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            className="text-green-600 border-green-600 hover:bg-green-50"
            onClick={handleApproveRoom}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Godkänn rum
          </Button>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </div>

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
              note={inspectionData.componentNotes.walls}
              onNoteChange={(note) => onComponentNoteUpdate("walls", note)}
            />
            <ConditionSelect
              label="Golv"
              value={inspectionData.conditions.floor}
              onChange={(value) => onConditionUpdate("floor", value)}
              actions={inspectionData.actions.floor}
              onActionUpdate={(action) => onActionUpdate("floor", action)}
              type="floor"
              note={inspectionData.componentNotes.floor}
              onNoteChange={(note) => onComponentNoteUpdate("floor", note)}
            />
            <ConditionSelect
              label="Tak"
              value={inspectionData.conditions.ceiling}
              onChange={(value) => onConditionUpdate("ceiling", value)}
              actions={inspectionData.actions.ceiling}
              onActionUpdate={(action) => onActionUpdate("ceiling", action)}
              type="ceiling"
              note={inspectionData.componentNotes.ceiling}
              onNoteChange={(note) => onComponentNoteUpdate("ceiling", note)}
            />
            <ConditionSelect
              label="Detaljer"
              value={inspectionData.conditions.details}
              onChange={(value) => onConditionUpdate("details", value)}
              actions={inspectionData.actions.details}
              onActionUpdate={(action) => onActionUpdate("details", action)}
              type="details"
              note={inspectionData.componentNotes.details}
              onNoteChange={(note) => onComponentNoteUpdate("details", note)}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Foton</label>
            <Button type="button" variant="outline">
              <Camera className="mr-2 h-4 w-4" />
              Lägg till foto
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

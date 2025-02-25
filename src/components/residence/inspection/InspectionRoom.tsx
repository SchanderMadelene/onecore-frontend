import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";
import { RoomStatus } from "./room-header/RoomStatus";
import { RoomActions } from "./room-header/RoomActions";
import { InspectionAccordion } from "./InspectionAccordion";

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
  const handleApproveRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const fields: (keyof InspectionRoomType["conditions"])[] = [
      "wall1", "wall2", "wall3", "wall4", 
      "floor", "ceiling", "details"
    ];
    fields.forEach(field => {
      onConditionUpdate(field, "good");
    });
    inspectionData.isApproved = true;
    inspectionData.isHandled = true;
  };

  const handleMarkHandled = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    inspectionData.isHandled = true;
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  const wallDirections = {
    wall1: "Vägg (Norr)",
    wall2: "Vägg (Öst)",
    wall3: "Vägg (Söder)",
    wall4: "Vägg (Väst)"
  };

  const isWallsComplete = () => {
    return ["wall1", "wall2", "wall3", "wall4"].every(
      wall => inspectionData.conditions[wall as keyof InspectionRoomType["conditions"]] !== ""
    );
  };

  const isSingleComponentComplete = (component: keyof InspectionRoomType["conditions"]) => {
    return inspectionData.conditions[component] !== "";
  };

  // Kontrollera om alla komponenter har fyllts i
  const isAllComponentsHandled = Object.values(inspectionData.conditions).every(condition => condition !== "");

  // Uppdatera isHandled automatiskt när alla komponenter är ifyllda
  if (isAllComponentsHandled && !inspectionData.isHandled) {
    inspectionData.isHandled = true;
  }

  return (
    <div className={`border rounded-lg shadow-sm ${
      inspectionData.isApproved 
        ? 'bg-green-50 border-green-200' 
        : inspectionData.isHandled 
          ? 'bg-slate-50 border-slate-200'
          : 'bg-white'
    }`}>
      <div className={`w-full p-4 flex items-center justify-between border-b ${
        inspectionData.isApproved 
          ? 'bg-green-50/50 border-green-200' 
          : inspectionData.isHandled
            ? 'bg-slate-50/50 border-slate-200'
            : 'bg-card'
      }`}>
        <RoomStatus
          isApproved={inspectionData.isApproved}
          isHandled={inspectionData.isHandled}
          name={room.name || room.roomType?.name || room.code}
          onClick={handleToggleClick}
        />
        <RoomActions
          isApproved={inspectionData.isApproved}
          isHandled={inspectionData.isHandled}
          isExpanded={isExpanded}
          onApprove={handleApproveRoom}
          onToggle={handleToggleClick}
        />
      </div>

      {isExpanded && (
        <div className="p-4">
          <InspectionAccordion
            isWallsComplete={isWallsComplete}
            isSingleComponentComplete={isSingleComponentComplete}
            wallDirections={wallDirections}
            inspectionData={inspectionData}
            onConditionUpdate={onConditionUpdate}
            onActionUpdate={onActionUpdate}
            onComponentNoteUpdate={onComponentNoteUpdate}
          />
        </div>
      )}
    </div>
  );
};

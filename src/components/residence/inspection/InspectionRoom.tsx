
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";
import { RoomStatus } from "./room-header/RoomStatus";
import { RoomActions } from "./room-header/RoomActions";
import { InspectionAccordion } from "./InspectionAccordion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
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
      inspectionData.isHandled 
        ? 'bg-slate-50 border-slate-200'
        : 'bg-white'
    }`}>
      <div className={`w-full p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between border-b gap-2 ${
        inspectionData.isHandled
          ? 'bg-slate-50/50 border-slate-200'
          : 'bg-card'
      }`}>
        <RoomStatus
          isHandled={inspectionData.isHandled}
          name={room.name || room.roomType?.name || room.code}
          onClick={handleToggleClick}
        />
        <RoomActions
          isHandled={inspectionData.isHandled}
          isExpanded={isExpanded}
          onToggle={handleToggleClick}
          isMobile={isMobile}
        />
      </div>

      {isExpanded && (
        <div className="p-3 sm:p-4">
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


import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";
import { RoomStatus } from "./room-header/RoomStatus";
import { RoomActions } from "./room-header/RoomActions";
import { InspectionAccordion } from "./InspectionAccordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
    wall1: "Vägg",
  };

  const isWallsComplete = () => {
    return inspectionData.conditions.wall1 !== "";
  };

  const isSingleComponentComplete = (component: keyof InspectionRoomType["conditions"]) => {
    return inspectionData.conditions[component] !== "";
  };

  // Kontrollera om alla komponenter har fyllts i
  const isAllComponentsHandled = [
    inspectionData.conditions.wall1,
    inspectionData.conditions.floor,
    inspectionData.conditions.ceiling,
    inspectionData.conditions.details
  ].every(condition => condition !== "");

  // Uppdatera isHandled automatiskt när alla komponenter är ifyllda
  if (isAllComponentsHandled && !inspectionData.isHandled) {
    inspectionData.isHandled = true;
  }

  return (
    <div className={cn(
      "border rounded-lg shadow-sm overflow-hidden transition-all",
      inspectionData.isHandled 
        ? 'bg-slate-50 border-slate-200'
        : 'bg-white',
      isExpanded && 'ring-1 ring-primary/20 shadow-md'
    )}>
      <div className={cn(
        "w-full p-4 flex flex-col sm:flex-row sm:items-center justify-between border-b gap-2",
        inspectionData.isHandled
          ? 'bg-slate-50/80 border-slate-200'
          : 'bg-white'
      )}>
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

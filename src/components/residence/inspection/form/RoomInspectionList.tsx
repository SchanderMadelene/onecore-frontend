
import { InspectionRoom } from "../InspectionRoom";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "../types";

interface RoomInspectionListProps {
  rooms: Room[];
  expandedRoomIds: string[];
  inspectionData: Record<string, InspectionRoomType>;
  onToggleRoom: (roomId: string) => void;
  onConditionUpdate: (roomId: string, field: keyof InspectionRoomType["conditions"], value: string) => void;
  onActionUpdate: (roomId: string, field: keyof InspectionRoomType["actions"], action: string) => void;
  onComponentNoteUpdate: (roomId: string, field: keyof InspectionRoomType["componentNotes"], note: string) => void;
}

export function RoomInspectionList({
  rooms,
  expandedRoomIds,
  inspectionData,
  onToggleRoom,
  onConditionUpdate,
  onActionUpdate,
  onComponentNoteUpdate
}: RoomInspectionListProps) {
  return (
    <div className="space-y-4 w-full">
      {rooms.map(room => (
        <InspectionRoom
          key={room.id}
          room={room}
          isExpanded={expandedRoomIds.includes(room.id)}
          onToggle={() => onToggleRoom(room.id)}
          inspectionData={inspectionData[room.id]}
          onConditionUpdate={(field, value) => 
            onConditionUpdate(room.id, field, value)
          }
          onActionUpdate={(field, action) => 
            onActionUpdate(room.id, field, action)
          }
          onComponentNoteUpdate={(field, note) => 
            onComponentNoteUpdate(room.id, field, note)
          }
        />
      ))}
    </div>
  );
}

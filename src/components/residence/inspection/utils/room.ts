
import type { Room } from "@/types/api";
import type { InspectionRoom } from "../types";

export const initializeRoomData = (rooms: Room[]): Record<string, InspectionRoom> => {
  const roomData: Record<string, InspectionRoom> = {};
  rooms.forEach(room => {
    roomData[room.id] = {
      roomId: room.id,
      conditions: {
        wall1: "",
        wall2: "",
        wall3: "",
        wall4: "",
        floor: "",
        ceiling: "",
        details: ""
      },
      actions: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: []
      },
      componentNotes: {
        wall1: "",
        wall2: "",
        wall3: "",
        wall4: "",
        floor: "",
        ceiling: "",
        details: ""
      },
      photos: [],
      isApproved: false,
      isHandled: false
    };
  });
  return roomData;
};

export const getRoomName = (room: Room | InspectionRoom): string => {
  if ('name' in room) {
    // Det är ett Room-objekt
    return room.name || room.roomType?.name || room.code;
  } else {
    // Det är ett InspectionRoom-objekt
    return room.roomId;
  }
};

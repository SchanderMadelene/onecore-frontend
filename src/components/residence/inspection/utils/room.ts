
import type { Room } from "@/types/api";
import type { InspectionRoom } from "../types";

export const initializeRoomData = (rooms: Room[]): Record<string, InspectionRoom> => {
  const roomData: Record<string, InspectionRoom> = {};
  rooms.forEach(room => {
    roomData[room.id] = {
      roomId: room.id,
      roomCode: room.code,
      roomName: room.name,
      roomTypeName: room.roomType?.name,
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
  if ('roomCode' in room) {
    // Det är ett InspectionRoom-objekt
    const name = room.roomName || room.roomTypeName || '';
    const code = room.roomCode;
    return name ? `${name} ${code}` : code;
  } else {
    // Det är ett Room-objekt
    const name = room.name || room.roomType?.name || '';
    const code = room.code;
    return name ? `${name} ${code}` : code;
  }
};


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
  let name: string;
  let code: string;

  if ('name' in room) {
    // Det är ett Room-objekt
    name = room.name || room.roomType?.name || '';
    code = room.code;
  } else {
    // Det är ett InspectionRoom-objekt
    name = room.roomName || room.roomTypeName || '';
    code = room.roomCode;
  }

  if (name && code) {
    return `${name} ${code}`;
  } else if (name) {
    return name;
  } else {
    return code;
  }
};


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
  console.log('Room object received:', room);
  console.log('Room type check - has roomId:', 'roomId' in room);
  console.log('Room type check - has id:', 'id' in room);
  console.log('Room properties:', Object.keys(room));

  if ('id' in room) {
    // Det är ett Room-objekt
    const name = room.name || room.roomType?.name || '';
    const code = room.code;
    console.log('Room name components:', { name, code });
    return name ? `${name} ${code}` : code;
  } else {
    // Det är ett InspectionRoom-objekt
    const name = room.roomName || room.roomTypeName || '';
    const code = room.roomCode;
    console.log('InspectionRoom name components:', { name, code });
    return name ? `${name} ${code}` : code;
  }
};

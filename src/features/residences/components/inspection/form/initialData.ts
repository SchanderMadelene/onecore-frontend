
import type { InspectionRoom } from "../types";

export const initialRoomData: InspectionRoom = {
  roomId: "",
  conditions: {
    walls: "",
    floor: "",
    ceiling: "",
    appliances: "",
    kitchenDoors: ""
  },
  actions: {
    walls: [],
    floor: [],
    ceiling: [],
    appliances: [],
    kitchenDoors: []
  },
  componentNotes: {
    walls: "",
    floor: "",
    ceiling: "",
    appliances: "",
    kitchenDoors: ""
  },
  componentPhotos: {
    walls: [],
    floor: [],
    ceiling: [],
    appliances: [],
    kitchenDoors: []
  },
  costResponsibility: {
    walls: null,
    floor: null,
    ceiling: null,
    appliances: null,
    kitchenDoors: null
  },
  photos: [],
  isApproved: false,
  isHandled: false
};

export const initializeInspectionData = (rooms: { id: string }[]) => {
  const initialData: Record<string, InspectionRoom> = {};
  rooms.forEach(room => {
    initialData[room.id] = {
      ...initialRoomData,
      roomId: room.id,
    };
  });
  return initialData;
};

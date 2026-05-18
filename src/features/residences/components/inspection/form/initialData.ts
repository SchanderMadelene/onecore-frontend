
import type { InspectionRoom } from "../types";
import demoPhoto from "@/assets/inspection-demo-photo.png";

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
    walls: [demoPhoto, demoPhoto],
    floor: [demoPhoto],
    ceiling: [],
    appliances: [demoPhoto],
    kitchenDoors: []
  },
  costResponsibility: {
    walls: null,
    floor: null,
    ceiling: null,
    appliances: null,
    kitchenDoors: null
  },
  costs: {},
  customComponents: [],
  photos: [],
  isApproved: false,
  isHandled: false
};

const DEMO_PHOTOS = {
  walls: [demoPhoto, demoPhoto],
  floor: [demoPhoto],
  appliances: [demoPhoto],
};

export const initializeInspectionData = (rooms: { id: string }[]) => {
  const initialData: Record<string, InspectionRoom> = {};
  rooms.forEach((room) => {
    initialData[room.id] = {
      ...initialRoomData,
      roomId: room.id,
      componentPhotos: { ...initialRoomData.componentPhotos, ...DEMO_PHOTOS },
    };
  });
  return initialData;
};

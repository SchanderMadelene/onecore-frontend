
import type { InspectionRoom } from "../types";
import demoPhoto from "@/assets/inspection-demo-photo.png";

export const initialRoomData: InspectionRoom = {
  roomId: "",
  conditions: {
    walls: "",
    floor: "",
    ceiling: "",
    refrigerator: "",
    freezer: "",
    washingMachine: "",
    tumbleDryer: "",
    kitchenDoors: ""
  },
  actions: {
    walls: [],
    floor: [],
    ceiling: [],
    refrigerator: [],
    freezer: [],
    washingMachine: [],
    tumbleDryer: [],
    kitchenDoors: []
  },
  componentNotes: {
    walls: "",
    floor: "",
    ceiling: "",
    refrigerator: "",
    freezer: "",
    washingMachine: "",
    tumbleDryer: "",
    kitchenDoors: ""
  },
  componentPhotos: {
    walls: [demoPhoto, demoPhoto],
    floor: [demoPhoto],
    ceiling: [],
    refrigerator: [demoPhoto],
    freezer: [],
    washingMachine: [],
    tumbleDryer: [],
    kitchenDoors: []
  },
  costResponsibility: {
    walls: null,
    floor: null,
    ceiling: null,
    refrigerator: null,
    freezer: null,
    washingMachine: null,
    tumbleDryer: null,
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
  refrigerator: [demoPhoto],
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

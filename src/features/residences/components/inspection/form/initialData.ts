
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
    walls: [
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=70",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=70",
    ],
    floor: ["https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&q=70"],
    ceiling: [],
    appliances: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=70"],
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

// Demo-bilder för att visa hur sparade foton ser ut på en komponent
const DEMO_PHOTOS = {
  walls: [
    "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=70",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=70",
  ],
  floor: [
    "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&q=70",
  ],
  appliances: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=70",
  ],
};

export const initializeInspectionData = (rooms: { id: string }[]) => {
  const initialData: Record<string, InspectionRoom> = {};
  rooms.forEach((room) => {
    initialData[room.id] = {
      ...initialRoomData,
      roomId: room.id,
      // Seedar alla rum med demo-bilder så man ser hur sparade foton ser ut
      componentPhotos: { ...initialRoomData.componentPhotos, ...DEMO_PHOTOS },
    };
  });
  return initialData;
};

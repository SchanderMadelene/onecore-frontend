
import type { Room } from "@/types/api";

export interface InspectionRoom {
  roomId: string;
  roomCode: string;
  roomName: string | null;
  roomTypeName: string | null;
  conditions: {
    wall1: string;
    wall2: string;
    wall3: string;
    wall4: string;
    floor: string;
    ceiling: string;
    details: string;
  };
  actions: {
    wall1: string[];
    wall2: string[];
    wall3: string[];
    wall4: string[];
    floor: string[];
    ceiling: string[];
    details: string[];
  };
  componentNotes: {
    wall1: string;
    wall2: string;
    wall3: string;
    wall4: string;
    floor: string;
    ceiling: string;
    details: string;
  };
  photos: string[];
  isApproved: boolean;
  isHandled: boolean;
}

export interface Inspection {
  id: string;
  date: string;
  inspectedBy: string;
  rooms: Record<string, InspectionRoom>;
}

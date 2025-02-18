
export interface InspectionRoom {
  roomId: string;
  conditions: {
    walls: string;
    floor: string;
    ceiling: string;
    details: string;
  };
  actions: {
    walls: string[];
    floor: string[];
    ceiling: string[];
    details: string[];
  };
  notes: string;
  photos: string[];
}

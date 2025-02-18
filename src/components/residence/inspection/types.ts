
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
  componentNotes: {
    walls: string;
    floor: string;
    ceiling: string;
    details: string;
  };
  photos: string[];
}

export interface Inspection {
  id: string;
  date: string;
  inspectedBy: string;
  rooms: Record<string, InspectionRoom>;
}

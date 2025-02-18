
import { useState } from "react";
import type { InspectionItem } from "@/types/api";

const getInitialInspectionItems = (): Record<string, InspectionItem[]> => ({
  floor: [
    { id: "f1", type: "floor" as const, name: "Parkettgolv", condition: "good", notes: "" },
    { id: "f2", type: "floor" as const, name: "Trösklar", condition: "good", notes: "" }
  ],
  wall: [
    { id: "w1", type: "wall" as const, name: "Väggar", condition: "good", notes: "" },
    { id: "w2", type: "wall" as const, name: "Tapeter", condition: "good", notes: "" }
  ],
  ceiling: [
    { id: "c1", type: "ceiling" as const, name: "Innertak", condition: "good", notes: "" }
  ],
  appliance: [
    { id: "a1", type: "appliance" as const, name: "Kylskåp", condition: "good", notes: "" },
    { id: "a2", type: "appliance" as const, name: "Spis", condition: "good", notes: "" }
  ]
});

export const useRoomInspection = () => {
  const [inspectionItems, setInspectionItems] = useState<Record<string, Record<string, InspectionItem[]>>>({});

  const initializeRoom = (roomId: string) => {
    setInspectionItems(prev => {
      if (!prev[roomId]) {
        return {
          ...prev,
          [roomId]: getInitialInspectionItems()
        };
      }
      return prev;
    });
  };

  return {
    inspectionItems,
    initializeRoom
  };
};

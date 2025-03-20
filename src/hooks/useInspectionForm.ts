
import { useState } from "react";
import type { InspectionRoom } from "@/components/residence/inspection/types";
import type { Room } from "@/types/api";
import { initializeInspectionData } from "@/components/residence/inspection/form/initialData";

export function useInspectionForm(rooms: Room[]) {
  const [inspectorName, setInspectorName] = useState("");
  const [step, setStep] = useState<"info" | "inspection">("info");
  const [expandedRoomIds, setExpandedRoomIds] = useState<string[]>([]);
  const [inspectionData, setInspectionData] = useState<Record<string, InspectionRoom>>(() => 
    initializeInspectionData(rooms)
  );

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("inspection");
    if (rooms.length > 0) {
      setExpandedRoomIds([rooms[0].id]);
    }
  };

  const handleCancel = () => {
    setStep("info");
    setInspectorName("");
    setExpandedRoomIds([]);
    return;
  };

  const handleToggleRoom = (roomId: string) => {
    setExpandedRoomIds(prev => {
      if (prev.includes(roomId)) {
        return prev.filter(id => id !== roomId);
      }
      return [...prev, roomId];
    });
  };

  const handleConditionUpdate = (
    roomId: string,
    field: keyof InspectionRoom["conditions"],
    value: string
  ) => {
    setInspectionData(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        conditions: {
          ...prev[roomId].conditions,
          [field]: value
        }
      }
    }));
  };

  const handleActionUpdate = (
    roomId: string,
    field: keyof InspectionRoom["actions"],
    action: string
  ) => {
    setInspectionData(prev => {
      const currentActions = prev[roomId].actions[field];
      const newActions = currentActions.includes(action)
        ? currentActions.filter(a => a !== action)
        : [...currentActions, action];

      return {
        ...prev,
        [roomId]: {
          ...prev[roomId],
          actions: {
            ...prev[roomId].actions,
            [field]: newActions
          }
        }
      };
    });
  };

  const handleComponentNoteUpdate = (
    roomId: string,
    field: keyof InspectionRoom["componentNotes"],
    note: string
  ) => {
    setInspectionData(prev => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        componentNotes: {
          ...prev[roomId].componentNotes,
          [field]: note
        }
      }
    }));
  };

  return {
    inspectorName,
    setInspectorName,
    step,
    setStep,
    expandedRoomIds,
    inspectionData,
    handleNext,
    handleCancel,
    handleToggleRoom,
    handleConditionUpdate,
    handleActionUpdate,
    handleComponentNoteUpdate
  };
}

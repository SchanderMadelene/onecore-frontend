
import { useState } from "react";
import { InspectionFormDialog } from "./InspectionFormDialog";
import { RoomCard } from "./room-view/RoomCard";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";

interface InspectionStartProps {
  rooms: Room[];
  onSave: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
  isExpanded?: boolean;
  onToggle?: () => void;
  currentInspection?: {
    inspectorName: string;
    rooms: Record<string, InspectionRoomType>;
  } | null;
}

export const InspectionStart = ({ 
  rooms, 
  onSave, 
  isExpanded, 
  onToggle,
  currentInspection 
}: InspectionStartProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (onToggle) {
    const room = rooms[0];
    
    return (
      <RoomCard
        room={room}
        isExpanded={!!isExpanded}
        onToggle={onToggle}
        currentInspection={currentInspection}
        onStartInspection={() => setIsDialogOpen(true)}
        onSave={onSave}
      />
    );
  }

  // This is the initial inspection state without any room selected
  // Import and use the InspectionEmpty component
  const { InspectionEmpty } = require('./InspectionEmpty');
  return (
    <InspectionEmpty 
      rooms={rooms} 
      onSave={onSave} 
    />
  );
}

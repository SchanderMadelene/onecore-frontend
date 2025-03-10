
import type { Room } from "@/types/api";
import type { InspectionRoom } from "@/components/residence/inspection/types";

interface InspectionProgress {
  rooms: Array<{
    room: Room;
    status: "not-started" | "in-progress" | "approved" | "handled";
  }>;
  progress: number;
  stats: {
    total: number;
    completed: number;
    approved: number;
    handled: number;
    inProgress: number;
  };
}

export const useInspectionProgress = (
  rooms: Room[],
  inspectionRooms: Record<string, InspectionRoom> | null
): InspectionProgress | null => {
  if (!inspectionRooms) return null;

  const roomProgress = rooms.map(room => {
    const inspection = inspectionRooms[room.id];
    if (!inspection) return { room, status: "not-started" as const };

    const conditions = Object.values(inspection.conditions);
    const isComplete = conditions.every(c => c !== "");

    if (inspection.isApproved) return { room, status: "approved" as const };
    if (inspection.isHandled) return { room, status: "handled" as const };
    if (isComplete) return { room, status: "handled" as const };
    if (conditions.some(c => c !== "")) return { room, status: "in-progress" as const };
    return { room, status: "not-started" as const };
  });

  const total = roomProgress.length;
  const completed = roomProgress.filter(r => 
    r.status === "approved" || r.status === "handled"
  ).length;
  const approved = roomProgress.filter(r => r.status === "approved").length;
  const handled = roomProgress.filter(r => r.status === "handled").length;
  const inProgress = roomProgress.filter(r => r.status === "in-progress").length;

  return {
    rooms: roomProgress,
    progress: (completed / total) * 100,
    stats: { total, completed, approved, handled, inProgress }
  };
};

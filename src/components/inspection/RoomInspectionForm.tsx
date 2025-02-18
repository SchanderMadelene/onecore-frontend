
import { useState } from "react";
import type { Room } from "@/types/api";
import { RoomCard } from "./room-card";
import { InspectionDialog } from "./inspection-dialog";

interface RoomInspectionFormProps {
  rooms?: Room[];
}

export const RoomInspectionForm = ({ rooms }: RoomInspectionFormProps) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState("");
  const [approvedRooms, setApprovedRooms] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Rum att besiktiga</h3>
      <div className="grid gap-4">
        {rooms?.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isApproved={approvedRooms.has(room.id)}
            onApprove={() => {
              const newApprovedRooms = new Set(approvedRooms);
              newApprovedRooms.add(room.id);
              setApprovedRooms(newApprovedRooms);
            }}
            onSelectItem={(itemId) => {
              setSelectedItemId(itemId);
              setSelectedIssues([]);
              setCustomNote("");
            }}
          />
        ))}
      </div>

      <InspectionDialog
        open={selectedItemId !== null}
        onOpenChange={() => setSelectedItemId(null)}
        selectedItemId={selectedItemId}
        selectedIssues={selectedIssues}
        onIssuesChange={setSelectedIssues}
        customNote={customNote}
        onCustomNoteChange={setCustomNote}
      />
    </div>
  );
};

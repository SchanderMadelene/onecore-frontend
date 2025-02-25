
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Room } from "@/types/api";
import type { InspectionRoom } from "./types";

interface InspectionFormDialogProps {
  rooms: Room[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inspectorName: string, rooms: Record<string, InspectionRoom>) => void;
}

export const InspectionFormDialog = ({ rooms, isOpen, onClose, onSubmit }: InspectionFormDialogProps) => {
  const [inspectorName, setInspectorName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspectorName.trim()) return;

    const initialRooms: Record<string, InspectionRoom> = {};
    rooms.forEach(room => {
      initialRooms[room.id] = {
        roomId: room.id,
        roomCode: room.code,
        roomName: room.name,
        roomTypeName: room.roomType?.name,
        conditions: {
          wall1: "",
          wall2: "",
          wall3: "",
          wall4: "",
          floor: "",
          ceiling: "",
          details: ""
        },
        actions: {
          wall1: [],
          wall2: [],
          wall3: [],
          wall4: [],
          floor: [],
          ceiling: [],
          details: []
        },
        componentNotes: {
          wall1: "",
          wall2: "",
          wall3: "",
          wall4: "",
          floor: "",
          ceiling: "",
          details: ""
        },
        photos: [],
        isApproved: false,
        isHandled: false
      };
    });

    onSubmit(inspectorName, initialRooms);
    setInspectorName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Starta ny besiktning</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="inspectorName" className="text-sm font-medium">
              Besiktningsman
            </label>
            <Input
              id="inspectorName"
              value={inspectorName}
              onChange={(e) => setInspectorName(e.target.value)}
              placeholder="Ange namn"
              className="mt-1"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={!inspectorName.trim()}>
              Starta besiktning
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

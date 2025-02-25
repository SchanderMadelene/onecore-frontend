import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InspectionRoom } from "./InspectionRoom";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";
import { CheckCircle } from "lucide-react";

interface InspectionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
  rooms: Room[];
}

const initialRoomData: InspectionRoomType = {
  roomId: "",
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

export function InspectionFormDialog({ isOpen, onClose, onSubmit, rooms }: InspectionFormDialogProps) {
  const [inspectorName, setInspectorName] = useState("");
  const [step, setStep] = useState<"info" | "inspection">("info");
  const [expandedRoomIds, setExpandedRoomIds] = useState<string[]>([]);
  const [inspectionData, setInspectionData] = useState<Record<string, InspectionRoomType>>(() => {
    const initialData: Record<string, InspectionRoomType> = {};
    rooms.forEach(room => {
      initialData[room.id] = {
        roomId: room.id,
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
    return initialData;
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("inspection");
    // Expandera första rummet automatiskt när man börjar besiktningen
    if (rooms.length > 0) {
      setExpandedRoomIds([rooms[0].id]);
    }
  };

  const handleConditionUpdate = (
    roomId: string,
    field: keyof InspectionRoomType["conditions"],
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
    field: keyof InspectionRoomType["actions"],
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
    field: keyof InspectionRoomType["componentNotes"],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inspectorName, inspectionData);
    onClose();
    setStep("info");
    setInspectorName("");
    setExpandedRoomIds([]);
  };

  const handleCancel = () => {
    onClose();
    setStep("info");
    setInspectorName("");
    setExpandedRoomIds([]);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  const handleToggleRoom = (roomId: string) => {
    setExpandedRoomIds(prev => {
      if (prev.includes(roomId)) {
        return prev.filter(id => id !== roomId);
      }
      return [...prev, roomId];
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>
            {step === "info" ? "Starta ny besiktning" : "Genomför besiktning"}
          </DialogTitle>
          <DialogDescription>
            {step === "info" 
              ? "Fyll i information om besiktningen" 
              : "Gå igenom och bedöm skicket på alla rum"
            }
          </DialogDescription>
        </DialogHeader>

        {step === "info" ? (
          <form onSubmit={handleNext}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="inspectorName">Besiktningsman</Label>
                <Input
                  id="inspectorName"
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                  placeholder="Ange ditt namn"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Lägenhet</Label>
                <p className="text-sm text-muted-foreground">
                  Odenplan 5, lägenhet 1001
                </p>
              </div>
              <div className="space-y-2">
                <Label>Datum</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString("sv-SE")}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={handleCancel}>
                Avbryt
              </Button>
              <Button type="submit" disabled={!inspectorName.trim()}>
                Nästa
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-4">
                {rooms.map((room) => (
                  <InspectionRoom
                    key={room.id}
                    room={room}
                    isExpanded={expandedRoomIds.includes(room.id)}
                    onToggle={() => handleToggleRoom(room.id)}
                    inspectionData={inspectionData[room.id]}
                    onConditionUpdate={(field, value) => handleConditionUpdate(room.id, field, value)}
                    onActionUpdate={(field, action) => handleActionUpdate(room.id, field, action)}
                    onComponentNoteUpdate={(field, note) => handleComponentNoteUpdate(room.id, field, note)}
                  />
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setStep("info")}>
                Tillbaka
              </Button>
              <Button type="submit">Spara besiktning</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

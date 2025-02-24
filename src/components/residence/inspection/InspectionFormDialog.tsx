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
import { CheckCircle, AlertCircle, Circle, CircleDot } from "lucide-react";

interface InspectionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
  rooms: Room[];
}

export function InspectionFormDialog({ isOpen, onClose, onSubmit, rooms }: InspectionFormDialogProps) {
  const [inspectorName, setInspectorName] = useState("");
  const [step, setStep] = useState<"info" | "inspection">("info");
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
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
        photos: []
      };
    });
    return initialData;
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("inspection");
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
        },
        actions: {
          ...prev[roomId].actions,
          [field]: []
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
    setExpandedRoomId(null);
  };

  const handleCancel = () => {
    onClose();
    setStep("info");
    setInspectorName("");
    setExpandedRoomId(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  const getRoomStatus = (roomId: string) => {
    const inspection = inspectionData[roomId];
    const conditions = Object.values(inspection.conditions);
    const isComplete = conditions.every(c => c !== "");
    const isApproved = conditions.every(c => c === "good" || c === "acceptable");
    const hasStarted = conditions.some(c => c !== "");

    if (isApproved) return { 
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      text: "Godkänt",
      color: "text-green-500"
    };
    if (isComplete) return {
      icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
      text: "Behöver åtgärd",
      color: "text-amber-500"
    };
    if (hasStarted) return {
      icon: <CircleDot className="h-4 w-4 text-blue-500" />,
      text: "Påbörjad",
      color: "text-blue-500"
    };
    return {
      icon: <Circle className="h-4 w-4 text-gray-300" />,
      text: "Ej påbörjad",
      color: "text-gray-400"
    };
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
              : "Gå igenom och dokumentera skicket på alla rum"
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
                <p className="text-sm text-muted-foreground">Odenplan 5, lägenhet 1001</p>
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
              {rooms.map(room => {
                const status = getRoomStatus(room.id);
                return (
                  <div key={room.id} className="space-y-2">
                    <div 
                      className={`flex items-center justify-between p-2 rounded-lg border ${
                        expandedRoomId === room.id ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {status.icon}
                        <span className={`text-sm font-medium ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                      <Button 
                        type="button"
                        variant="ghost"
                        onClick={() => setExpandedRoomId(expandedRoomId === room.id ? null : room.id)}
                      >
                        {room.name || room.roomType?.name || room.code}
                      </Button>
                    </div>
                    {expandedRoomId === room.id && (
                      <InspectionRoom
                        room={room}
                        isExpanded={true}
                        onToggle={() => {}}
                        inspectionData={inspectionData[room.id]}
                        onConditionUpdate={(field, value) => handleConditionUpdate(room.id, field, value)}
                        onActionUpdate={(field, action) => handleActionUpdate(room.id, field, action)}
                        onComponentNoteUpdate={(field, note) => handleComponentNoteUpdate(room.id, field, note)}
                      />
                    )}
                  </div>
                );
              })}
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

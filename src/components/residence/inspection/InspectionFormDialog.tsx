
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
import { CheckCircle, AlertCircle, Circle, ChevronLeft, ChevronRight } from "lucide-react";

interface InspectionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
  rooms: Room[];
}

export function InspectionFormDialog({ isOpen, onClose, onSubmit, rooms }: InspectionFormDialogProps) {
  const [inspectorName, setInspectorName] = useState("");
  const [step, setStep] = useState<"info" | "inspection">("info");
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
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
    setCurrentRoomIndex(0);
  };

  const handleCancel = () => {
    onClose();
    setStep("info");
    setInspectorName("");
    setCurrentRoomIndex(0);
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

    if (isComplete && isApproved) return { 
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
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      text: "Påbörjad",
      color: "text-green-500"
    };
    return {
      icon: <Circle className="h-4 w-4 text-gray-300" />,
      text: "Ej påbörjad",
      color: "text-gray-400"
    };
  };

  const currentRoom = rooms[currentRoomIndex];
  const canGoNext = currentRoomIndex < rooms.length - 1;
  const canGoPrevious = currentRoomIndex > 0;

  const goToNextRoom = () => {
    if (canGoNext) {
      setCurrentRoomIndex(prev => prev + 1);
    }
  };

  const goToPreviousRoom = () => {
    if (canGoPrevious) {
      setCurrentRoomIndex(prev => prev - 1);
    }
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
              {/* Rum översikt */}
              <div className="flex items-center gap-2 mb-6">
                {rooms.map((room, index) => {
                  const status = getRoomStatus(room.id);
                  return (
                    <Button
                      key={room.id}
                      type="button"
                      variant={currentRoomIndex === index ? "default" : "outline"}
                      onClick={() => setCurrentRoomIndex(index)}
                      className="flex items-center gap-2"
                    >
                      {status.icon}
                      <span className="text-sm">{index + 1}</span>
                    </Button>
                  );
                })}
              </div>

              {/* Nuvarande rum */}
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {currentRoom.name || currentRoom.roomType?.name || currentRoom.code}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousRoom}
                      disabled={!canGoPrevious}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Föregående
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={goToNextRoom}
                      disabled={!canGoNext}
                    >
                      Nästa
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <InspectionRoom
                  room={currentRoom}
                  isExpanded={true}
                  onToggle={() => {}}
                  inspectionData={inspectionData[currentRoom.id]}
                  onConditionUpdate={(field, value) => handleConditionUpdate(currentRoom.id, field, value)}
                  onActionUpdate={(field, action) => handleActionUpdate(currentRoom.id, field, action)}
                  onComponentNoteUpdate={(field, note) => handleComponentNoteUpdate(currentRoom.id, field, note)}
                />
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

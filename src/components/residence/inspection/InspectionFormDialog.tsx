
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
import { InspectionRoom } from "./InspectionRoom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";
import { InspectionInfoStep } from "./form/InspectionInfoStep";
import { BasicInformation } from "./form/BasicInformation";

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
        ...initialRoomData,
        roomId: room.id,
      };
    });
    return initialData;
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("inspection");
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
    handleCancel();
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
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[95vh] overflow-y-auto p-4 sm:p-6">
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
          <InspectionInfoStep
            inspectorName={inspectorName}
            onInspectorNameChange={setInspectorName}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="w-full justify-start bg-background border-b rounded-none px-0 overflow-x-auto flex-nowrap">
                  <TabsTrigger value="basic" className="text-sm sm:text-base whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    Grundläggande info
                  </TabsTrigger>
                  <TabsTrigger value="protocol" className="text-sm sm:text-base whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    Protokoll
                  </TabsTrigger>
                  <TabsTrigger value="floorplan" className="text-sm sm:text-base whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    Planritning
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="mt-6">
                  <BasicInformation
                    inspectorName={inspectorName}
                    roomCount={rooms.length}
                  />
                </TabsContent>

                <TabsContent value="protocol" className="mt-6">
                  <div className="space-y-4">
                    {rooms.map(room => (
                      <InspectionRoom
                        key={room.id}
                        room={room}
                        isExpanded={expandedRoomIds.includes(room.id)}
                        onToggle={() => handleToggleRoom(room.id)}
                        inspectionData={inspectionData[room.id]}
                        onConditionUpdate={(field, value) => 
                          handleConditionUpdate(room.id, field, value)
                        }
                        onActionUpdate={(field, action) => 
                          handleActionUpdate(room.id, field, action)
                        }
                        onComponentNoteUpdate={(field, note) => 
                          handleComponentNoteUpdate(room.id, field, note)
                        }
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="floorplan" className="mt-6">
                  <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Planritning är inte tillgänglig</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
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

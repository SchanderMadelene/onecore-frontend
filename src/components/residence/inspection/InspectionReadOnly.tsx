
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import type { Inspection } from "./types";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { getRoomName } from "./utils/room";

interface InspectionReadOnlyProps {
  inspection: Inspection | null;
  onClose: () => void;
  isOpen: boolean;
}

export function InspectionReadOnly({ inspection, onClose, isOpen }: InspectionReadOnlyProps) {
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  if (!inspection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Besiktningsprotokoll</DialogTitle>
          <div className="text-sm text-muted-foreground mt-2">
            <p>Datum: {format(new Date(inspection.date), "yyyy-MM-dd HH:mm")}</p>
            <p>Besiktigad av: {inspection.inspectedBy}</p>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {Object.entries(inspection.rooms).map(([roomId, inspectionRoom]) => (
            <div key={roomId} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{getRoomName(inspectionRoom)}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedRoomId(expandedRoomId === roomId ? null : roomId)}
                >
                  {expandedRoomId === roomId ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {expandedRoomId === roomId && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(inspectionRoom.conditions).map(([component, condition]) => (
                      <div key={component} className="space-y-2">
                        <h4 className="font-medium capitalize">{component}</h4>
                        <p className="text-sm">Skick: {condition || "Ej angivet"}</p>
                        <div className="text-sm">
                          <p className="font-medium">Åtgärder:</p>
                          {inspectionRoom.actions[component as keyof typeof inspectionRoom.actions].length > 0 ? (
                            <ul className="list-disc list-inside">
                              {inspectionRoom.actions[component as keyof typeof inspectionRoom.actions].map((action, index) => (
                                <li key={index}>{action}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground">Inga åtgärder registrerade</p>
                          )}
                        </div>
                        {inspectionRoom.componentNotes[component as keyof typeof inspectionRoom.componentNotes] && (
                          <div className="text-sm">
                            <p className="font-medium">Anteckningar:</p>
                            <p>{inspectionRoom.componentNotes[component as keyof typeof inspectionRoom.componentNotes]}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

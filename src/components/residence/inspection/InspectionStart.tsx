import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Check } from "lucide-react";
import { InspectionFormDialog } from "./InspectionFormDialog";
import { RoomInspectionContent } from "./room-content/RoomInspectionContent";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";
import { getRoomName } from "./utils/room";

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
    const inspectionData = currentInspection?.rooms[room.id] || {
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

    return (
      <Card>
        <CardHeader className="cursor-pointer" onClick={onToggle}>
          <CardTitle className="flex items-center gap-2">
            {inspectionData.isApproved && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <span>{getRoomName(room)}</span>
          </CardTitle>
        </CardHeader>
        {isExpanded && currentInspection && (
          <CardContent>
            <RoomInspectionContent
              room={room}
              inspectionData={inspectionData}
              currentInspection={currentInspection}
              onSave={onSave}
            />
          </CardContent>
        )}
        {isExpanded && !currentInspection && (
          <CardContent>
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-4">Ingen aktiv besiktning</h3>
              <p className="text-muted-foreground mb-6">
                Starta en ny besiktning för att dokumentera lägenhetens skick
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Starta ny besiktning
              </Button>
            </div>
          </CardContent>
        )}

        <InspectionFormDialog
          rooms={rooms}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={onSave}
        />
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Besiktning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-4">Ingen aktiv besiktning</h3>
            <p className="text-muted-foreground mb-6">
              Starta en ny besiktning för att dokumentera lägenhetens skick
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Starta ny besiktning
            </Button>
          </div>
        </CardContent>
      </Card>

      <InspectionFormDialog
        rooms={rooms}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onSave}
      />
    </>
  );
};

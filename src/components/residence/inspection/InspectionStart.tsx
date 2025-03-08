
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Check } from "lucide-react";
import { InspectionFormDialog } from "./InspectionFormDialog";
import { InspectionRoom } from "./InspectionRoom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    const inspectionData = currentInspection?.rooms[room.id] || {
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

    return (
      <Card>
        <CardHeader className="cursor-pointer" onClick={onToggle}>
          <CardTitle className="flex items-center gap-2">
            {inspectionData.isApproved && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <span>{room.name || room.roomType?.name || room.code}</span>
          </CardTitle>
        </CardHeader>
        {isExpanded && currentInspection && (
          <CardContent>
            <Tabs defaultValue="inspection" className="w-full">
              <TabsList className="w-full justify-start bg-background border-b mb-4">
                <TabsTrigger value="inspection" className="text-base">Besiktning</TabsTrigger>
                <TabsTrigger value="photos" className="text-base">Foton</TabsTrigger>
                <TabsTrigger value="notes" className="text-base">Anteckningar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="inspection" className="mt-4">
                <InspectionRoom
                  room={room}
                  isExpanded={true}
                  onToggle={() => {}}
                  inspectionData={inspectionData}
                  onConditionUpdate={(component, value) => {
                    const updatedRooms = {
                      ...currentInspection.rooms,
                      [room.id]: {
                        ...currentInspection.rooms[room.id],
                        conditions: {
                          ...currentInspection.rooms[room.id].conditions,
                          [component]: value
                        }
                      }
                    };
                    onSave(currentInspection.inspectorName, updatedRooms);
                  }}
                  onActionUpdate={(component, action) => {
                    const updatedRooms = {
                      ...currentInspection.rooms,
                      [room.id]: {
                        ...currentInspection.rooms[room.id],
                        actions: {
                          ...currentInspection.rooms[room.id].actions,
                          [component]: action
                        }
                      }
                    };
                    onSave(currentInspection.inspectorName, updatedRooms);
                  }}
                  onComponentNoteUpdate={(component, note) => {
                    const updatedRooms = {
                      ...currentInspection.rooms,
                      [room.id]: {
                        ...currentInspection.rooms[room.id],
                        componentNotes: {
                          ...currentInspection.rooms[room.id].componentNotes,
                          [component]: note
                        }
                      }
                    };
                    onSave(currentInspection.inspectorName, updatedRooms);
                  }}
                />
              </TabsContent>

              <TabsContent value="photos" className="mt-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Inga foton har laddats upp ännu</p>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Inga anteckningar har sparats ännu</p>
                </div>
              </TabsContent>
            </Tabs>
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
}


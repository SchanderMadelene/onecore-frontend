
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InspectionRoom } from "../InspectionRoom";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "../types";

interface RoomViewProps {
  room: Room;
  inspectionData: InspectionRoomType;
  inspectorName: string;
  onSave: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
  currentInspection: {
    inspectorName: string;
    rooms: Record<string, InspectionRoomType>;
  };
}

export const RoomView = ({ 
  room, 
  inspectionData, 
  currentInspection,
  onSave 
}: RoomViewProps) => {
  return (
    <Tabs defaultValue="inspection" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="inspection">Besiktning</TabsTrigger>
        <TabsTrigger value="photos">Foton</TabsTrigger>
        <TabsTrigger value="notes">Anteckningar</TabsTrigger>
      </TabsList>
      
      <TabsContent value="inspection">
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

      <TabsContent value="photos">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Inga foton har laddats upp ännu</p>
        </div>
      </TabsContent>

      <TabsContent value="notes">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Inga anteckningar har sparats ännu</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

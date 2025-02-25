
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InspectionRoom } from "../InspectionRoom";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "../types";

interface RoomInspectionContentProps {
  room: Room;
  inspectionData: InspectionRoomType;
  currentInspection: {
    inspectorName: string;
    rooms: Record<string, InspectionRoomType>;
  };
  onSave: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
}

export const RoomInspectionContent = ({
  room,
  inspectionData,
  currentInspection,
  onSave,
}: RoomInspectionContentProps) => {
  return (
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
  );
};

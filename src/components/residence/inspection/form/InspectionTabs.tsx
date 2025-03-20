
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInformation } from "./BasicInformation";
import { RoomInspectionList } from "./RoomInspectionList";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "../types";

interface InspectionTabsProps {
  inspectorName: string;
  apartmentInfo?: {
    address: string;
    hasMainKey: boolean;
  };
  rooms: Room[];
  expandedRoomIds: string[];
  inspectionData: Record<string, InspectionRoomType>;
  onToggleRoom: (roomId: string) => void;
  onConditionUpdate: (roomId: string, field: keyof InspectionRoomType["conditions"], value: string) => void;
  onActionUpdate: (roomId: string, field: keyof InspectionRoomType["actions"], action: string) => void;
  onComponentNoteUpdate: (roomId: string, field: keyof InspectionRoomType["componentNotes"], note: string) => void;
}

export function InspectionTabs({
  inspectorName,
  apartmentInfo,
  rooms,
  expandedRoomIds,
  inspectionData,
  onToggleRoom,
  onConditionUpdate,
  onActionUpdate,
  onComponentNoteUpdate
}: InspectionTabsProps) {
  return (
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
          apartmentInfo={apartmentInfo}
        />
      </TabsContent>

      <TabsContent value="protocol" className="mt-6">
        <RoomInspectionList
          rooms={rooms}
          expandedRoomIds={expandedRoomIds}
          inspectionData={inspectionData}
          onToggleRoom={onToggleRoom}
          onConditionUpdate={onConditionUpdate}
          onActionUpdate={onActionUpdate}
          onComponentNoteUpdate={onComponentNoteUpdate}
        />
      </TabsContent>

      <TabsContent value="floorplan" className="mt-6">
        <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">Planritning är inte tillgänglig</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

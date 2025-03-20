import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInformation } from "./BasicInformation";
import { RoomInspectionList } from "./RoomInspectionList";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "../types";
import { mockTenant } from "@/data/tenants";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

// List of available inspectors
const inspectors = [
  "Madelene Schander", // Current logged in user
  "Johan Andersson",
  "Maria Karlsson",
  "Erik Lindberg",
];

interface InspectionTabsProps {
  inspectorName: string;
  setInspectorName: (value: string) => void;
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
  tenant?: typeof mockTenant;
}

export function InspectionTabs({
  inspectorName,
  setInspectorName,
  apartmentInfo,
  rooms,
  expandedRoomIds,
  inspectionData,
  onToggleRoom,
  onConditionUpdate,
  onActionUpdate,
  onComponentNoteUpdate,
  tenant = mockTenant // Default to mockTenant
}: InspectionTabsProps) {
  const isMobile = useIsMobile();
  
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="w-full justify-start mb-4">
        <TabsTrigger value="basic" className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
          Grundläggande info
        </TabsTrigger>
        <TabsTrigger value="protocol" className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
          Protokoll
        </TabsTrigger>
        <TabsTrigger value="floorplan" className={`${isMobile ? 'text-xs' : 'text-sm'}`}>
          Planritning
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="mt-4 space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="inspectorName">Besiktningsman</Label>
            <Select 
              value={inspectorName || inspectors[0]} 
              onValueChange={setInspectorName}
              defaultValue={inspectors[0]}
            >
              <SelectTrigger id="inspectorName" className="w-full">
                <SelectValue placeholder="Välj besiktningsman" />
              </SelectTrigger>
              <SelectContent>
                {inspectors.map((inspector) => (
                  <SelectItem key={inspector} value={inspector}>
                    {inspector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <BasicInformation
          inspectorName={inspectorName || inspectors[0]}
          roomCount={rooms.length}
          apartmentInfo={apartmentInfo}
          tenant={tenant}
        />
      </TabsContent>

      <TabsContent value="protocol" className="mt-4">
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

      <TabsContent value="floorplan" className="mt-4">
        <div className="flex items-center justify-center h-[200px] sm:h-[400px] border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground text-sm">Planritning är inte tillgänglig</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}


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
  // Format current date with time
  const formatDateWithTime = () => {
    const now = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleString('sv-SE', dateOptions);
  };

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

      <TabsContent value="basic" className="mt-6 space-y-6">
        <div className="space-y-4">
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
          <div className="space-y-2">
            <Label>Datum</Label>
            <p className="text-sm text-muted-foreground">
              {formatDateWithTime()}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Huvudnyckel finns</Label>
            <p className="text-sm text-muted-foreground">
              {apartmentInfo?.hasMainKey ? "Ja" : "Nej"}
            </p>
          </div>
        </div>
        
        <BasicInformation
          inspectorName={inspectorName || inspectors[0]}
          roomCount={rooms.length}
          apartmentInfo={apartmentInfo}
          tenant={tenant}
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

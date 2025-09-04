
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInformation } from "./BasicInformation";
import { RoomInspectionList } from "./RoomInspectionList";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "../types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { ClipboardList, Home, MapPin } from "lucide-react";

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
}: InspectionTabsProps) {
  const isMobile = useIsMobile();
  
  return (
    <Tabs defaultValue="basic" className="space-y-6">
      <TabsList className="bg-slate-100/70 p-1 rounded-lg overflow-x-auto">
        <TabsTrigger value="basic" className="flex items-center gap-1.5">
          <ClipboardList className="h-4 w-4" />
          Grundläggande info
        </TabsTrigger>
        <TabsTrigger value="protocol" className="flex items-center gap-1.5">
          <Home className="h-4 w-4" />
          Protokoll
        </TabsTrigger>
        <TabsTrigger value="floorplan" className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          Planritning
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="mt-2">
        <div className="space-y-4">
          <div className="space-y-3 bg-white p-4 rounded-lg border border-slate-200">
            <div className="space-y-2">
              <Label htmlFor="inspectorName" className="font-medium">Besiktningsman</Label>
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
          />
        </div>
      </TabsContent>

      <TabsContent value="protocol" className="mt-2">
        <div className="bg-slate-50/50 py-1 px-0 rounded-lg">
          <RoomInspectionList
            rooms={rooms}
            expandedRoomIds={expandedRoomIds}
            inspectionData={inspectionData}
            onToggleRoom={onToggleRoom}
            onConditionUpdate={onConditionUpdate}
            onActionUpdate={onActionUpdate}
            onComponentNoteUpdate={onComponentNoteUpdate}
          />
        </div>
      </TabsContent>

      <TabsContent value="floorplan" className="mt-2">
        <div className="flex items-center justify-center h-[200px] sm:h-[400px] border-2 border-dashed rounded-lg bg-white">
          <p className="text-slate-500 text-sm">Planritning är inte tillgänglig</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

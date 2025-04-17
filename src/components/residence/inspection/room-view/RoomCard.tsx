
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { RoomView } from "./RoomView";
import { EmptyInspectionState } from "./EmptyInspectionState";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface RoomCardProps {
  room: Room;
  isExpanded: boolean;
  onToggle: () => void;
  currentInspection?: {
    inspectorName: string;
    rooms: Record<string, InspectionRoomType>;
  } | null;
  onStartInspection: () => void;
  onSave: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
}

export const RoomCard = ({ 
  room, 
  isExpanded, 
  onToggle, 
  currentInspection,
  onStartInspection,
  onSave
}: RoomCardProps) => {
  
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
    <Card className="overflow-hidden border-slate-200">
      <CardHeader 
        className="cursor-pointer px-4 py-3 bg-white hover:bg-slate-50/80 transition-colors" 
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2 text-base">
          {inspectionData.isHandled && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
          <span>{room.name || room.roomType?.name || room.code}</span>
        </CardTitle>
      </CardHeader>
      {isExpanded && currentInspection && (
        <CardContent className="p-0 border-t border-slate-100">
          <Accordion type="single" collapsible className="w-full border-0">
            <AccordionItem value="details" className="border-0">
              <div className="flex justify-end px-4 py-1">
                <AccordionTrigger className="py-1.5 px-2 -mr-1.5 rounded-md hover:bg-slate-100">
                  <span className="text-sm font-medium text-slate-500">Visa detaljer</span>
                </AccordionTrigger>
              </div>
              <AccordionContent className="px-0 py-0 border-t border-slate-100">
                <div className="p-4">
                  <RoomView 
                    room={room} 
                    inspectionData={inspectionData}
                    currentInspection={currentInspection}
                    onSave={onSave}
                    inspectorName={currentInspection.inspectorName}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      )}
      {isExpanded && !currentInspection && (
        <CardContent className="border-t border-slate-100">
          <EmptyInspectionState onStartInspection={onStartInspection} />
        </CardContent>
      )}
    </Card>
  );
};

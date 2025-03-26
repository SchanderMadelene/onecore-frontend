
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
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <CardTitle className="flex items-center gap-2">
          {inspectionData.isHandled && (
            <CheckCircle className="h-4 w-4 text-slate-500" />
          )}
          <span>{room.name || room.roomType?.name || room.code}</span>
        </CardTitle>
      </CardHeader>
      {isExpanded && currentInspection && (
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details" className="border-0">
              <div className="flex justify-end">
                <AccordionTrigger className="py-0 hover:no-underline">
                  <span className="text-sm text-gray-500">Detaljer</span>
                </AccordionTrigger>
              </div>
              <AccordionContent>
                <RoomView 
                  room={room} 
                  inspectionData={inspectionData}
                  currentInspection={currentInspection}
                  onSave={onSave}
                  inspectorName={currentInspection.inspectorName}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      )}
      {isExpanded && !currentInspection && (
        <CardContent>
          <EmptyInspectionState onStartInspection={onStartInspection} />
        </CardContent>
      )}
    </Card>
  );
};


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
    componentPhotos: {
      wall1: [],
      wall2: [],
      wall3: [],
      wall4: [],
      floor: [],
      ceiling: [],
      details: []
    },
    costResponsibility: {
      wall1: null,
      wall2: null,
      wall3: null,
      wall4: null,
      floor: null,
      ceiling: null,
      details: null
    },
    photos: [],
    isApproved: false,
    isHandled: false
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div 
        className="flex items-center px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors" 
        onClick={onToggle}
      >
        <div className="flex items-center gap-2 text-base font-medium flex-1">
          {inspectionData.isHandled && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
          <span>{room.name || room.roomType?.name || room.code}</span>
        </div>
        <div className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>
      
      {isExpanded && currentInspection && (
        <div className="border-t border-slate-200">
          <Accordion type="single" collapsible className="border-none">
            <AccordionItem value="details" className="border-none rounded-none">
              <div className="flex justify-end px-4 py-1.5">
                <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50 justify-end">
                  <span className="text-sm font-medium text-slate-500">Visa detaljer</span>
                </AccordionTrigger>
              </div>
              <AccordionContent className="pb-0">
                <div className="border-t border-slate-200 pt-3 px-4 pb-4">
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
        </div>
      )}
      
      {isExpanded && !currentInspection && (
        <div className="border-t border-slate-200 p-4">
          <EmptyInspectionState onStartInspection={onStartInspection} />
        </div>
      )}
    </div>
  );
};

// @deprecated - Replaced by RoomInspectionMobile
// This component is kept for reference but should not be used in new code

import { ConditionSelect } from "./ConditionSelect";
import type { InspectionRoom as InspectionRoomType } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check, MapPin, Home, PanelTop, Grid3X3 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface InspectionAccordionProps {
  isWallsComplete: () => boolean;
  isSingleComponentComplete: (component: keyof InspectionRoomType["conditions"]) => boolean;
  wallDirections: Record<string, string>;
  inspectionData: InspectionRoomType;
  onConditionUpdate: (field: keyof InspectionRoomType["conditions"], value: string) => void;
  onActionUpdate: (field: keyof InspectionRoomType["actions"], action: string) => void;
  onComponentNoteUpdate: (field: keyof InspectionRoomType["componentNotes"], note: string) => void;
}

export const InspectionAccordion = ({
  isWallsComplete,
  isSingleComponentComplete,
  wallDirections,
  inspectionData,
  onConditionUpdate,
  onActionUpdate,
  onComponentNoteUpdate
}: InspectionAccordionProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Accordion type="single" className="space-y-3" collapsible>
      <AccordionItem 
        value="walls"
        className="rounded-lg border border-slate-200 bg-white"
      >
        <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
          <div className="flex items-center gap-2.5">
            <MapPin className="h-4.5 w-4.5 text-slate-500" />
            <span className="font-medium text-base">Väggar</span>
            {isWallsComplete() && (
              <Check className="ml-1.5 h-4 w-4 text-green-500" />
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 px-4 pb-4 pt-1">
            <ConditionSelect
              key="wall1"
              label="Vägg"
              value={inspectionData.conditions.wall1}
              onChange={(value) => onConditionUpdate("wall1", value)}
              actions={inspectionData.actions.wall1}
              onActionUpdate={(action) => onActionUpdate("wall1", action)}
              type="walls"
              note={inspectionData.componentNotes.wall1}
              onNoteChange={(note) => onComponentNoteUpdate("wall1", note)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem 
        value="ceiling"
        className="rounded-lg border border-slate-200 bg-white"
      >
        <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
          <div className="flex items-center gap-2.5">
            <PanelTop className="h-4.5 w-4.5 text-slate-500" />
            <span className="font-medium text-base">Tak</span>
            {isSingleComponentComplete("ceiling") && (
              <Check className="ml-1.5 h-4 w-4 text-green-500" />
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="px-4 pb-4 pt-1">
            <ConditionSelect
              label="Tak"
              value={inspectionData.conditions.ceiling}
              onChange={(value) => onConditionUpdate("ceiling", value)}
              actions={inspectionData.actions.ceiling}
              onActionUpdate={(action) => onActionUpdate("ceiling", action)}
              type="ceiling"
              note={inspectionData.componentNotes.ceiling}
              onNoteChange={(note) => onComponentNoteUpdate("ceiling", note)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem 
        value="floor"
        className="rounded-lg border border-slate-200 bg-white"
      >
        <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
          <div className="flex items-center gap-2.5">
            <Grid3X3 className="h-4.5 w-4.5 text-slate-500" />
            <span className="font-medium text-base">Golv</span>
            {isSingleComponentComplete("floor") && (
              <Check className="ml-1.5 h-4 w-4 text-green-500" />
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="px-4 pb-4 pt-1">
            <ConditionSelect
              label="Golv"
              value={inspectionData.conditions.floor}
              onChange={(value) => onConditionUpdate("floor", value)}
              actions={inspectionData.actions.floor}
              onActionUpdate={(action) => onActionUpdate("floor", action)}
              type="floor"
              note={inspectionData.componentNotes.floor}
              onNoteChange={(note) => onComponentNoteUpdate("floor", note)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem 
        value="details"
        className="rounded-lg border border-slate-200 bg-white"
      >
        <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
          <div className="flex items-center gap-2.5">
            <Home className="h-4.5 w-4.5 text-slate-500" />
            <span className="font-medium text-base">Detaljer</span>
            {isSingleComponentComplete("details") && (
              <Check className="ml-1.5 h-4 w-4 text-green-500" />
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="px-4 pb-4 pt-1">
            <ConditionSelect
              label="Detaljer"
              value={inspectionData.conditions.details}
              onChange={(value) => onConditionUpdate("details", value)}
              actions={inspectionData.actions.details}
              onActionUpdate={(action) => onActionUpdate("details", action)}
              type="details"
              note={inspectionData.componentNotes.details}
              onNoteChange={(note) => onComponentNoteUpdate("details", note)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

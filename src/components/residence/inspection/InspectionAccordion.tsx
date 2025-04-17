
import { ConditionSelect } from "./ConditionSelect";
import type { InspectionRoom as InspectionRoomType } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  
  const renderAccordionItem = (
    value: string, 
    title: string, 
    isComplete: boolean, 
    children: React.ReactNode
  ) => (
    <AccordionItem 
      value={value} 
      className="border rounded-md overflow-hidden mb-2.5 last:mb-0 bg-white"
    >
      <AccordionTrigger 
        className={cn(
          "flex justify-between w-full px-4 py-3 hover:no-underline group",
          isComplete ? "hover:bg-green-50/50" : "hover:bg-slate-50"
        )}
      >
        <div className="flex items-center gap-2">
          {isComplete && (
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-green-100">
              <Check className="h-3.5 w-3.5 text-green-600" />
            </span>
          )}
          <span className={cn(
            "font-medium",
            isMobile ? "text-sm" : "",
            isComplete ? "text-green-700" : ""
          )}>
            {title}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 bg-slate-50/40">
        <div className="py-3 space-y-4">
          {children}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
  
  return (
    <Accordion type="single" collapsible className="space-y-1.5">
      {renderAccordionItem(
        "walls",
        "Väggar",
        isWallsComplete(),
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
      )}

      {renderAccordionItem(
        "ceiling",
        "Tak",
        isSingleComponentComplete("ceiling"),
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
      )}

      {renderAccordionItem(
        "floor",
        "Golv",
        isSingleComponentComplete("floor"),
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
      )}

      {renderAccordionItem(
        "details",
        "Detaljer",
        isSingleComponentComplete("details"),
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
      )}
    </Accordion>
  );
};

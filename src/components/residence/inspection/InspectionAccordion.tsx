
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
    <Accordion type="single" className="space-y-2" collapsible>
      <AccordionItem value="walls">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            {isWallsComplete() && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <span className="font-medium text-base">Väggar</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
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

      <AccordionItem value="ceiling">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            {isSingleComponentComplete("ceiling") && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <span className="font-medium text-base">Tak</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>
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

      <AccordionItem value="floor">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            {isSingleComponentComplete("floor") && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <span className="font-medium text-base">Golv</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>
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

      <AccordionItem value="details">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            {isSingleComponentComplete("details") && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <span className="font-medium text-base">Detaljer</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>
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

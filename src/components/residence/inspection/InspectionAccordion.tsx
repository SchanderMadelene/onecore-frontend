
import { ConditionSelect } from "./ConditionSelect";
import type { InspectionRoom as InspectionRoomType } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check } from "lucide-react";

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
  return (
    <Accordion type="single" className="space-y-2">
      <AccordionItem value="walls" className="border rounded-md">
        <AccordionTrigger className="flex justify-between w-full px-4 hover:no-underline hover:bg-gray-50">
          <div className="flex items-center gap-2">
            {isWallsComplete() && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <span className="font-medium">Väggar</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="space-y-6 py-2">
            {(["wall1", "wall2", "wall3", "wall4"] as const).map((wall) => (
              <ConditionSelect
                key={wall}
                label={wallDirections[wall]}
                value={inspectionData.conditions[wall]}
                onChange={(value) => onConditionUpdate(wall, value)}
                actions={inspectionData.actions[wall]}
                onActionUpdate={(action) => onActionUpdate(wall, action)}
                type="walls"
                note={inspectionData.componentNotes[wall]}
                onNoteChange={(note) => onComponentNoteUpdate(wall, note)}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="ceiling" className="border rounded-md">
        <AccordionTrigger className="flex justify-between w-full px-4 hover:no-underline hover:bg-gray-50">
          <div className="flex items-center gap-2">
            {isSingleComponentComplete("ceiling") && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <span className="font-medium">Tak</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="py-2">
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

      <AccordionItem value="floor" className="border rounded-md">
        <AccordionTrigger className="flex justify-between w-full px-4 hover:no-underline hover:bg-gray-50">
          <div className="flex items-center gap-2">
            {isSingleComponentComplete("floor") && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <span className="font-medium">Golv</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="py-2">
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

      <AccordionItem value="details" className="border rounded-md">
        <AccordionTrigger className="flex justify-between w-full px-4 hover:no-underline hover:bg-gray-50">
          <div className="flex items-center gap-2">
            {isSingleComponentComplete("details") && (
              <Check className="h-4 w-4 text-green-500" />
            )}
            <span className="font-medium">Detaljer</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="py-2">
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

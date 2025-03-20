
import { ConditionSelect } from "./ConditionSelect";
import type { InspectionRoom as InspectionRoomType } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const [expandedValue, setExpandedValue] = useState<string | undefined>(undefined);
  const [allExpanded, setAllExpanded] = useState(false);
  
  const handleValueChange = (value: string) => {
    if (value === expandedValue) {
      setExpandedValue(undefined);
    } else {
      setExpandedValue(value);
    }
    setAllExpanded(false);
  };
  
  const expandAll = () => {
    setAllExpanded(true);
    setExpandedValue(undefined);
  };
  
  const collapseAll = () => {
    setAllExpanded(false);
    setExpandedValue(undefined);
  };
  
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <div className="flex space-x-2">
          <Button 
            onClick={expandAll} 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <ChevronDown className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Expandera alla</span>
          </Button>
          <Button 
            onClick={collapseAll} 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
          >
            <ChevronUp className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Kollapsa alla</span>
          </Button>
        </div>
      </div>
      
      <Accordion 
        type="single" 
        value={expandedValue} 
        onValueChange={handleValueChange} 
        className="space-y-2"
        collapsible
      >
        <AccordionItem value="walls" className="border rounded-md" forceMount open={allExpanded}>
          <AccordionTrigger className="flex justify-between w-full px-3 hover:no-underline hover:bg-gray-50">
            <div className="flex items-center gap-1.5">
              {isWallsComplete() && (
                <Check className="h-4 w-4 text-green-500" />
              )}
              <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>Väggar</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3" forceMount>
            <div className="space-y-4 py-2">
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

        <AccordionItem value="ceiling" className="border rounded-md" forceMount open={allExpanded}>
          <AccordionTrigger className="flex justify-between w-full px-3 hover:no-underline hover:bg-gray-50">
            <div className="flex items-center gap-1.5">
              {isSingleComponentComplete("ceiling") && (
                <Check className="h-4 w-4 text-green-500" />
              )}
              <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>Tak</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3" forceMount>
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

        <AccordionItem value="floor" className="border rounded-md" forceMount open={allExpanded}>
          <AccordionTrigger className="flex justify-between w-full px-3 hover:no-underline hover:bg-gray-50">
            <div className="flex items-center gap-1.5">
              {isSingleComponentComplete("floor") && (
                <Check className="h-4 w-4 text-green-500" />
              )}
              <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>Golv</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3" forceMount>
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

        <AccordionItem value="details" className="border rounded-md" forceMount open={allExpanded}>
          <AccordionTrigger className="flex justify-between w-full px-3 hover:no-underline hover:bg-gray-50">
            <div className="flex items-center gap-1.5">
              {isSingleComponentComplete("details") && (
                <Check className="h-4 w-4 text-green-500" />
              )}
              <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>Detaljer</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3" forceMount>
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
    </div>
  );
};

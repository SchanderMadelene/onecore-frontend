
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { ConditionSelect } from "./ConditionSelect";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface InspectionRoomProps {
  room: Room;
  isExpanded: boolean;
  onToggle: () => void;
  inspectionData: InspectionRoomType;
  onConditionUpdate: (field: keyof InspectionRoomType["conditions"], value: string) => void;
  onActionUpdate: (field: keyof InspectionRoomType["actions"], action: string) => void;
  onComponentNoteUpdate: (field: keyof InspectionRoomType["componentNotes"], note: string) => void;
}

export const InspectionRoom = ({
  room,
  isExpanded,
  onToggle,
  inspectionData,
  onConditionUpdate,
  onActionUpdate,
  onComponentNoteUpdate,
}: InspectionRoomProps) => {
  const handleApproveRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const fields: (keyof InspectionRoomType["conditions"])[] = [
      "wall1", "wall2", "wall3", "wall4", 
      "floor", "ceiling", "details"
    ];
    fields.forEach(field => {
      onConditionUpdate(field, "good");
    });
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  const wallDirections = {
    wall1: "Vägg (Norr)",
    wall2: "Vägg (Öst)",
    wall3: "Vägg (Söder)",
    wall4: "Vägg (Väst)"
  };

  const isWallsComplete = () => {
    return ["wall1", "wall2", "wall3", "wall4"].every(
      wall => inspectionData.conditions[wall as keyof InspectionRoomType["conditions"]] !== ""
    );
  };

  const isSingleComponentComplete = (component: keyof InspectionRoomType["conditions"]) => {
    return inspectionData.conditions[component] !== "";
  };

  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <div className="w-full bg-card p-4 flex items-center justify-between border-b relative isolate">
        <button
          type="button"
          className="flex-1 text-left flex items-center gap-2 hover:text-primary/80 transition-colors"
          onClick={handleToggleClick}
        >
          <span className="font-semibold text-base">{room.name || room.roomType?.name || room.code}</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="relative z-20">
            <Button 
              type="button"
              variant="outline" 
              size="sm"
              className="text-green-600 border-green-600 hover:bg-green-50 transition-colors"
              onClick={handleApproveRoom}
            >
              <Check className="mr-2 h-4 w-4" />
              Godkänn rum
            </Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="p-0 hover:bg-transparent relative z-20"
            onClick={handleToggleClick}
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
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
        </div>
      )}
    </div>
  );
};

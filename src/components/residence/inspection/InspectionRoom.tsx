
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
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
  const isRoomApproved = Object.values(inspectionData.conditions).every(
    condition => condition === "good" || condition === "acceptable"
  );

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

  return (
    <div className="border rounded-lg">
      <div className="w-full bg-card p-4 flex items-center justify-between">
        <button
          type="button"
          className="flex-1 text-left flex items-center gap-2"
          onClick={handleToggleClick}
        >
          <span className="font-medium">{room.name || room.roomType?.name || room.code}</span>
          {isRoomApproved && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            className="text-green-600 border-green-600 hover:bg-green-50"
            onClick={handleApproveRoom}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Godkänn rum
          </Button>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t">
          <Accordion type="single" collapsible>
            <AccordionItem value="walls">
              <AccordionTrigger>Väggar</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
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

            <AccordionItem value="ceiling">
              <AccordionTrigger>Tak</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="floor">
              <AccordionTrigger>Golv</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details">
              <AccordionTrigger>Detaljer</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { Room } from "@/types/api";
import type { InspectionRoom, CostResponsibility, CustomComponentType, CustomInspectionComponent } from "../types";
import { CUSTOM_COMPONENT_TYPES } from "../types";
import { ComponentInspectionCard } from "../ComponentInspectionCard";
import { ComponentDetailSheet } from "../ComponentDetailSheet";
import { CustomComponentsSection } from "../CustomComponentsSection";

interface RoomInspectionMobileProps {
  room: Room;
  inspectionData: InspectionRoom;
  onConditionUpdate: (field: keyof InspectionRoom["conditions"], value: string) => void;
  onActionUpdate: (field: keyof InspectionRoom["actions"], action: string) => void;
  onComponentNoteUpdate: (field: keyof InspectionRoom["componentNotes"], note: string) => void;
  onComponentPhotoAdd: (field: keyof InspectionRoom["componentPhotos"], photoDataUrl: string) => void;
  onComponentPhotoRemove: (field: keyof InspectionRoom["componentPhotos"], index: number) => void;
  onCostResponsibilityUpdate: (field: keyof InspectionRoom["costResponsibility"], value: CostResponsibility) => void;
  onCustomComponentsUpdate?: (components: CustomInspectionComponent[]) => void;
}

const COMPONENTS: Array<{
  key: keyof InspectionRoom["conditions"];
  label: string;
  type: "walls" | "floor" | "ceiling" | "appliances" | "kitchenDoors";
}> = [
  { key: "walls", label: "Väggar", type: "walls" },
  { key: "floor", label: "Golv", type: "floor" },
  { key: "ceiling", label: "Tak", type: "ceiling" },
  { key: "appliances", label: "Vitvaror", type: "appliances" },
  { key: "kitchenDoors", label: "Köksluckor", type: "kitchenDoors" }
];

export function RoomInspectionMobile({
  room,
  inspectionData,
  onConditionUpdate,
  onActionUpdate,
  onComponentNoteUpdate,
  onComponentPhotoAdd,
  onComponentPhotoRemove,
  onCostResponsibilityUpdate,
  onCustomComponentsUpdate
}: RoomInspectionMobileProps) {
  const [openDetailComponent, setOpenDetailComponent] = useState<keyof InspectionRoom["conditions"] | null>(null);

  const handleAddCustomComponent = (type: CustomComponentType) => {
    const typeInfo = CUSTOM_COMPONENT_TYPES.find(t => t.value === type);
    if (!typeInfo || !onCustomComponentsUpdate) return;

    const newComponent: CustomInspectionComponent = {
      id: `${type}-${Date.now()}`,
      type,
      label: typeInfo.label,
    };

    onCustomComponentsUpdate([...inspectionData.customComponents, newComponent]);
  };

  const handleRemoveCustomComponent = (id: string) => {
    if (!onCustomComponentsUpdate) return;
    onCustomComponentsUpdate(inspectionData.customComponents.filter(c => c.id !== id));
  };

  const handleCustomComponentNoteUpdate = (id: string, note: string) => {
    if (!onCustomComponentsUpdate) return;
    onCustomComponentsUpdate(
      inspectionData.customComponents.map(c => c.id === id ? { ...c, note } : c)
    );
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-4 pb-3 border-b border-border">
          <h3 className="font-semibold text-lg">{room.name}</h3>
          <p className="text-sm text-muted-foreground">{room.size} m²</p>
        </div>

        <div>
          {COMPONENTS.map((component) => (
            <ComponentInspectionCard
              key={component.key}
              componentKey={component.key}
              label={component.label}
              condition={inspectionData.conditions[component.key]}
              note={inspectionData.componentNotes[component.key]}
              photoCount={inspectionData.componentPhotos[component.key].length}
              actions={inspectionData.actions[component.key]}
              costResponsibility={inspectionData.costResponsibility[component.key]}
              onConditionChange={(value) => onConditionUpdate(component.key, value)}
              onNoteChange={(note) => onComponentNoteUpdate(component.key, note)}
              onPhotoCapture={(photoDataUrl) => onComponentPhotoAdd(component.key, photoDataUrl)}
              onOpenDetail={() => setOpenDetailComponent(component.key)}
              onCostResponsibilityChange={(value) => onCostResponsibilityUpdate(component.key, value)}
            />
          ))}
        </div>

        {/* Detaljer - tillägg av extra komponenter (hidden for custom rooms) */}
        {!room.id.startsWith('custom-') && (
          <div className="mt-2">
            <Separator className="mb-4" />
            <div className="flex items-center gap-2 mb-3">
              <h4 className="font-medium text-base">Detaljer</h4>
              {inspectionData.customComponents.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  ({inspectionData.customComponents.length})
                </span>
              )}
            </div>
            <CustomComponentsSection
              components={inspectionData.customComponents}
              onAdd={handleAddCustomComponent}
              onRemove={handleRemoveCustomComponent}
              onNoteUpdate={handleCustomComponentNoteUpdate}
            />
          </div>
        )}

        {/* Detail sheets for each component */}
        {COMPONENTS.map((component) => (
          <ComponentDetailSheet
            key={`detail-${component.key}`}
            isOpen={openDetailComponent === component.key}
            onClose={() => setOpenDetailComponent(null)}
            componentKey={component.key}
            label={component.label}
            condition={inspectionData.conditions[component.key]}
            note={inspectionData.componentNotes[component.key]}
            photos={inspectionData.componentPhotos[component.key]}
            actions={inspectionData.actions[component.key]}
            componentType={component.type}
            onNoteChange={(note) => onComponentNoteUpdate(component.key, note)}
            onPhotoAdd={(photoDataUrl) => onComponentPhotoAdd(component.key, photoDataUrl)}
            onPhotoRemove={(index) => onComponentPhotoRemove(component.key, index)}
            onActionToggle={(action) => onActionUpdate(component.key, action)}
          />
        ))}
      </CardContent>
    </Card>
  );
}

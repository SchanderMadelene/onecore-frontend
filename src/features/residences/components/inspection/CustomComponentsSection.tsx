import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { PhotoCapture } from "./PhotoCapture";
import type { CustomInspectionComponent, CostResponsibility, CustomComponentType } from "./types";
import { CUSTOM_COMPONENT_TYPES } from "./types";

interface CustomComponentsSectionProps {
  components: CustomInspectionComponent[];
  onAdd: (type: CustomComponentType) => void;
  onRemove: (id: string) => void;
  onConditionChange: (id: string, condition: string) => void;
  onNoteChange: (id: string, note: string) => void;
  onPhotoAdd: (id: string, photoDataUrl: string) => void;
  onCostResponsibilityChange: (id: string, value: CostResponsibility) => void;
}

const CONDITION_OPTIONS = [
  { value: "God", label: "God", className: "bg-green-500 hover:bg-green-600 text-white border-green-600" },
  { value: "Acceptabel", label: "Acceptabel", className: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600" },
  { value: "Skadad", label: "Skadad", className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive" }
];

export function CustomComponentsSection({
  components,
  onAdd,
  onRemove,
  onConditionChange,
  onNoteChange,
  onPhotoAdd,
  onCostResponsibilityChange
}: CustomComponentsSectionProps) {
  const [selectedType, setSelectedType] = useState<CustomComponentType | "">("");

  const handleAdd = () => {
    if (selectedType) {
      onAdd(selectedType);
      setSelectedType("");
    }
  };

  return (
    <div className="space-y-4">
      {components.map((comp) => {
        const showCostResponsibility = comp.condition === "Skadad" || comp.condition === "Acceptabel";
        return (
          <div key={comp.id} className="border-b border-border last:border-0 py-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-medium">{comp.label}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(comp.id)}
                className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              {CONDITION_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={comp.condition === option.value ? "default" : "outline"}
                  size="default"
                  className={`h-10 text-sm font-medium ${comp.condition === option.value ? option.className : ""}`}
                  onClick={() => onConditionChange(comp.id, option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {showCostResponsibility && (
              <div className="mb-3">
                <span className="text-sm text-muted-foreground mb-2 block">Kostnadsansvar</span>
                <RadioGroup
                  value={comp.costResponsibility || ""}
                  onValueChange={(value) => onCostResponsibilityChange(comp.id, value as CostResponsibility)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tenant" id={`${comp.id}-tenant`} />
                    <Label htmlFor={`${comp.id}-tenant`} className="text-sm font-normal cursor-pointer">
                      Hyresgäst
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="landlord" id={`${comp.id}-landlord`} />
                    <Label htmlFor={`${comp.id}-landlord`} className="text-sm font-normal cursor-pointer">
                      Hyresvärd
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            <div className="flex gap-2 items-start">
              <Textarea
                value={comp.note}
                onChange={(e) => onNoteChange(comp.id, e.target.value)}
                placeholder="Anteckning..."
                className="flex-1 text-sm resize-none min-h-[40px] h-[40px]"
              />
              <PhotoCapture
                onPhotoCapture={(photoDataUrl) => onPhotoAdd(comp.id, photoDataUrl)}
                photoCount={comp.photos.length}
              />
            </div>
          </div>
        );
      })}

      <div className="flex gap-2 items-end pt-2">
        <div className="flex-1">
          <Label className="text-sm text-muted-foreground mb-1.5 block">Lägg till komponent</Label>
          <Select value={selectedType} onValueChange={(val) => setSelectedType(val as CustomComponentType)}>
            <SelectTrigger>
              <SelectValue placeholder="Välj komponenttyp..." />
            </SelectTrigger>
            <SelectContent>
              {CUSTOM_COMPONENT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="outline"
          size="default"
          onClick={handleAdd}
          disabled={!selectedType}
          className="h-10"
        >
          <Plus className="h-4 w-4 mr-1" />
          Lägg till
        </Button>
      </div>
    </div>
  );
}

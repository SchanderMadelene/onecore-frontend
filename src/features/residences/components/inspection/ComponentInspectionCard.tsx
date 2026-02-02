import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronRight, Camera, Wrench, MessageSquare } from "lucide-react";
import { PhotoCapture } from "./PhotoCapture";
import type { CostResponsibility } from "./types";

interface ComponentInspectionCardProps {
  componentKey: string;
  label: string;
  condition: string;
  note: string;
  photoCount: number;
  actions: string[];
  costResponsibility: CostResponsibility;
  onConditionChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onPhotoCapture: (photoDataUrl: string) => void;
  onOpenDetail: () => void;
  onCostResponsibilityChange: (value: CostResponsibility) => void;
}

const CONDITION_OPTIONS = [
  { 
    value: "God", 
    label: "God",
    className: "bg-green-500 hover:bg-green-600 text-white border-green-600"
  },
  { 
    value: "Acceptabel", 
    label: "Acceptabel",
    className: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600"
  },
  { 
    value: "Skadad", 
    label: "Skadad",
    className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive"
  }
];

export function ComponentInspectionCard({
  componentKey,
  label,
  condition,
  note,
  photoCount,
  actions,
  costResponsibility,
  onConditionChange,
  onNoteChange,
  onPhotoCapture,
  onOpenDetail,
  onCostResponsibilityChange
}: ComponentInspectionCardProps) {
  const [isNoteFocused, setIsNoteFocused] = useState(false);
  const hasLongNote = note.length > 50;
  const showCostResponsibility = condition === "Skadad" || condition === "Acceptabel";

  return (
    <div className="border-b border-border last:border-0 py-4">
      {/* Header with indicators */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-base font-medium">{label}</h4>
        <div className="flex items-center gap-2">
          {photoCount > 0 && (
            <button
              onClick={onOpenDetail}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded"
            >
              <Camera className="h-4 w-4" />
              <span>{photoCount}</span>
            </button>
          )}
          {actions.length > 0 && (
            <button
              onClick={onOpenDetail}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
            >
              <Wrench className="h-4 w-4" />
            </button>
          )}
          {hasLongNote && (
            <button
              onClick={onOpenDetail}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onOpenDetail}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Condition buttons */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {CONDITION_OPTIONS.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={condition === option.value ? "default" : "outline"}
            size="default"
            className={`h-10 text-sm font-medium ${condition === option.value ? option.className : ""}`}
            onClick={() => onConditionChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Cost responsibility - shown when condition is Skadad or Acceptabel */}
      {showCostResponsibility && (
        <div className="mb-3">
          <span className="text-sm text-muted-foreground mb-2 block">Kostnadsansvar</span>
          <RadioGroup
            value={costResponsibility || ""}
            onValueChange={(value) => onCostResponsibilityChange(value as CostResponsibility)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tenant" id={`${componentKey}-tenant`} />
              <Label htmlFor={`${componentKey}-tenant`} className="text-sm font-normal cursor-pointer">
                Hyresgäst
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="landlord" id={`${componentKey}-landlord`} />
              <Label htmlFor={`${componentKey}-landlord`} className="text-sm font-normal cursor-pointer">
                Hyresvärd
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Note field and photo button */}
      <div className="flex gap-2 items-start">
        <Textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          onFocus={() => setIsNoteFocused(true)}
          onBlur={() => setIsNoteFocused(false)}
          placeholder="Anteckning..."
          className={`flex-1 text-sm resize-none transition-all ${
            isNoteFocused ? 'min-h-[80px]' : 'min-h-[40px] h-[40px]'
          }`}
        />
        <PhotoCapture
          onPhotoCapture={onPhotoCapture}
          photoCount={0}
        />
      </div>
    </div>
  );
}

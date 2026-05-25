import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronDown, Camera, MessageSquare } from "lucide-react";
import { PhotoCapture } from "./PhotoCapture";
import { getConditionLabel } from "./inspection-utils";
import { getActionsForComponent } from "./ActionChecklist";
import type { CostResponsibility } from "./types";

interface ComponentInspectionCardProps {
  componentKey: string;
  componentType: string;
  label: string;
  condition: string;
  note: string;
  photoCount: number;
  actions: string[];
  costResponsibility: CostResponsibility;
  lastInspection?: { condition: string; date: string };
  onConditionChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onPhotoCapture: (photoDataUrl: string) => void;
  onOpenDetail: () => void;
  onCostResponsibilityChange: (value: CostResponsibility) => void;
  onActionChange: (action: string | null) => void;
}

const CONDITION_OPTIONS = [
  {
    value: "God",
    label: "God",
    className: "bg-green-500 hover:bg-green-600 text-white border-green-600",
  },
  {
    value: "Acceptabel",
    label: "OK",
    className: "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600",
  },
  {
    value: "Skadad",
    label: "Skadad",
    className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive",
  },
];

const APPLIANCE_WARRANTY_YEARS: Record<string, number> = {
  refrigerator: 5,
  freezer: 5,
  washingMachine: 5,
  tumbleDryer: 5,
};

const CLEAR_ACTION_VALUE = "__clear__";

export function ComponentInspectionCard({
  componentKey,
  componentType,
  label,
  condition,
  note,
  photoCount,
  actions,
  costResponsibility,
  lastInspection,
  onConditionChange,
  onNoteChange,
  onPhotoCapture,
  onOpenDetail,
  onCostResponsibilityChange,
  onActionChange,
}: ComponentInspectionCardProps) {
  const [isNoteFocused, setIsNoteFocused] = useState(false);
  const [manuallyExpanded, setManuallyExpanded] = useState(false);
  const hasLongNote = note.length > 50;
  const showDamageFields = condition === "Skadad";

  const actionOptions = getActionsForComponent(componentType);
  const selectedAction = actions[0] ?? "";
  const selectedActionLabel = actionOptions.find(a => a.value === selectedAction)?.label;

  // Auto-collapse for God/OK; Skadad always expanded; unset always expanded
  const isOkOrGood = condition === "God" || condition === "Acceptabel";
  const isCollapsed = isOkOrGood && !manuallyExpanded;

  // If condition changes away from OK/God, reset manual expansion
  useEffect(() => {
    if (!isOkOrGood) setManuallyExpanded(false);
  }, [isOkOrGood]);

  const conditionOption = CONDITION_OPTIONS.find(o => o.value === condition);

  if (isCollapsed && conditionOption) {
    return (
      <div className="border-b border-border last:border-0">
        <button
          type="button"
          onClick={() => setManuallyExpanded(true)}
          className="w-full flex items-center justify-between gap-3 py-4 text-left hover:bg-muted/30 -mx-2 px-2 rounded-md transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span
              className={`inline-flex items-center justify-center h-7 px-3 rounded-full text-xs font-medium shrink-0 ${conditionOption.className}`}
            >
              {conditionOption.label}
            </span>
            <span className="text-base font-medium truncate">{label}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-muted-foreground">
            {photoCount > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <Camera className="h-3.5 w-3.5" />
                {photoCount}
              </span>
            )}
            {note.length > 0 && <MessageSquare className="h-3.5 w-3.5" />}
            <ChevronDown className="h-4 w-4" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="border-b border-border last:border-0 py-6">
      {/* Header with indicators */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <h4 className="text-base font-medium">{label}</h4>
          {lastInspection && (
            <button
              onClick={onOpenDetail}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-0.5"
            >
              <span>Senast: {getConditionLabel(lastInspection.condition)} · {lastInspection.date}</span>
            </button>
          )}
          {APPLIANCE_WARRANTY_YEARS[componentKey] !== undefined && (
            <span className="text-xs text-muted-foreground mt-0.5">
              Garantitid: {APPLIANCE_WARRANTY_YEARS[componentKey]} år
            </span>
          )}
        </div>
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
      <div className="grid grid-cols-3 gap-2 mb-4">
        {CONDITION_OPTIONS.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={condition === option.value ? "default" : "outline"}
            size="default"
            className={`h-11 text-sm font-medium ${condition === option.value ? option.className : ""}`}
            onClick={() => onConditionChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Damage fields - shown when condition is Skadad */}
      {showDamageFields && (
        <div className="space-y-5 mb-5 mt-1">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Åtgärd</Label>
            <Select
              value={selectedAction || undefined}
              onValueChange={(value) => {
                if (value === CLEAR_ACTION_VALUE) {
                  onActionChange(null);
                } else {
                  onActionChange(value);
                }
              }}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Välj åtgärd">
                  {selectedActionLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {actionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="py-2.5">
                    {option.label}
                  </SelectItem>
                ))}
                {selectedAction && (
                  <SelectItem
                    value={CLEAR_ACTION_VALUE}
                    className="text-muted-foreground border-t mt-1 py-2.5"
                  >
                    Rensa val
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Kostnadsansvar</Label>
            <RadioGroup
              value={costResponsibility || ""}
              onValueChange={(value) => onCostResponsibilityChange(value as CostResponsibility)}
              className="grid grid-cols-2 gap-2"
            >
              <Label
                htmlFor={`${componentKey}-tenant`}
                className={`flex items-center gap-2 h-11 px-3 rounded-md border cursor-pointer transition-colors ${
                  costResponsibility === "tenant"
                    ? "border-primary bg-primary/5"
                    : "border-input hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem value="tenant" id={`${componentKey}-tenant`} />
                <span className="text-sm font-normal">Hyresgäst</span>
              </Label>
              <Label
                htmlFor={`${componentKey}-landlord`}
                className={`flex items-center gap-2 h-11 px-3 rounded-md border cursor-pointer transition-colors ${
                  costResponsibility === "landlord"
                    ? "border-primary bg-primary/5"
                    : "border-input hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem value="landlord" id={`${componentKey}-landlord`} />
                <span className="text-sm font-normal">Mimer</span>
              </Label>
            </RadioGroup>
          </div>
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
            isNoteFocused ? 'min-h-[80px]' : 'min-h-[44px] h-[44px]'
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

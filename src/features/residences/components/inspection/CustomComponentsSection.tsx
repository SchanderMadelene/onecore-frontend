import { useEffect, useState } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronDown, MessageSquare, Plus, X } from "lucide-react";
import { getActionsForComponent } from "./ActionChecklist";
import type { CustomInspectionComponent, CustomComponentType, CostResponsibility } from "./types";
import { CUSTOM_COMPONENT_TYPES } from "./types";

interface CustomComponentsSectionProps {
  components: CustomInspectionComponent[];
  onAdd: (type: CustomComponentType) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, patch: Partial<CustomInspectionComponent>) => void;
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

const CLEAR_ACTION_VALUE = "__clear__";

function CustomComponentRow({
  comp,
  onUpdate,
  onRemove,
}: {
  comp: CustomInspectionComponent;
  onUpdate: (patch: Partial<CustomInspectionComponent>) => void;
  onRemove: () => void;
}) {
  const [isNoteFocused, setIsNoteFocused] = useState(false);
  const [manuallyExpanded, setManuallyExpanded] = useState(false);

  const condition = comp.condition ?? "";
  const note = comp.note ?? "";
  const selectedAction = comp.actions?.[0] ?? "";
  const costResponsibility = comp.costResponsibility ?? null;

  const isOkOrGood = condition === "God" || condition === "Acceptabel";
  const isCollapsed = isOkOrGood && !manuallyExpanded;

  useEffect(() => {
    if (!isOkOrGood) setManuallyExpanded(false);
  }, [isOkOrGood]);

  const handleConditionChange = (value: string) => {
    if (value !== "Skadad") {
      onUpdate({ condition: value, actions: [], costResponsibility: null });
    } else {
      onUpdate({ condition: value });
    }
  };

  const handleActionChange = (action: string | null) => {
    onUpdate({ actions: action ? [action] : [] });
  };

  const actionOptions = getActionsForComponent(comp.type);
  const selectedActionLabel = actionOptions.find(a => a.value === selectedAction)?.label;
  const showDamageFields = condition === "Skadad";

  const conditionOption = CONDITION_OPTIONS.find(o => o.value === condition);

  if (isCollapsed && conditionOption) {
    return (
      <div className="border-b border-border last:border-0 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setManuallyExpanded(true)}
          className="flex-1 flex items-center justify-between gap-3 py-4 text-left hover:bg-muted/30 -mx-2 px-2 rounded-md transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span
              className={`inline-flex items-center justify-center h-7 px-3 rounded-full text-xs font-medium shrink-0 ${conditionOption.className}`}
            >
              {conditionOption.label}
            </span>
            <span className="text-base font-medium truncate">{comp.label}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-muted-foreground">
            {note.length > 0 && <MessageSquare className="h-3.5 w-3.5" />}
            <ChevronDown className="h-4 w-4" />
          </div>
        </button>
        <Button
          type="button"
          variant="subtle"
          size="sm"
          onClick={onRemove}
          className="h-8 w-8 p-0 shrink-0 hover:text-destructive"
          aria-label="Ta bort komponent"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="border-b border-border last:border-0 py-6">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-base font-medium">{comp.label}</h4>
        <Button
          type="button"
          variant="subtle"
          size="sm"
          onClick={onRemove}
          className="h-8 w-8 p-0 -mr-1 hover:text-destructive"
          aria-label="Ta bort komponent"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
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
            onClick={() => handleConditionChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {showDamageFields && (
        <div className="space-y-5 mb-5 mt-1">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Åtgärd</Label>
            <Select
              value={selectedAction || undefined}
              onValueChange={(value) => {
                if (value === CLEAR_ACTION_VALUE) {
                  handleActionChange(null);
                } else {
                  handleActionChange(value);
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
              onValueChange={(value) => onUpdate({ costResponsibility: value as CostResponsibility })}
              className="grid grid-cols-2 gap-2"
            >
              <Label
                htmlFor={`${comp.id}-tenant`}
                className={`flex items-center gap-2 h-11 px-3 rounded-md border cursor-pointer transition-colors ${
                  costResponsibility === "tenant"
                    ? "border-primary bg-primary/5"
                    : "border-input hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem value="tenant" id={`${comp.id}-tenant`} />
                <span className="text-sm font-normal">Hyresgäst</span>
              </Label>
              <Label
                htmlFor={`${comp.id}-landlord`}
                className={`flex items-center gap-2 h-11 px-3 rounded-md border cursor-pointer transition-colors ${
                  costResponsibility === "landlord"
                    ? "border-primary bg-primary/5"
                    : "border-input hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem value="landlord" id={`${comp.id}-landlord`} />
                <span className="text-sm font-normal">Mimer</span>
              </Label>
            </RadioGroup>
          </div>
        </div>
      )}

      <Textarea
        value={note}
        onChange={(e) => onUpdate({ note: e.target.value })}
        onFocus={() => setIsNoteFocused(true)}
        onBlur={() => setIsNoteFocused(false)}
        placeholder="Anteckning..."
        className={`text-sm resize-none transition-all ${
          isNoteFocused ? 'min-h-[80px]' : 'min-h-[44px] h-[44px]'
        }`}
      />
    </div>
  );
}

export function CustomComponentsSection({
  components,
  onAdd,
  onRemove,
  onUpdate,
}: CustomComponentsSectionProps) {
  const [open, setOpen] = useState(false);

  const addedTypes = new Set(components.map(c => c.type));
  const availableTypes = CUSTOM_COMPONENT_TYPES.filter(t => !addedTypes.has(t.value));

  const handleSelect = (type: CustomComponentType) => {
    onAdd(type);
    setOpen(false);
  };

  return (
    <div className="space-y-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-muted-foreground font-normal"
            disabled={availableTypes.length === 0}
          >
            <Plus className="h-4 w-4 mr-2" />
            {availableTypes.length === 0 ? "Alla komponenter tillagda" : "Lägg till komponent..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Sök komponent..." />
            <CommandList>
              <CommandEmpty>Inga komponenter hittades.</CommandEmpty>
              <CommandGroup>
                {availableTypes.map((type) => (
                  <CommandItem
                    key={type.value}
                    value={type.label}
                    onSelect={() => handleSelect(type.value)}
                  >
                    {type.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {components.length > 0 && (
        <div>
          {components.map((comp) => (
            <CustomComponentRow
              key={comp.id}
              comp={comp}
              onUpdate={(patch) => onUpdate(comp.id, patch)}
              onRemove={() => onRemove(comp.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

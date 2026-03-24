import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { Plus, X, ClipboardList, Check } from "lucide-react";
import type { CustomInspectionComponent, CustomComponentType } from "./types";
import { CUSTOM_COMPONENT_TYPES } from "./types";

interface CustomComponentsSectionProps {
  components: CustomInspectionComponent[];
  onAdd: (type: CustomComponentType) => void;
  onRemove: (id: string) => void;
}

export function CustomComponentsSection({
  components,
  onAdd,
  onRemove,
}: CustomComponentsSectionProps) {
  const [open, setOpen] = useState(false);

  // Filter out already added types
  const addedTypes = new Set(components.map(c => c.type));
  const availableTypes = CUSTOM_COMPONENT_TYPES.filter(t => !addedTypes.has(t.value));

  const handleSelect = (type: CustomComponentType) => {
    onAdd(type);
  };

  return (
    <div className="space-y-3">
      {/* Multiselect dropdown */}
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

      {/* Table of added components */}
      {components.length > 0 && (
        <div className="rounded-md border border-border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_36px] items-center px-3 py-2 bg-muted/50 text-sm text-muted-foreground">
            <span>Komponent</span>
            <span></span>
          </div>
          {/* Rows */}
          {components.map((comp, index) => (
            <div
              key={comp.id}
              className={`grid grid-cols-[1fr_36px] items-center px-3 py-2 ${
                index < components.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <span className="text-sm font-medium">{comp.label}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemove(comp.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

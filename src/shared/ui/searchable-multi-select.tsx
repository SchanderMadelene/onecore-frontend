import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";

export interface SearchableMultiSelectProps {
  options: string[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
}

export function SearchableMultiSelect({
  options,
  selected,
  onSelectionChange,
  placeholder = "Välj...",
  searchPlaceholder = "Sök...",
  className,
}: SearchableMultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggle = (value: string) => {
    onSelectionChange(
      selected.includes(value)
        ? selected.filter((s) => s !== value)
        : [...selected, value]
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full sm:w-[280px] justify-between h-auto min-h-10 font-normal hover:bg-background",
            className
          )}
        >
          <span className="flex flex-wrap gap-1 items-center truncate">
            {selected.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {selected.slice(0, 2).map((item) => (
              <Badge key={item} variant="secondary" size="default" className="text-xs px-1.5 py-0.5">
                {item}
              </Badge>
            ))}
            {selected.length > 2 && (
              <Badge variant="muted" size="default" className="text-xs px-1.5 py-0.5">
                +{selected.length - 2} till
              </Badge>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>Inga träffar.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => toggle(option)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {selected.length > 0 && (
            <div className="border-t p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs gap-1"
                onClick={() => onSelectionChange([])}
              >
                <X className="h-3 w-3" />
                Rensa alla
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

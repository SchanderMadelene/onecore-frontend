
import { useState } from "react";
import { TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Filter, X, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface FilterableTableHeadProps {
  children: React.ReactNode;
  onFilter?: (value: string) => void;
  filterValue?: string;
  filterOptions?: string[];
  placeholder?: string;
  className?: string;
}

export const FilterableTableHead = ({ 
  children, 
  onFilter, 
  filterValue = "", 
  filterOptions = [],
  placeholder = "Filtrera...",
  className 
}: FilterableTableHeadProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onFilter?.(value === filterValue ? "" : value);
    setIsOpen(false);
  };

  const handleClear = () => {
    onFilter?.("");
    setIsOpen(false);
  };

  return (
    <TableHead className={className}>
      <div className="flex items-center justify-between group">
        <span>{children}</span>
        {onFilter && (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                  filterValue ? 'opacity-100 text-primary' : ''
                }`}
              >
                <Filter className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>Inga alternativ hittades.</CommandEmpty>
                  <CommandGroup>
                    {filterOptions.map((option) => (
                      <CommandItem
                        key={option}
                        value={option}
                        onSelect={() => handleSelect(option)}
                        className="flex items-center justify-between"
                      >
                        <span>{option}</span>
                        {filterValue === option && (
                          <Check className="h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
                {filterValue && (
                  <div className="border-t p-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleClear}
                      className="w-full"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Rensa filter
                    </Button>
                  </div>
                )}
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </TableHead>
  );
};

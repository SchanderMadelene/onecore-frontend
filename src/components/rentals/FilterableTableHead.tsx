
import { useState } from "react";
import { TableHead } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FilterableTableHeadProps {
  children: React.ReactNode;
  onFilter?: (value: string) => void;
  filterValue?: string;
  placeholder?: string;
  className?: string;
}

export const FilterableTableHead = ({ 
  children, 
  onFilter, 
  filterValue = "", 
  placeholder = "Filtrera...",
  className 
}: FilterableTableHeadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(filterValue);

  const handleApplyFilter = () => {
    onFilter?.(localValue);
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setLocalValue("");
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
            <PopoverContent className="w-64 p-3" align="start">
              <div className="space-y-3">
                <div className="font-medium text-sm">Filtrera {children?.toString().toLowerCase()}</div>
                <Input
                  placeholder={placeholder}
                  value={localValue}
                  onChange={(e) => setLocalValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleApplyFilter();
                    }
                    if (e.key === 'Escape') {
                      setIsOpen(false);
                    }
                  }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleApplyFilter} className="flex-1">
                    Filtrera
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleClearFilter}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </TableHead>
  );
};

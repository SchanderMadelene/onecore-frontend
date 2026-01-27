import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { SortField, SortDirection } from "../hooks";

interface SortableHeaderProps {
  field: SortField;
  children: React.ReactNode;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export function SortableHeader({ field, children, sortField, sortDirection, onSort }: SortableHeaderProps) {
  return (
    <Button
      variant="ghost"
      className="h-auto p-0 font-semibold text-muted-foreground hover:text-foreground"
      onClick={() => onSort(field)}
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? 
          <ChevronUp className="ml-1 h-4 w-4" /> : 
          <ChevronDown className="ml-1 h-4 w-4" />
      )}
    </Button>
  );
}


import { TableHead } from "@/components/ui/table";
import { FilterContent } from "@/shared/ui/filter-content";

// Re-export FilterContent for backward compatibility
export { FilterContent } from "@/shared/ui/filter-content";

interface FilterableTableHeadProps {
  children: React.ReactNode;
  onFilter?: (value: string) => void;
  filterValue?: string;
  filterOptions?: string[];
  placeholder?: string;
  className?: string;
  /** When true, renders without TableHead wrapper (for use inside ResponsiveTable headerRender) */
  inline?: boolean;
}

export const FilterableTableHead = ({ 
  children, 
  onFilter, 
  filterValue = "", 
  filterOptions = [],
  placeholder = "Filtrera...",
  className,
  inline = false
}: FilterableTableHeadProps) => {
  if (inline) {
    return (
      <FilterContent
        onFilter={onFilter}
        filterValue={filterValue}
        filterOptions={filterOptions}
        placeholder={placeholder}
      >
        {children}
      </FilterContent>
    );
  }

  return (
    <TableHead className={className}>
      <FilterContent
        onFilter={onFilter}
        filterValue={filterValue}
        filterOptions={filterOptions}
        placeholder={placeholder}
      >
        {children}
      </FilterContent>
    </TableHead>
  );
};

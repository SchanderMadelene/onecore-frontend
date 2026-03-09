
import { useIsMobile } from "@/hooks/use-mobile";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ResponsiveTableColumn {
  key: string;
  label: string;
  render: (item: any) => ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface ResponsiveTableProps {
  data: any[];
  columns: ResponsiveTableColumn[];
  keyExtractor: (item: any) => string;
  emptyMessage?: string;
  mobileCardRenderer?: (item: any) => ReactNode;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  onRowClick?: (item: any) => void;
  rowClassName?: string | ((item: any) => string);
}

export function ResponsiveTable({ 
  data, 
  columns, 
  keyExtractor, 
  emptyMessage = "Inga resultat hittades",
  mobileCardRenderer,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  onRowClick,
  rowClassName
}: ResponsiveTableProps) {
  const isMobile = useIsMobile();

  const allSelected = data.length > 0 && data.every(item => selectedKeys.includes(keyExtractor(item)));
  const someSelected = data.some(item => selectedKeys.includes(keyExtractor(item))) && !allSelected;

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map(item => keyExtractor(item)));
    }
  };

  const handleSelectItem = (key: string) => {
    if (!onSelectionChange) return;
    if (selectedKeys.includes(key)) {
      onSelectionChange(selectedKeys.filter(k => k !== key));
    } else {
      onSelectionChange([...selectedKeys, key]);
    }
  };

  const getRowClassName = (item: any) => {
    if (!rowClassName) return "";
    if (typeof rowClassName === "function") return rowClassName(item);
    return rowClassName;
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  if (isMobile && mobileCardRenderer) {
    return (
      <div className="space-y-3">
        {data.map((item) => {
          const key = keyExtractor(item);
          const isSelected = selectedKeys.includes(key);
          return (
            <Card 
              key={key} 
              className={cn(
                "overflow-hidden", 
                isSelected && "ring-2 ring-primary",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(item)}
            >
              <CardContent className="p-4 min-h-[44px] flex items-center gap-3">
                {selectable && (
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleSelectItem(key)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Välj rad"
                  />
                )}
                <div className="flex-1">
                  {mobileCardRenderer(item)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  if (isMobile) {
    const visibleColumns = columns.filter(col => !col.hideOnMobile);
    
    return (
      <div className="space-y-3">
        {data.map((item) => {
          const key = keyExtractor(item);
          const isSelected = selectedKeys.includes(key);
          return (
            <Card 
              key={key} 
              className={cn(
                "overflow-hidden", 
                isSelected && "ring-2 ring-primary",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(item)}
            >
              <CardContent className="p-4 space-y-3 min-h-[44px]">
                {selectable && (
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleSelectItem(key)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Välj rad"
                  />
                )}
                {visibleColumns.map((column) => (
                  <div key={column.key} className="flex flex-col gap-1 min-h-[44px]">
                    <span className="text-xs font-medium text-muted-foreground">
                      {column.label}
                    </span>
                    <div className="text-sm">
                      {column.render(item)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  ref={(el) => {
                    if (el) (el as any).indeterminate = someSelected;
                  }}
                  onCheckedChange={handleSelectAll}
                  aria-label="Välj alla"
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            const key = keyExtractor(item);
            const isSelected = selectedKeys.includes(key);
            return (
              <TableRow 
                key={key} 
                className={cn(
                  "min-h-[44px]", 
                  isSelected && "bg-primary/5",
                  onRowClick && "cursor-pointer hover:bg-muted/50",
                  getRowClassName(item)
                )}
                onClick={() => onRowClick?.(item)}
              >
                {selectable && (
                  <TableCell className="w-12">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleSelectItem(key)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Välj rad"
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.key} className={cn(column.className, "py-3")}>
                    {column.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

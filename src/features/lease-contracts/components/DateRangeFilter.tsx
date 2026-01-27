import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
  label: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  onFromDateChange: (date: Date | undefined) => void;
  onToDateChange: (date: Date | undefined) => void;
}

export function DateRangeFilter({
  label,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange
}: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);

  const hasValue = fromDate || toDate;

  const formatDateRange = () => {
    if (fromDate && toDate) {
      return `${format(fromDate, "d MMM", { locale: sv })} - ${format(toDate, "d MMM", { locale: sv })}`;
    }
    if (fromDate) {
      return `Från ${format(fromDate, "d MMM", { locale: sv })}`;
    }
    if (toDate) {
      return `Till ${format(toDate, "d MMM", { locale: sv })}`;
    }
    return label;
  };

  const clearDates = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFromDateChange(undefined);
    onToDateChange(undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full sm:w-[200px] justify-between",
            hasValue && "border-primary"
          )}
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span className="truncate">{formatDateRange()}</span>
          </span>
          {hasValue && (
            <X 
              className="h-4 w-4 ml-2 hover:text-destructive" 
              onClick={clearDates}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 bg-background z-50" align="start">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">{label}</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Från</label>
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={onFromDateChange}
                initialFocus
                className={cn("p-3 pointer-events-auto border rounded-md")}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Till</label>
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={onToDateChange}
                disabled={(date) => fromDate ? date < fromDate : false}
                className={cn("p-3 pointer-events-auto border rounded-md")}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                onFromDateChange(undefined);
                onToDateChange(undefined);
              }}
            >
              Rensa
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Klar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

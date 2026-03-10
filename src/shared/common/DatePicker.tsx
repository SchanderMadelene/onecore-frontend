import { format as formatDate } from "date-fns";
import { type Locale } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  /** date-fns format string, default "yyyy-MM-dd" */
  dateFormat?: string;
  locale?: Locale;
  disabled?: boolean | ((date: Date) => boolean);
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Välj datum...",
  dateFormat = "yyyy-MM-dd",
  locale,
  disabled,
  className,
}: DatePickerProps) {
  const isButtonDisabled = typeof disabled === "boolean" ? disabled : false;
  const calendarDisabled = typeof disabled === "function" ? disabled : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={isButtonDisabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            formatDate(value, dateFormat, locale ? { locale } : undefined)
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={calendarDisabled}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
}

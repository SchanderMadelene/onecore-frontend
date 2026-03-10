import { useState } from "react";
import { format as formatDate } from "date-fns";
import { type Locale } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DateTimePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  /** date-fns format string for the date part, default "dd-MM-yyyy" */
  dateFormat?: string;
  /** Default time when no date is set yet, default "09:00" */
  defaultTime?: string;
  locale?: Locale;
  disabled?: boolean;
  className?: string;
  /** If true, shows only the date text without a button (read-only display) */
  readOnly?: boolean;
  readOnlyFormat?: string;
  readOnlyFallback?: string;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Välj datum och tid",
  dateFormat = "dd-MM-yyyy",
  defaultTime = "09:00",
  locale,
  disabled = false,
  className,
  readOnly = false,
  readOnlyFormat,
  readOnlyFallback = "Ej planerat",
}: DateTimePickerProps) {
  const [timeValue, setTimeValue] = useState(() => {
    if (value) {
      const hours = value.getHours().toString().padStart(2, "0");
      const minutes = value.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return defaultTime;
  });

  const displayFormat = readOnlyFormat ?? `${dateFormat} HH:mm`;

  if (readOnly) {
    return (
      <span className="text-sm whitespace-nowrap">
        {value
          ? formatDate(value, displayFormat, locale ? { locale } : undefined)
          : readOnlyFallback}
      </span>
    );
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const [hours, minutes] = timeValue.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      onChange(newDate);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTimeValue(newTime);

    if (value && /^\d{2}:\d{2}$/.test(newTime)) {
      const [hours, minutes] = newTime.split(":").map(Number);
      if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
        const newDate = new Date(value);
        newDate.setHours(hours, minutes, 0, 0);
        onChange(newDate);
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-52 justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">
            {value
              ? formatDate(value, `${dateFormat} HH:mm`, locale ? { locale } : undefined)
              : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateSelect}
          initialFocus
          className="p-3 pointer-events-auto"
        />
        <div className="p-3 border-t">
          <label className="text-sm font-medium mb-2 block">Klockslag</label>
          <Input
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}


import { useState } from 'react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DateSelectionSectionProps = {
  plannedExecutionDate: Date | undefined;
  setPlannedExecutionDate: (date: Date | undefined) => void;
  dueDate: Date | undefined;
  setDueDate: (date: Date | undefined) => void;
};

export function DateSelectionSection({
  plannedExecutionDate,
  setPlannedExecutionDate,
  dueDate,
  setDueDate,
}: DateSelectionSectionProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="plannedExecution">Planerat utförande</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button id="plannedExecution" variant="outline" className={cn("w-full justify-start text-left font-normal", !plannedExecutionDate && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {plannedExecutionDate ? format(plannedExecutionDate, "yyyy-MM-dd") : <span>Välj datum...</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={plannedExecutionDate} onSelect={setPlannedExecutionDate} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dueDate">Förfallodatum</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button id="dueDate" variant="outline" className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, "yyyy-MM-dd") : <span>Välj datum...</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

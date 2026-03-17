import { Label } from "@/components/ui/label";
import { DatePicker } from "@/shared/common";

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
        <DatePicker
          value={plannedExecutionDate}
          onChange={setPlannedExecutionDate}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dueDate">Förfallodatum</Label>
        <DatePicker
          value={dueDate}
          onChange={setDueDate}
        />
      </div>
    </>
  );
}

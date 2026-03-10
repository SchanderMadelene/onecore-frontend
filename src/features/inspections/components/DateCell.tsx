import type { ExtendedInspection } from "../types";
import { DateTimePicker } from "@/shared/common/DateTimePicker";

interface DateCellProps {
  inspection: ExtendedInspection;
  readOnly?: boolean;
  onUpdate: (id: string, updates: Partial<ExtendedInspection>) => void;
}

export function DateCell({ inspection, readOnly = false, onUpdate }: DateCellProps) {
  return (
    <DateTimePicker
      value={inspection.scheduledDate}
      onChange={(date) => {
        if (date) onUpdate(inspection.id, { scheduledDate: date });
      }}
      readOnly={readOnly}
      readOnlyFallback="Ej planerat"
      placeholder="Välj datum och tid"
    />
  );
}

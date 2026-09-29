import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { RentalMethod } from "../data/published-housing";

interface RentalMethodPickerProps {
  value: RentalMethod | null;
  onChange: (method: RentalMethod) => void;
  idPrefix?: string;
}

export function RentalMethodPicker({ value, onChange, idPrefix = "method" }: RentalMethodPickerProps) {
  return (
    <div className="space-y-2">
      <Label className="text-foreground">Uthyrningsmetod</Label>
      <RadioGroup
        value={value ?? ""}
        onValueChange={(v) => onChange(v as RentalMethod)}
        className="gap-2"
      >
        <Label
          htmlFor={`${idPrefix}-standard`}
          className="flex items-center gap-3 rounded-md border p-3 cursor-pointer font-normal has-[:checked]:border-foreground"
        >
          <RadioGroupItem value="standard" id={`${idPrefix}-standard`} />
          <span className="font-medium text-foreground">Standard</span>
        </Label>
        <Label
          htmlFor={`${idPrefix}-poangfri`}
          className="flex items-center gap-3 rounded-md border p-3 cursor-pointer font-normal has-[:checked]:border-foreground"
        >
          <RadioGroupItem value="poangfri" id={`${idPrefix}-poangfri`} />
          <span className="font-medium text-foreground">Poängfri</span>
        </Label>
      </RadioGroup>
    </div>
  );
}

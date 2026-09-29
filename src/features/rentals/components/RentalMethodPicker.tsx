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
          className="flex items-start gap-3 rounded-md border p-3 cursor-pointer font-normal has-[:checked]:border-foreground"
        >
          <RadioGroupItem value="standard" id={`${idPrefix}-standard`} className="mt-0.5" />
          <span>
            <span className="block font-medium text-foreground">Standard</span>
            <span className="block text-sm text-muted-foreground">Sökande rangordnas efter köpoäng. Erbjudande, visning och kontrakt.</span>
          </span>
        </Label>
        <Label
          htmlFor={`${idPrefix}-poangfri`}
          className="flex items-start gap-3 rounded-md border p-3 cursor-pointer font-normal has-[:checked]:border-foreground"
        >
          <RadioGroupItem value="poangfri" id={`${idPrefix}-poangfri`} className="mt-0.5" />
          <span>
            <span className="block font-medium text-foreground">Poängfri</span>
            <span className="block text-sm text-muted-foreground">Först till kvarn. Intresseanmälningar kvitteras manuellt.</span>
          </span>
        </Label>
      </RadioGroup>
    </div>
  );
}

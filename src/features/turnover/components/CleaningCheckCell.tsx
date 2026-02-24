import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface CleaningCheckCellProps {
  checked: boolean;
  count: number;
  onCheckedChange: (checked: boolean) => void;
  onCountChange: (count: number) => void;
  showLabel?: boolean;
}

export function CleaningCheckCell({
  checked,
  count,
  onCheckedChange,
  onCountChange,
  showLabel = false,
}: CleaningCheckCellProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(val === true)}
        aria-label="Städkontroll"
      />
      {showLabel && <span className="text-xs">Städkontroll</span>}
      {checked && (
        <Input
          type="number"
          min={1}
          value={count}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1) onCountChange(val);
          }}
          className="h-6 w-10 px-1 text-center text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label="Antal kontroller"
        />
      )}
    </div>
  );
}

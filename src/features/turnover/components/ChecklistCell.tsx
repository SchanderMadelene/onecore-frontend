import { Checkbox } from '@/components/ui/checkbox';

interface ChecklistCellProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function ChecklistCell({ checked, onChange, label }: ChecklistCellProps) {
  return (
    <div className="flex items-center justify-center">
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => onChange(val === true)}
        aria-label={label}
      />
    </div>
  );
}

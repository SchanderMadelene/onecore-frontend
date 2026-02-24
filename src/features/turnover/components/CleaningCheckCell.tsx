import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

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
      {checked && (
        <div className="flex items-center gap-1">
          {showLabel && <span className="text-xs">Städkontroll</span>}
          <Button
            variant="outline"
            size="icon"
            className="h-5 w-5"
            onClick={() => onCountChange(Math.max(1, count - 1))}
            aria-label="Minska antal"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-xs font-medium w-4 text-center">{count}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-5 w-5"
            onClick={() => onCountChange(count + 1)}
            aria-label="Öka antal"
          >
            <Plus className="h-3 w-3" />
          </Button>
          {showLabel && (
            <span className="text-xs text-muted-foreground">
              ({count} {count === 1 ? 'kontroll' : 'kontroller'})
            </span>
          )}
        </div>
      )}
      {!checked && showLabel && <span className="text-xs">Städkontroll</span>}
    </div>
  );
}

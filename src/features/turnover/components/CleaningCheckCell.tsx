import { Input } from '@/components/ui/input';
import { CleaningStatus } from '../types/move-in-list-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { cn } from '@/lib/utils';

const STATUS_CONFIG: Record<CleaningStatus, { label: string; className: string }> = {
  not_done: { label: 'Ej utförd', className: 'bg-muted text-muted-foreground border-muted' },
  approved: { label: 'Godkänd', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  reinspection: { label: 'Omkontroll', className: 'bg-amber-100 text-amber-800 border-amber-200' },
};

interface CleaningCheckCellProps {
  status: CleaningStatus;
  count: number;
  onStatusChange: (status: CleaningStatus) => void;
  onCountChange: (count: number) => void;
  showLabel?: boolean;
}

export function CleaningCheckCell({
  status,
  count,
  onStatusChange,
  onCountChange,
  showLabel = false,
}: CleaningCheckCellProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex items-center gap-1.5">
      {showLabel && <span className="text-xs text-muted-foreground">Städ:</span>}
      <Select value={status} onValueChange={(v) => onStatusChange(v as CleaningStatus)}>
        <SelectTrigger
          className={cn(
            'h-7 w-auto min-w-[90px] rounded-full px-2.5 py-0 text-xs font-medium border',
            config.className
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <SelectItem key={key} value={key}>
              {cfg.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {status === 'reinspection' && (
        <Input
          type="number"
          min={1}
          value={count}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1) onCountChange(val);
          }}
          className="h-7 w-10 px-1 text-center text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label="Antal kontroller"
        />
      )}
    </div>
  );
}

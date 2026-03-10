import { CleaningStatus } from '../types/move-in-list-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { cn } from '@/lib/utils';
import { badgeVariants } from '@/shared/ui/badge';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { DatePicker } from '@/shared/common/DatePicker';

const STATUS_CONFIG: Record<CleaningStatus, { label: string; variant: 'muted' | 'info' | 'success' | 'warning' }> = {
  not_done: { label: 'Ej utförd', variant: 'muted' },
  booked: { label: 'Bokad', variant: 'info' },
  approved: { label: 'Godkänd', variant: 'success' },
  reinspection: { label: 'Omkontroll', variant: 'warning' },
};

interface CleaningCheckCellProps {
  status: CleaningStatus;
  count: number;
  bookedDate?: string;
  approvedDate?: string;
  onStatusChange: (status: CleaningStatus) => void;
  onCountChange: (count: number) => void;
  onBookedDateChange: (date: string | undefined) => void;
  showLabel?: boolean;
}

export function CleaningCheckCell({
  status,
  bookedDate,
  approvedDate,
  onStatusChange,
  onBookedDateChange,
  showLabel = false,
}: CleaningCheckCellProps) {
  const config = STATUS_CONFIG[status];
  const showDatePicker = status === 'booked' || status === 'reinspection';

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {showLabel && <span className="text-xs text-muted-foreground">Städ:</span>}
      <Select value={status} onValueChange={(v) => onStatusChange(v as CleaningStatus)}>
        <SelectTrigger
          className={cn(
            badgeVariants({ variant: config.variant }),
            'h-7 w-auto min-w-[90px] py-0 border'
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
      {showDatePicker && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-7 px-2.5 text-xs font-normal gap-1.5"
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              {bookedDate ? format(parseISO(bookedDate), 'd MMM yyyy', { locale: sv }) : 'Välj datum'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
            <Calendar
              mode="single"
              selected={bookedDate ? parseISO(bookedDate) : undefined}
              onSelect={(d) => onBookedDateChange(d ? format(d, 'yyyy-MM-dd') : undefined)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      )}
      {status === 'approved' && approvedDate && (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {format(parseISO(approvedDate), 'd MMM', { locale: sv })}
        </span>
      )}
    </div>
  );
}

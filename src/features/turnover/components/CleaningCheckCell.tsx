import { CleaningStatus } from '../types/move-in-list-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

const STATUS_CONFIG: Record<CleaningStatus, { label: string; className: string }> = {
  not_done: { label: 'Ej utförd', className: 'bg-muted text-muted-foreground border-muted' },
  booked: { label: 'Bokad', className: 'bg-sky-100 text-sky-800 border-sky-200' },
  approved: { label: 'Godkänd', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  reinspection: { label: 'Omkontroll', className: 'bg-amber-100 text-amber-800 border-amber-200' },
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
      {showDatePicker && (
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                'inline-flex items-center gap-1 h-7 rounded-full px-2.5 text-xs font-medium border cursor-pointer',
                bookedDate
                  ? 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                  : 'bg-muted text-muted-foreground border-muted hover:bg-accent'
              )}
            >
              <CalendarIcon className="h-3 w-3" />
              {bookedDate ? format(parseISO(bookedDate), 'd MMM', { locale: sv }) : 'Datum?'}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
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

import { Input } from '@/components/ui/input';
import { CleaningStatus } from '../types/move-in-list-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
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
  count,
  bookedDate,
  approvedDate,
  onStatusChange,
  onCountChange,
  onBookedDateChange,
  showLabel = false,
}: CleaningCheckCellProps) {
  const config = STATUS_CONFIG[status];

  const showDatePicker = status === 'booked' || status === 'reinspection';
  const dateLabel = status === 'reinspection' ? 'Ombokad' : 'Bokad';

  return (
    <div className="flex flex-col gap-1">
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
      {showDatePicker && (
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">{dateLabel}:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-6 px-2 text-xs font-normal gap-1"
              >
                <CalendarIcon className="h-3 w-3" />
                {bookedDate ? format(parseISO(bookedDate), 'd MMM', { locale: sv }) : 'Välj datum'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={bookedDate ? parseISO(bookedDate) : undefined}
                onSelect={(d) => onBookedDateChange(d ? format(d, 'yyyy-MM-dd') : undefined)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
      {status === 'approved' && approvedDate && (
        <span className="text-xs text-muted-foreground">
          Godkänd: {format(parseISO(approvedDate), 'd MMM yyyy', { locale: sv })}
        </span>
      )}
    </div>
  );
}

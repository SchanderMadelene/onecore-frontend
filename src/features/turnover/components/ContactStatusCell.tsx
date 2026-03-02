import { ContactStatus } from '../types/move-in-list-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

const STATUS_CONFIG: Record<ContactStatus, { label: string; className: string }> = {
  not_contacted: { label: 'Ej kontaktad', className: 'bg-muted text-muted-foreground border-muted' },
  not_reached: { label: 'Ej nådd', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  visit_booked: { label: 'Besök bokat', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
};

interface ContactStatusCellProps {
  status: ContactStatus;
  attempts: number;
  visitBookedDate?: string;
  onStatusChange: (status: ContactStatus) => void;
  onVisitBookedDateChange: (date: string | undefined) => void;
  showLabel?: boolean;
}

export function ContactStatusCell({
  status,
  attempts,
  visitBookedDate,
  onStatusChange,
  onVisitBookedDateChange,
  showLabel = false,
}: ContactStatusCellProps) {
  const config = STATUS_CONFIG[status];

  const displayLabel = status === 'not_reached' && attempts > 0
    ? `Ej nådd ${attempts}x`
    : config.label;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {showLabel && <span className="text-xs text-muted-foreground">Kontakt:</span>}
      <Select value={status} onValueChange={(v) => onStatusChange(v as ContactStatus)}>
        <SelectTrigger
          className={cn(
            'h-7 w-auto min-w-[90px] rounded-full px-2.5 py-0 text-xs font-medium border',
            config.className
          )}
        >
          <SelectValue>{displayLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <SelectItem key={key} value={key}>
              {cfg.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {status === 'visit_booked' && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-7 px-2.5 text-xs font-normal gap-1.5"
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              {visitBookedDate ? format(parseISO(visitBookedDate), 'd MMM yyyy', { locale: sv }) : 'Välj datum'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
            <Calendar
              mode="single"
              selected={visitBookedDate ? parseISO(visitBookedDate) : undefined}
              onSelect={(d) => onVisitBookedDateChange(d ? format(d, 'yyyy-MM-dd') : undefined)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

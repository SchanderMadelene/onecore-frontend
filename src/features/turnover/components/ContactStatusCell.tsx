import { ContactStatus } from '../types/move-in-list-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { badgeVariants } from '@/shared/ui/badge';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Minus, Plus } from 'lucide-react';
import { DatePicker } from '@/shared/common/DatePicker';

const STATUS_CONFIG: Record<ContactStatus, { label: string; variant: 'muted' | 'info' | 'success' | 'warning'; order: number }> = {
  not_contacted: { label: 'Ej kontaktad', variant: 'muted', order: 0 },
  not_reached: { label: 'Ej nådd', variant: 'warning', order: 1 },
  visit_booked: { label: 'Besök', variant: 'info', order: 2 },
  visit_done: { label: 'Besök genomfört', variant: 'success', order: 3 },
};

interface ContactStatusCellProps {
  status: ContactStatus;
  attempts: number;
  visitBookedDate?: string;
  onStatusChange: (status: ContactStatus) => void;
  onAttemptsChange: (count: number) => void;
  onVisitBookedDateChange: (datetime: string | undefined) => void;
  showLabel?: boolean;
}

export function ContactStatusCell({
  status,
  attempts,
  visitBookedDate,
  onStatusChange,
  onAttemptsChange,
  onVisitBookedDateChange,
  showLabel = false,
}: ContactStatusCellProps) {
  const config = STATUS_CONFIG[status];
  const currentOrder = config.order;

  const availableStatuses = Object.entries(STATUS_CONFIG).filter(
    ([, cfg]) => cfg.order >= currentOrder
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onVisitBookedDateChange(undefined);
      return;
    }
    const existingTime = visitBookedDate ? visitBookedDate.substring(11, 16) : '10:00';
    const dateStr = format(date, 'yyyy-MM-dd');
    onVisitBookedDateChange(`${dateStr}T${existingTime}`);
  };

  const handleTimeChange = (time: string) => {
    const dateStr = visitBookedDate ? visitBookedDate.substring(0, 10) : format(new Date(), 'yyyy-MM-dd');
    onVisitBookedDateChange(`${dateStr}T${time}`);
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {showLabel && <span className="text-xs text-muted-foreground">Kontakt:</span>}
      <Select value={status} onValueChange={(v) => onStatusChange(v as ContactStatus)}>
        <SelectTrigger
          className={cn(
            badgeVariants({ variant: config.variant }),
            'h-7 w-auto min-w-[100px] py-0 border'
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {availableStatuses.map(([key, cfg]) => (
            <SelectItem key={key} value={key}>
              {cfg.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {status === 'not_reached' && (
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => onAttemptsChange(Math.max(1, attempts - 1))}
            disabled={attempts <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-xs font-medium min-w-[4ch] text-center">{attempts} ggr</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => onAttemptsChange(attempts + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      )}

      {status === 'visit_booked' && (
        <div className="flex items-center gap-1">
          <DatePicker
            value={visitBookedDate ? parseISO(visitBookedDate) : undefined}
            onChange={handleDateSelect}
            dateFormat="d MMM"
            locale={sv}
            placeholder="Datum"
            className="h-7 w-auto px-2.5 text-xs"
          />
          <input
            type="time"
            className="h-7 px-2 text-xs border rounded-md bg-background"
            value={visitBookedDate ? visitBookedDate.substring(11, 16) : '10:00'}
            onChange={(e) => handleTimeChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

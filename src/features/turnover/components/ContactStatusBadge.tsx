import { ContactStatus } from '../types/move-in-list-types';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

const STATUS_CONFIG: Record<ContactStatus, { label: string; className: string }> = {
  not_contacted: { label: 'Ej kontaktad', className: 'bg-muted text-muted-foreground' },
  not_reached: { label: 'Ej nådd', className: 'bg-amber-100 text-amber-800' },
  visit_booked: { label: 'Besök bokat', className: 'bg-sky-100 text-sky-800' },
  visit_done: { label: 'Besök genomfört', className: 'bg-emerald-100 text-emerald-800' },
};

interface ContactStatusBadgeProps {
  status: ContactStatus;
  attempts: number;
  visitBookedDate?: string;
  showLabel?: boolean;
}

export function ContactStatusBadge({ status, attempts, visitBookedDate, showLabel = false }: ContactStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex items-center gap-1.5">
      {showLabel && <span className="text-xs text-muted-foreground">Kontakt:</span>}
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
          config.className
        )}
      >
        {config.label}
        {status === 'not_reached' && attempts > 0 && (
          <span className="font-normal">{attempts} ggr</span>
        )}
        {status === 'visit_booked' && visitBookedDate && (
          <span className="font-normal">
            {format(parseISO(visitBookedDate), 'd MMM HH:mm', { locale: sv })}
          </span>
        )}
      </span>
    </div>
  );
}

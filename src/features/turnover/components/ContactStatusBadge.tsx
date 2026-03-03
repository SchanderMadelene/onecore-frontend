import { ContactStatus } from '../types/move-in-list-types';
import { Badge } from '@/shared/ui/badge';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

const STATUS_CONFIG: Record<ContactStatus, { label: string; variant: 'status-neutral' | 'status-info' | 'status-success' | 'status-warning' }> = {
  not_contacted: { label: 'Ej kontaktad', variant: 'status-neutral' },
  not_reached: { label: 'Ej nådd', variant: 'status-warning' },
  visit_booked: { label: 'Besök bokat', variant: 'status-info' },
  visit_done: { label: 'Besök genomfört', variant: 'status-success' },
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
      <Badge variant={config.variant} className="gap-1.5">
        {config.label}
        {status === 'not_reached' && attempts > 0 && (
          <span className="font-normal">{attempts} ggr</span>
        )}
        {status === 'visit_booked' && visitBookedDate && (
          <span className="font-normal">
            {format(parseISO(visitBookedDate), 'd MMM HH:mm', { locale: sv })}
          </span>
        )}
      </Badge>
    </div>
  );
}

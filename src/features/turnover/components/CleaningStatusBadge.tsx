import { CleaningStatus } from '../types/move-in-list-types';
import { Badge } from '@/shared/ui/badge';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

const STATUS_CONFIG: Record<CleaningStatus, { label: string; variant: 'muted' | 'info' | 'success' | 'warning' }> = {
  not_done: { label: 'Ej utförd', variant: 'muted' },
  booked: { label: 'Bokad', variant: 'info' },
  approved: { label: 'Godkänd', variant: 'success' },
  reinspection: { label: 'Omkontroll', variant: 'warning' },
};

interface CleaningStatusBadgeProps {
  status: CleaningStatus;
  bookedDate?: string;
  approvedDate?: string;
  showLabel?: boolean;
}

export function CleaningStatusBadge({ status, bookedDate, approvedDate, showLabel = false }: CleaningStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const showDate = (status === 'booked' || status === 'reinspection') && bookedDate;
  const showApproved = status === 'approved' && approvedDate;

  return (
    <div className="flex items-center gap-1.5">
      {showLabel && <span className="text-xs text-muted-foreground">Städ:</span>}
      <Badge variant={config.variant} className="gap-1.5">
        {config.label}
        {showDate && (
          <span className="font-normal">
            {format(parseISO(bookedDate!), 'd MMM', { locale: sv })}
            {bookedDate!.includes('T') && ` ${bookedDate!.split('T')[1]?.substring(0, 5)}`}
          </span>
        )}
        {showApproved && (
          <span className="font-normal">{format(parseISO(approvedDate!), 'd MMM', { locale: sv })}</span>
        )}
      </Badge>
    </div>
  );
}

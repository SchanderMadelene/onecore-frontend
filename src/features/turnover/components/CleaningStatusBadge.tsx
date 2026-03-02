import { CleaningStatus } from '../types/move-in-list-types';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

const STATUS_CONFIG: Record<CleaningStatus, { label: string; className: string }> = {
  not_done: { label: 'Ej utförd', className: 'bg-muted text-muted-foreground' },
  booked: { label: 'Bokad', className: 'bg-sky-100 text-sky-800' },
  approved: { label: 'Godkänd', className: 'bg-emerald-100 text-emerald-800' },
  reinspection: { label: 'Omkontroll', className: 'bg-amber-100 text-amber-800' },
};

interface CleaningStatusBadgeProps {
  status: CleaningStatus;
  bookedDate?: string;
  approvedDate?: string;
  onClick: () => void;
  showLabel?: boolean;
}

export function CleaningStatusBadge({ status, bookedDate, approvedDate, onClick, showLabel = false }: CleaningStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const showDate = (status === 'booked' || status === 'reinspection') && bookedDate;
  const showApproved = status === 'approved' && approvedDate;

  return (
    <div className="flex items-center gap-1.5">
      {showLabel && <span className="text-xs text-muted-foreground">Städ:</span>}
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity',
          config.className
        )}
      >
        {config.label}
        {showDate && (
          <span className="font-normal">{format(parseISO(bookedDate!), 'd MMM', { locale: sv })}</span>
        )}
        {showApproved && (
          <span className="font-normal">{format(parseISO(approvedDate!), 'd MMM', { locale: sv })}</span>
        )}
      </button>
    </div>
  );
}

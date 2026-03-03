import { cn } from '@/lib/utils';

interface KeysHandledBadgeProps {
  handled: boolean;
}

export function KeysHandledBadge({ handled }: KeysHandledBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        handled ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
      )}
    >
      {handled ? 'Ja' : 'Nej'}
    </span>
  );
}

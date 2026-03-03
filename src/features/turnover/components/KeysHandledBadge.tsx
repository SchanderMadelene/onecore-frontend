import { Badge } from '@/shared/ui/badge';

interface KeysHandledBadgeProps {
  handled: boolean;
}

export function KeysHandledBadge({ handled }: KeysHandledBadgeProps) {
  return (
    <Badge variant={handled ? 'status-success' : 'status-neutral'}>
      {handled ? 'Ja' : 'Nej'}
    </Badge>
  );
}

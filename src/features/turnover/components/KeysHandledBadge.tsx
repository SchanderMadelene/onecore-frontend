import { Badge } from '@/shared/ui/badge';

interface KeysHandledBadgeProps {
  handled: boolean;
}

export function KeysHandledBadge({ handled }: KeysHandledBadgeProps) {
  return (
    <Badge variant={handled ? 'success' : 'muted'}>
      {handled ? 'Ja' : 'Nej'}
    </Badge>
  );
}

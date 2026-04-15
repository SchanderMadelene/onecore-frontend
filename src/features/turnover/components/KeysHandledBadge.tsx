import { BooleanBadge } from './BooleanBadge';

interface KeysHandledBadgeProps {
  handled: boolean;
}

export function KeysHandledBadge({ handled }: KeysHandledBadgeProps) {
  return <BooleanBadge value={handled} />;
}

import { Badge } from '@/shared/ui/badge';
import { Check, Minus } from 'lucide-react';

interface BooleanBadgeProps {
  value: boolean;
}

export function BooleanBadge({ value }: BooleanBadgeProps) {
  return (
    <Badge variant={value ? 'success' : 'muted'} className="px-1.5">
      {value ? (
        <Check className="h-3 w-3" />
      ) : (
        <Minus className="h-3 w-3" />
      )}
    </Badge>
  );
}

import { Badge } from '@/shared/ui/badge';
import { Check, Minus } from 'lucide-react';

interface BooleanBadgeProps {
  value: boolean;
  trueLabel?: string;
  falseLabel?: string;
}

export function BooleanBadge({ value, trueLabel = 'Ja', falseLabel = 'Nej' }: BooleanBadgeProps) {
  return (
    <Badge variant={value ? 'success' : 'muted'} className="gap-1">
      {value ? (
        <Check className="h-3 w-3" />
      ) : (
        <Minus className="h-3 w-3" />
      )}
      {value ? trueLabel : falseLabel}
    </Badge>
  );
}

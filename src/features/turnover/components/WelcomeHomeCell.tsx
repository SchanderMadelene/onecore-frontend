import { WelcomeHomeMethod } from '../types/move-in-list-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { cn } from '@/lib/utils';
import { badgeVariants } from '@/shared/ui/badge';

const METHOD_CONFIG: Record<WelcomeHomeMethod, { label: string; variant: 'status-neutral' | 'status-info'; extraClass?: string }> = {
  none: { label: '–', variant: 'status-neutral' },
  digital: { label: 'Digital', variant: 'status-info' },
  manual: { label: 'Manuell', variant: 'status-info', extraClass: 'bg-violet-100 text-violet-800 border-violet-200' },
};

interface WelcomeHomeCellProps {
  value: WelcomeHomeMethod;
  onChange: (value: WelcomeHomeMethod) => void;
  showLabel?: boolean;
}

export function WelcomeHomeCell({ value, onChange, showLabel = false }: WelcomeHomeCellProps) {
  const config = METHOD_CONFIG[value];

  return (
    <div className="flex items-center gap-1.5">
      {showLabel && <span className="text-xs text-muted-foreground">Välkommen hem:</span>}
      <Select value={value} onValueChange={(v) => onChange(v as WelcomeHomeMethod)}>
        <SelectTrigger
          className={cn(
            badgeVariants({ variant: config.variant }),
            'h-7 w-auto min-w-[80px] py-0 border',
            config.extraClass
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(METHOD_CONFIG).map(([key, cfg]) => (
            <SelectItem key={key} value={key}>
              {cfg.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

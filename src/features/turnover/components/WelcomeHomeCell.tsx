import { WelcomeHomeMethod } from '../types/move-in-list-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { cn } from '@/lib/utils';

const METHOD_CONFIG: Record<WelcomeHomeMethod, { label: string; className: string }> = {
  none: { label: '–', className: 'bg-muted text-muted-foreground border-muted' },
  digital: { label: 'Digital', className: 'bg-sky-100 text-sky-800 border-sky-200' },
  manual: { label: 'Manuell', className: 'bg-violet-100 text-violet-800 border-violet-200' },
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
            'h-7 w-auto min-w-[80px] rounded-full px-2.5 py-0 text-xs font-medium border',
            config.className
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

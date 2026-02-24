import { TriangleAlert } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SecurityWarningIconProps {
  show?: boolean;
}

export function SecurityWarningIcon({ show }: SecurityWarningIconProps) {
  if (!show) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center justify-center w-5 h-5 bg-amber-100 rounded-full border border-amber-200">
            <TriangleAlert className="h-3 w-3 text-amber-600" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Åk aldrig ensam till kund. Ta alltid med dig en kollega vid hembesök.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

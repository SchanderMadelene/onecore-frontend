import { ShieldAlert } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  protectedIdentityLevelLabels,
  type ProtectedIdentity,
} from "./types";

interface ProtectedIdentityBadgeProps {
  protectedIdentity?: ProtectedIdentity;
  /** Kortare variant utan text, bara ikon – för täta listor */
  compact?: boolean;
  className?: string;
}

/**
 * Konsekvent badge för skyddad identitet. Placeras alltid direkt efter namn/titel.
 * Använder warning-soft-färgerna så den läser av som "viktig statusmarkering"
 * utan att konkurrera med röda destruktiva varningar.
 */
export function ProtectedIdentityBadge({
  protectedIdentity,
  compact = false,
  className,
}: ProtectedIdentityBadgeProps) {
  if (!protectedIdentity) return null;

  const levelLabel = protectedIdentityLevelLabels[protectedIdentity.level];

  const badge = (
    <Badge
      variant="warning"
      className={cn(
        "gap-1 whitespace-nowrap",
        compact && "px-1.5",
        className,
      )}
    >
      <ShieldAlert className="h-3 w-3" aria-hidden />
      {!compact && <span>Skyddad identitet</span>}
    </Badge>
  );

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">{badge}</span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{levelLabel}</p>
            <p className="text-xs text-muted-foreground">
              Visa inte personuppgifter, adress eller telefon för obehöriga.
              Kontakta inte via vanlig post – använd Skatteverkets förmedling.
            </p>
            {protectedIdentity.note && (
              <p className="text-xs italic">{protectedIdentity.note}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

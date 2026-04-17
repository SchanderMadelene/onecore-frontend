import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PublishActionBarSecondary {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

interface PublishActionBarProps {
  primaryAction: { label: string; onClick: () => void; disabled?: boolean };
  secondaryActions?: PublishActionBarSecondary[];
  status?: ReactNode;
  className?: string;
}

/**
 * Sticky bottom action-bar för publiceringsflöden.
 * Status visas till vänster, primär CTA + valfri overflow-meny till höger.
 */
export function PublishActionBar({
  primaryAction,
  secondaryActions = [],
  status,
  className,
}: PublishActionBarProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 right-0 z-30 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        "px-4 py-3 sm:px-6",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 max-w-6xl mx-auto">
        <div className="text-sm text-muted-foreground truncate">{status}</div>
        <div className="flex items-center gap-2 shrink-0">
          {secondaryActions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Fler åtgärder">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {secondaryActions.map((a) => (
                  <DropdownMenuItem
                    key={a.label}
                    onClick={a.onClick}
                    className={a.destructive ? "text-destructive focus:text-destructive" : ""}
                  >
                    {a.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button onClick={primaryAction.onClick} disabled={primaryAction.disabled}>
            {primaryAction.label}
          </Button>
        </div>
      </div>
    </div>
  );
}

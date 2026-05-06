import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, X, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/shared/hooks/use-mobile";

interface BulkActionBarProps {
  selectedCount: number;
  onSendSms: () => void;
  onSendEmail: () => void;
  onClear: () => void;
  onEditOffer?: () => void;
  editOfferLabel?: string;
  className?: string;
}

export function BulkActionBar({
  selectedCount,
  onSendSms,
  onSendEmail,
  onClear,
  onEditOffer,
  editOfferLabel = "Ändra/uppdatera erbjudande",
  className
}: BulkActionBarProps) {
  const isMobile = useIsMobile();

  if (selectedCount === 0) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg",
      "animate-in slide-in-from-bottom-2 duration-200",
      className
    )}>
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <div
          className={cn(
            "flex justify-between",
            isMobile ? "flex-col items-stretch gap-3" : "flex-row items-center gap-4"
          )}
        >
          <div
            className={cn(
              "flex gap-2",
              isMobile ? "w-full items-start justify-between" : "items-center"
            )}
          >
            <span className="text-sm font-medium leading-tight">
              {selectedCount} {selectedCount === 1 ? "kund vald" : "kunder valda"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-8 px-2 shrink-0"
            >
              <X className="h-4 w-4 mr-1" />
              Rensa
            </Button>
          </div>

          <div className={cn("flex items-center gap-2", isMobile && "w-full")}>
            {onEditOffer && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEditOffer}
                className={cn("h-9", isMobile ? "flex-1" : "flex-none")}
              >
                <Pencil className="h-4 w-4 mr-2" />
                {editOfferLabel}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onSendSms}
              className={cn("h-9", isMobile ? "flex-1" : "flex-none")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Skicka SMS
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSendEmail}
              className={cn("h-9", isMobile ? "flex-1" : "flex-none")}
            >
              <Mail className="h-4 w-4 mr-2" />
              Skicka mejl
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


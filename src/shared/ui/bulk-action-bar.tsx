import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BulkActionBarProps {
  selectedCount: number;
  onSendSms: () => void;
  onSendEmail: () => void;
  onClear: () => void;
  className?: string;
}

export function BulkActionBar({
  selectedCount,
  onSendSms,
  onSendEmail,
  onClear,
  className
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg",
      "animate-in slide-in-from-bottom-2 duration-200",
      className
    )}>
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedCount} {selectedCount === 1 ? "kund vald" : "kunder valda"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-8 px-2"
            >
              <X className="h-4 w-4 mr-1" />
              Rensa
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSendSms}
              className="h-9"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Skicka SMS
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onSendEmail}
              className="h-9"
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

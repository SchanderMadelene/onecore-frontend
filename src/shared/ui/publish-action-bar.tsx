import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/shared/hooks/use-mobile";

interface PublishActionBarProps {
  selectedCount: number;
  onPublish: () => void;
  onClear: () => void;
  className?: string;
}

export function PublishActionBar({
  selectedCount,
  onPublish,
  onClear,
  className
}: PublishActionBarProps) {
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
              {selectedCount} {selectedCount === 1 ? "annons vald" : "annonser valda"}
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
            <Button
              variant="default"
              size="sm"
              onClick={onPublish}
              className={cn("h-9", isMobile ? "flex-1" : "flex-none")}
            >
              <Send className="h-4 w-4 mr-2" />
              Publicera
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

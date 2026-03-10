import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ClearFiltersButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function ClearFiltersButton({
  onClick,
  label = "Rensa filter",
  className,
}: ClearFiltersButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn("gap-1", className)}
    >
      <X className="h-4 w-4" />
      {label}
    </Button>
  );
}

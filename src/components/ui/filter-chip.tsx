
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const filterChipVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground",
        selected:
          "border-primary bg-primary/10 text-primary hover:bg-primary/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface FilterChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof filterChipVariants> {
  selected?: boolean;
  onSelect?: () => void;
}

export function FilterChip({
  className,
  variant,
  selected,
  onSelect,
  ...props
}: FilterChipProps) {
  return (
    <div
      className={cn(
        filterChipVariants({ 
          variant: selected ? "selected" : "default" 
        }), 
        className
      )}
      onClick={onSelect}
      {...props}
    />
  );
}

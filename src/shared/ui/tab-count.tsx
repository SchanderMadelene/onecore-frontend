import * as React from "react";
import { cn } from "@/lib/utils";

interface TabCountProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number | string;
  /**
   * Color variant when the parent TabsTrigger is INACTIVE.
   * - "muted": soft amber circle (default — matches "needs attention" style)
   * - "neutral": soft neutral circle
   * When the parent TabsTrigger is active, the badge becomes dark/filled regardless of variant.
   */
  variant?: "muted" | "neutral";
  hideWhenZero?: boolean;
}

/**
 * Circular counter rendered inside a TabsTrigger.
 *
 * IMPORTANT: The parent TabsTrigger must include the `group` class so the
 * counter can react to `data-state=active`.
 *
 * Example:
 * ```tsx
 * <TabsTrigger value="x" className="group gap-2">
 *   Label
 *   <TabCount count={count} />
 * </TabsTrigger>
 * ```
 */
export const TabCount = React.forwardRef<HTMLSpanElement, TabCountProps>(
  ({ count, variant = "muted", hideWhenZero = true, className, ...props }, ref) => {
    const numeric = typeof count === "number" ? count : Number(count);
    if (hideWhenZero && !Number.isNaN(numeric) && numeric <= 0) return null;

    const inactive =
      variant === "muted"
        ? "bg-warning/30 text-warning-foreground"
        : "bg-foreground/15 text-foreground";

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-medium leading-none transition-colors",
          inactive,
          "group-data-[state=active]:bg-foreground group-data-[state=active]:text-background",
          className
        )}
        {...props}
      >
        {count}
      </span>
    );
  }
);
TabCount.displayName = "TabCount";

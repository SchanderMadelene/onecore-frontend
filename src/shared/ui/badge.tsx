
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border text-xs font-medium w-fit focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        success:
          "border-transparent bg-success-soft text-success-soft-foreground",
        outline:
          "text-foreground",
        muted:
          "border-transparent bg-muted text-muted-foreground",
        info:
          "border-transparent bg-info-soft text-info-soft-foreground",
        warning:
          "border-transparent bg-warning-soft text-warning-soft-foreground",
        purple:
          "border-transparent bg-purple-soft text-purple-soft-foreground",
      },
      size: {
        default: "px-2.5 py-1",
        icon: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

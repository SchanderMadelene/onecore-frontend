
import { type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  isPending?: boolean;
  pendingLabel?: string;
  error?: string | null;
  className?: string;
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = "Bekräfta",
  cancelLabel = "Avbryt",
  variant = "default",
  isPending = false,
  pendingLabel = "Bekräftar...",
  error,
  className,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild={typeof description !== "string"}>
            {typeof description === "string" ? description : <div>{description}</div>}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="text-center py-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className={cn(
              variant === "destructive" &&
                "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            )}
          >
            {isPending ? pendingLabel : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

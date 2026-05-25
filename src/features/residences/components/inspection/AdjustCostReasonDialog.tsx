import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AdjustCostReasonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  componentLabel: string;
  schablon: number;
  newAmount: number;
  existingReason?: string;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

const MIN_REASON_LENGTH = 10;

export function AdjustCostReasonDialog({
  open,
  onOpenChange,
  componentLabel,
  schablon,
  newAmount,
  existingReason,
  onConfirm,
  onCancel,
}: AdjustCostReasonDialogProps) {
  const [reason, setReason] = useState(existingReason ?? "");

  useEffect(() => {
    if (open) setReason(existingReason ?? "");
  }, [open, existingReason]);

  const diff = newAmount - schablon;
  const isValid = reason.trim().length >= MIN_REASON_LENGTH;

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    if (!isValid) return;
    onConfirm(reason.trim());
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onCancel();
        onOpenChange(next);
      }}
    >
      <DialogContent className="flex flex-col max-h-[90vh] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Motivera justering</DialogTitle>
          <DialogDescription>
            Du har ändrat kostnaden för {componentLabel}. Ange en motivering så att justeringen kan följas upp.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-2">
          <div className="rounded-md border bg-muted/40 p-3 space-y-1.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Schablon</span>
              <span className="tabular-nums">{schablon.toLocaleString("sv-SE")} kr</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ny kostnad</span>
              <span className="font-semibold tabular-nums">{newAmount.toLocaleString("sv-SE")} kr</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t">
              <span className="text-muted-foreground">Differens</span>
              <span className={`tabular-nums ${diff > 0 ? "text-foreground" : "text-muted-foreground"}`}>
                {diff > 0 ? "+" : ""}
                {diff.toLocaleString("sv-SE")} kr
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adjust-cost-reason">Motivering</Label>
            <Textarea
              id="adjust-cost-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Beskriv varför kostnaden justerats…"
              rows={4}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Minst {MIN_REASON_LENGTH} tecken. {reason.trim().length}/{MIN_REASON_LENGTH}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t pt-4 mt-2">
          <Button variant="outline" onClick={handleCancel}>
            Avbryt
          </Button>
          <Button onClick={handleConfirm} disabled={!isValid}>
            Spara justering
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

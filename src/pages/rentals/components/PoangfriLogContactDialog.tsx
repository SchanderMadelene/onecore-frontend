import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CommunicationType,
  COMMUNICATION_TYPE_LABELS,
  PoangfriInterestStatus,
  POANGFRI_INTEREST_STATUS_LABELS,
} from "@/features/rentals/types/poangfri";

interface PoangfriLogContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interestName: string;
  currentStatus: PoangfriInterestStatus;
  onSubmit: (data: {
    type: CommunicationType;
    summary: string;
    newStatus: PoangfriInterestStatus;
  }) => void;
}

const TYPES: CommunicationType[] = ["phone", "sms", "email", "meeting", "note"];

export function PoangfriLogContactDialog({
  open,
  onOpenChange,
  interestName,
  currentStatus,
  onSubmit,
}: PoangfriLogContactDialogProps) {
  const [type, setType] = useState<CommunicationType>("phone");
  const [summary, setSummary] = useState("");
  const [newStatus, setNewStatus] = useState<PoangfriInterestStatus>(currentStatus);

  useEffect(() => {
    if (open) {
      setType("phone");
      setSummary("");
      setNewStatus(currentStatus === "new" ? "contacted" : currentStatus);
    }
  }, [open, currentStatus]);

  const canSubmit = summary.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col max-h-[90vh] sm:max-w-lg p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Logga kontakt – {interestName}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="space-y-2">
            <Label>Typ av kontakt</Label>
            <Select value={type} onValueChange={(v) => setType(v as CommunicationType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {COMMUNICATION_TYPE_LABELS[t]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Anteckning</Label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
              placeholder="Vad sas? Vad är nästa steg?"
            />
          </div>

          <div className="space-y-2">
            <Label>Uppdatera status</Label>
            <Select
              value={newStatus}
              onValueChange={(v) => setNewStatus(v as PoangfriInterestStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["new", "contacted", "accepted", "declined", "not_assigned"] as PoangfriInterestStatus[]).map(
                  (s) => (
                    <SelectItem key={s} value={s}>
                      {POANGFRI_INTEREST_STATUS_LABELS[s]}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button
            disabled={!canSubmit}
            onClick={() => {
              onSubmit({ type, summary: summary.trim(), newStatus });
              onOpenChange(false);
            }}
          >
            Spara
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

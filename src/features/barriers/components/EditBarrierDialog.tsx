import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Barrier } from "../types";

interface EditBarrierDialogProps {
  barrier: Barrier | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (barrier: Barrier) => void;
  focusEndDate?: boolean;
}

export function EditBarrierDialog({
  barrier,
  isOpen,
  onOpenChange,
  onSave,
  focusEndDate = false,
}: EditBarrierDialogProps) {
  const { toast } = useToast();
  
  const [reason, setReason] = useState(barrier?.reason || '');
  const [startDate, setStartDate] = useState<Date | undefined>(
    barrier?.startDate ? new Date(barrier.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    barrier?.endDate ? new Date(barrier.endDate) : undefined
  );
  const [notes, setNotes] = useState(barrier?.notes || '');

  // Reset form when barrier changes
  useEffect(() => {
    if (barrier) {
      setReason(barrier.reason);
      setStartDate(barrier.startDate ? new Date(barrier.startDate) : undefined);
      setEndDate(barrier.endDate ? new Date(barrier.endDate) : undefined);
      setNotes(barrier.notes || '');
    }
  }, [barrier]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason || !startDate) {
      toast({
        title: "Fel",
        description: "Anledning och startdatum måste anges",
        variant: "destructive"
      });
      return;
    }

    if (!barrier) return;

    const updatedBarrier: Barrier = {
      ...barrier,
      reason,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
      notes: notes || undefined,
    };

    onSave(updatedBarrier);
    
    toast({
      title: "Spärr uppdaterad",
      description: `Spärren för ${barrier.object} har uppdaterats`,
    });
    
    onOpenChange(false);
  };

  if (!barrier) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Redigera spärr - {barrier.object}</DialogTitle>
        </DialogHeader>

        <FormWrapper onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Object info (read-only) */}
            <div className="space-y-2">
              <Label>Objekt</Label>
              <Input value={barrier.object} disabled />
            </div>

            <div className="space-y-2">
              <Label>Adress</Label>
              <Input value={barrier.address} disabled />
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason">Orsak *</Label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ange orsak till spärr"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Startdatum *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : "Välj datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>
                  Slutdatum {focusEndDate && <span className="text-primary">(Fokus)</span>}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground",
                        focusEndDate && "border-primary ring-2 ring-primary/20"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : "Välj datum (valfritt)"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus={focusEndDate}
                      disabled={(date) => startDate ? date < startDate : false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Anteckningar</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tillägg information om spärren..."
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Avbryt
              </Button>
              <Button type="submit">Spara ändringar</Button>
            </div>
          </div>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from 'react';
import { ContactStatus } from '../types/move-in-list-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { CounterInput } from '@/shared/common/CounterInput';
import { DatePicker } from '@/shared/common/DatePicker';

const STATUS_CONFIG: Record<ContactStatus, { label: string; order: number }> = {
  not_contacted: { label: 'Ej kontaktad', order: 0 },
  not_reached: { label: 'Ej nådd', order: 1 },
  visit_booked: { label: 'Besök bokat', order: 2 },
  visit_done: { label: 'Besök genomfört', order: 3 },
};

interface ContactEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName: string;
  status: ContactStatus;
  attempts: number;
  visitBookedDate?: string;
  onStatusChange: (status: ContactStatus) => void;
  onAttemptsChange: (count: number) => void;
  onVisitBookedDateChange: (datetime: string | undefined) => void;
}

export function ContactEditDialog({
  open, onOpenChange, tenantName,
  status: initialStatus, attempts: initialAttempts, visitBookedDate: initialVisitDate,
  onStatusChange, onAttemptsChange, onVisitBookedDateChange,
}: ContactEditDialogProps) {
  const [status, setStatus] = useState(initialStatus);
  const [attempts, setAttempts] = useState(initialAttempts);
  const [visitDate, setVisitDate] = useState(initialVisitDate);
  const [visitTime, setVisitTime] = useState(initialVisitDate?.substring(11, 16) ?? '10:00');

  const handleOpenChange = (o: boolean) => {
    if (o) {
      setStatus(initialStatus);
      setAttempts(initialAttempts);
      setVisitDate(initialVisitDate);
      setVisitTime(initialVisitDate?.substring(11, 16) ?? '10:00');
    }
    onOpenChange(o);
  };

  const currentOrder = STATUS_CONFIG[initialStatus].order;
  const availableStatuses = Object.entries(STATUS_CONFIG).filter(([, cfg]) => cfg.order >= currentOrder);

  const handleSave = () => {
    onStatusChange(status);
    if (status === 'not_reached') {
      onAttemptsChange(attempts);
    }
    if (status === 'visit_booked') {
      const dateStr = visitDate?.substring(0, 10) ?? format(new Date(), 'yyyy-MM-dd');
      onVisitBookedDateChange(`${dateStr}T${visitTime}`);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Kontakt — {tenantName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v as ContactStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map(([key, cfg]) => (
                  <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {status === 'not_reached' && (
            <CounterInput
              label="Antal försök"
              value={attempts}
              onChange={setAttempts}
              min={1}
            />
          )}

          {status === 'visit_booked' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Datum</label>
                <DatePicker
                  value={visitDate ? parseISO(visitDate) : undefined}
                  onChange={(d) => {
                    if (d) setVisitDate(`${format(d, 'yyyy-MM-dd')}T${visitTime}`);
                    else setVisitDate(undefined);
                  }}
                  dateFormat="d MMMM yyyy"
                  locale={sv}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Klockslag</label>
                <div className="flex gap-2 items-center">
                  <Select value={visitTime.substring(0, 2)} onValueChange={(h) => setVisitTime(`${h}:${visitTime.substring(3, 5)}`)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Timme" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return <SelectItem key={hour} value={hour}>{hour}</SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                  <span className="text-muted-foreground font-medium">:</span>
                  <Select value={visitTime.substring(3, 5)} onValueChange={(m) => setVisitTime(`${visitTime.substring(0, 2)}:${m}`)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Minut" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const minute = (i * 5).toString().padStart(2, '0');
                        return <SelectItem key={minute} value={minute}>{minute}</SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Avbryt</Button>
          <Button onClick={handleSave}>Spara</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

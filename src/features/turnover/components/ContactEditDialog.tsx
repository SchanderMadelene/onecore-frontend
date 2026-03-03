import { useState } from 'react';
import { ContactStatus } from '../types/move-in-list-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Minus, Plus } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

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
            <div className="space-y-2">
              <label className="text-sm font-medium">Antal försök</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline" size="icon" className="h-8 w-8"
                  onClick={() => setAttempts(Math.max(1, attempts - 1))}
                  disabled={attempts <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[3ch] text-center">{attempts}</span>
                <Button
                  variant="outline" size="icon" className="h-8 w-8"
                  onClick={() => setAttempts(attempts + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {status === 'visit_booked' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Datum</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {visitDate
                        ? format(parseISO(visitDate), 'd MMMM yyyy', { locale: sv })
                        : 'Välj datum'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={visitDate ? parseISO(visitDate) : undefined}
                      onSelect={(d) => {
                        if (d) {
                          setVisitDate(`${format(d, 'yyyy-MM-dd')}T${visitTime}`);
                        } else {
                          setVisitDate(undefined);
                        }
                      }}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tid</label>
                <input
                  type="time"
                  className="h-9 w-full px-3 text-sm border rounded-md bg-background"
                  value={visitTime}
                  onChange={(e) => setVisitTime(e.target.value)}
                />
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

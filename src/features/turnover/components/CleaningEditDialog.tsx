import { useState } from 'react';
import { CleaningStatus } from '../types/move-in-list-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

const STATUS_CONFIG: Record<CleaningStatus, { label: string }> = {
  not_done: { label: 'Ej utförd' },
  booked: { label: 'Bokad' },
  approved: { label: 'Godkänd' },
  reinspection: { label: 'Omkontroll' },
};

interface CleaningEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName: string;
  status: CleaningStatus;
  bookedDate?: string;
  approvedDate?: string;
  onStatusChange: (status: CleaningStatus) => void;
  onBookedDateChange: (date: string | undefined) => void;
}

export function CleaningEditDialog({
  open, onOpenChange, tenantName,
  status: initialStatus, bookedDate: initialBookedDate, approvedDate,
  onStatusChange, onBookedDateChange,
}: CleaningEditDialogProps) {
  const [status, setStatus] = useState(initialStatus);
  const [bookedDate, setBookedDate] = useState(initialBookedDate);

  // Sync when dialog opens with new props
  const handleOpenChange = (o: boolean) => {
    if (o) {
      setStatus(initialStatus);
      setBookedDate(initialBookedDate);
    }
    onOpenChange(o);
  };

  const showDatePicker = status === 'booked' || status === 'reinspection';

  const handleSave = () => {
    onStatusChange(status);
    if (showDatePicker) {
      onBookedDateChange(bookedDate);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Städkontroll — {tenantName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v as CleaningStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                  <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showDatePicker && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Datum</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {bookedDate ? format(parseISO(bookedDate), 'd MMMM yyyy', { locale: sv }) : 'Välj datum'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={bookedDate ? parseISO(bookedDate) : undefined}
                    onSelect={(d) => setBookedDate(d ? format(d, 'yyyy-MM-dd') : undefined)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {status === 'approved' && approvedDate && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Godkänd</label>
              <p className="text-sm text-muted-foreground">
                {format(parseISO(approvedDate), 'd MMMM yyyy', { locale: sv })}
              </p>
            </div>
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

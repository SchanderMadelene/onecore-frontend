import { useState } from 'react';
import { CleaningStatus } from '../types/move-in-list-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/shared/ui/textarea';
import { Save } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { DatePicker } from '@/shared/common/DatePicker';
import { Separator } from '@/components/ui/separator';

const STATUS_CONFIG: Record<CleaningStatus, { label: string }> = {
  not_done: { label: 'Ej utförd' },
  booked: { label: 'Bokad' },
  approved: { label: 'Godkänd' },
  reinspection: { label: 'Omkontroll' },
};

interface MoveOutEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName: string;
  cleaningStatus: CleaningStatus;
  cleaningBookedDate?: string;
  cleaningApprovedDate?: string;
  keysHandled: boolean;
  onCleaningStatusChange: (status: CleaningStatus) => void;
  onCleaningBookedDateChange: (date: string | undefined) => void;
  onKeysHandledChange: (handled: boolean) => void;
  onAddNote: (content: string) => void;
}

export function MoveOutEditDialog({
  open, onOpenChange, tenantName,
  cleaningStatus: initialStatus, cleaningBookedDate: initialBookedDate, cleaningApprovedDate,
  keysHandled: initialKeysHandled,
  onCleaningStatusChange, onCleaningBookedDateChange, onKeysHandledChange, onAddNote,
}: MoveOutEditDialogProps) {
  const [status, setStatus] = useState(initialStatus);
  const [bookedDate, setBookedDate] = useState(initialBookedDate);
  const [keysHandled, setKeysHandled] = useState(initialKeysHandled);
  const [noteContent, setNoteContent] = useState('');

  const handleOpenChange = (o: boolean) => {
    if (o) {
      setStatus(initialStatus);
      setBookedDate(initialBookedDate);
      setKeysHandled(initialKeysHandled);
      setNoteContent('');
    }
    onOpenChange(o);
  };

  const showDatePicker = status === 'booked' || status === 'reinspection';

  const handleSave = () => {
    onCleaningStatusChange(status);
    if (showDatePicker) {
      onCleaningBookedDateChange(bookedDate);
    }
    onKeysHandledChange(keysHandled);
    if (noteContent.trim()) {
      onAddNote(noteContent.trim());
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Redigera utflytt — {tenantName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {/* Cleaning section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Städkontroll</label>
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
              <DatePicker
                value={bookedDate ? parseISO(bookedDate) : undefined}
                onChange={(d) => setBookedDate(d ? format(d, 'yyyy-MM-dd') : undefined)}
                dateFormat="d MMMM yyyy"
                locale={sv}
              />
            </div>
          )}

          {status === 'approved' && cleaningApprovedDate && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Godkänd</label>
              <p className="text-sm text-muted-foreground">
                {format(parseISO(cleaningApprovedDate), 'd MMMM yyyy', { locale: sv })}
              </p>
            </div>
          )}

          <Separator />

          {/* Keys */}
          <div className="flex items-center gap-2">
            <Checkbox checked={keysHandled} onCheckedChange={(v) => setKeysHandled(v === true)} id="keysHandled" />
            <label htmlFor="keysHandled" className="text-sm font-medium cursor-pointer">Nycklar inlämnade</label>
          </div>

          <Separator />

          {/* Note section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Notering</label>
            <Textarea
              placeholder="Skriv din notering här..."
              className="min-h-[80px]"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Avbryt</Button>
          <Button onClick={handleSave} className="flex items-center gap-1">
            <Save className="h-4 w-4" />
            Spara
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from 'react';
import { CleaningStatus } from '../types/move-in-list-types';
import { TurnoverNote } from '../types/turnover-note-types';
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
import { NotesList } from './NotesList';

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
  notes: TurnoverNote[];
  onCleaningStatusChange: (status: CleaningStatus) => void;
  onCleaningBookedDateChange: (date: string | undefined) => void;
  onKeysHandledChange: (handled: boolean) => void;
  onAddNote: (content: string, isImportant?: boolean) => void;
  onToggleImportant: (noteId: string) => void;
}

export function MoveOutEditDialog({
  open, onOpenChange, tenantName,
  cleaningStatus: initialStatus, cleaningBookedDate: initialBookedDate, cleaningApprovedDate,
  keysHandled: initialKeysHandled, notes,
  onCleaningStatusChange, onCleaningBookedDateChange, onKeysHandledChange, onAddNote, onToggleImportant,
}: MoveOutEditDialogProps) {
  const [status, setStatus] = useState(initialStatus);
  const [bookedDate, setBookedDate] = useState(initialBookedDate);
  const [bookedHour, setBookedHour] = useState(() => {
    if (initialBookedDate && initialBookedDate.includes('T')) {
      return initialBookedDate.split('T')[1]?.split(':')[0] || '09';
    }
    return '09';
  });
  const [bookedMinute, setBookedMinute] = useState(() => {
    if (initialBookedDate && initialBookedDate.includes('T')) {
      return initialBookedDate.split('T')[1]?.split(':')[1] || '00';
    }
    return '00';
  });
  const [keysHandled, setKeysHandled] = useState(initialKeysHandled);
  const [noteContent, setNoteContent] = useState('');
  const [noteImportant, setNoteImportant] = useState(false);

  const handleOpenChange = (o: boolean) => {
    if (o) {
      setStatus(initialStatus);
      setBookedDate(initialBookedDate);
      setBookedHour(initialBookedDate?.includes('T') ? initialBookedDate.split('T')[1]?.split(':')[0] || '09' : '09');
      setBookedMinute(initialBookedDate?.includes('T') ? initialBookedDate.split('T')[1]?.split(':')[1] || '00' : '00');
      setKeysHandled(initialKeysHandled);
      setNoteContent('');
      setNoteImportant(false);
    }
    onOpenChange(o);
  };

  const showDatePicker = status === 'booked' || status === 'reinspection';

  const handleSave = () => {
    onCleaningStatusChange(status);
    if (showDatePicker && bookedDate) {
      const dateOnly = bookedDate.split('T')[0] || bookedDate;
      onCleaningBookedDateChange(`${dateOnly}T${bookedHour}:${bookedMinute}`);
    } else if (showDatePicker) {
      onCleaningBookedDateChange(undefined);
    }
    onKeysHandledChange(keysHandled);
    if (noteContent.trim()) {
      onAddNote(noteContent.trim(), noteImportant);
    }
    setNoteContent('');
    setNoteImportant(false);
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
                value={bookedDate ? parseISO(bookedDate.split('T')[0]) : undefined}
                onChange={(d) => setBookedDate(d ? format(d, 'yyyy-MM-dd') : undefined)}
                dateFormat="d MMMM yyyy"
                locale={sv}
              />
            </div>
          )}

          {showDatePicker && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Klockslag</label>
              <div className="flex gap-2 items-center">
                <Select value={bookedHour} onValueChange={setBookedHour}>
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
                <Select value={bookedMinute} onValueChange={setBookedMinute}>
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
            <NotesList notes={notes} onToggleImportant={onToggleImportant} />
            <Textarea
              placeholder="Skriv din notering här..."
              className="min-h-[80px]"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <Checkbox
                checked={noteImportant}
                onCheckedChange={(v) => setNoteImportant(v === true)}
                id="moveOutNoteImportant"
              />
              <label htmlFor="moveOutNoteImportant" className="text-sm font-medium cursor-pointer">
                Markera som viktig
              </label>
            </div>
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

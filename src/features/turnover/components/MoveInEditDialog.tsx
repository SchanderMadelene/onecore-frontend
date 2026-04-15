import { useState } from 'react';
import { ContactStatus } from '../types/move-in-list-types';
import { TurnoverNote } from '../types/turnover-note-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/shared/ui/textarea';
import { Save } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { DatePicker } from '@/shared/common/DatePicker';
import { CounterInput } from '@/shared/common/CounterInput';
import { Separator } from '@/components/ui/separator';
import { NotesList } from './NotesList';

const CONTACT_STATUS_CONFIG: Record<ContactStatus, { label: string; order: number }> = {
  not_contacted: { label: 'Ej kontaktad', order: 0 },
  not_reached: { label: 'Ej nådd', order: 1 },
  visit_booked: { label: 'Besök bokat', order: 2 },
  visit_done: { label: 'Besök genomfört', order: 3 },
};

interface MoveInEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName: string;
  contactStatus: ContactStatus;
  contactAttempts: number;
  visitBookedDate?: string;
  nameAndIntercomDone: boolean;
  welcomeHomeDone: boolean;
  inspectionProtocolDone: boolean;
  keysHandled: boolean;
  hasQuickMoveIn: boolean;
  notes: TurnoverNote[];
  onContactStatusChange: (status: ContactStatus) => void;
  onContactAttemptsChange: (count: number) => void;
  onVisitBookedDateChange: (datetime: string | undefined) => void;
  onNameAndIntercomChange: (checked: boolean) => void;
  onWelcomeHomeChange: (done: boolean) => void;
  onInspectionProtocolChange: (done: boolean) => void;
  onKeysHandledChange: (handled: boolean) => void;
  onQuickMoveInChange: (value: boolean) => void;
  onAddNote: (content: string, isImportant?: boolean) => void;
  onToggleImportant: (noteId: string) => void;
}

export function MoveInEditDialog({
  open, onOpenChange, tenantName,
  contactStatus: initialStatus, contactAttempts: initialAttempts, visitBookedDate: initialVisitDate,
  nameAndIntercomDone: initialNamePort, welcomeHomeDone: initialWelcomeHome,
  inspectionProtocolDone: initialInspectionProtocol,
  keysHandled: initialKeysHandled,
  hasQuickMoveIn: initialQuickMoveIn, notes,
  onContactStatusChange, onContactAttemptsChange, onVisitBookedDateChange,
  onNameAndIntercomChange, onWelcomeHomeChange, onInspectionProtocolChange, onKeysHandledChange, onQuickMoveInChange, onAddNote, onToggleImportant,
}: MoveInEditDialogProps) {
  const [status, setStatus] = useState(initialStatus);
  const [attempts, setAttempts] = useState(initialAttempts);
  const [visitDate, setVisitDate] = useState(initialVisitDate);
  const [visitTime, setVisitTime] = useState(initialVisitDate?.substring(11, 16) ?? '10:00');
  const [namePort, setNamePort] = useState(initialNamePort);
  const [welcomeHome, setWelcomeHome] = useState(initialWelcomeHome);
  const [inspectionProtocol, setInspectionProtocol] = useState(initialInspectionProtocol);
  const [keysHandled, setKeysHandled] = useState(initialKeysHandled);
  const [quickMoveIn, setQuickMoveIn] = useState(initialQuickMoveIn);
  const [noteContent, setNoteContent] = useState('');
  const [noteImportant, setNoteImportant] = useState(false);

  const handleOpenChange = (o: boolean) => {
    if (o) {
      setStatus(initialStatus);
      setAttempts(initialAttempts);
      setVisitDate(initialVisitDate);
      setVisitTime(initialVisitDate?.substring(11, 16) ?? '10:00');
      setNamePort(initialNamePort);
      setWelcomeHome(initialWelcomeHome);
      setInspectionProtocol(initialInspectionProtocol);
      setKeysHandled(initialKeysHandled);
      setQuickMoveIn(initialQuickMoveIn);
      setNoteContent('');
      setNoteImportant(false);
    }
    onOpenChange(o);
  };

  const currentOrder = CONTACT_STATUS_CONFIG[initialStatus].order;
  const availableStatuses = Object.entries(CONTACT_STATUS_CONFIG).filter(([, cfg]) => cfg.order >= currentOrder);

  const handleSave = () => {
    onContactStatusChange(status);
    if (status === 'not_reached') {
      onContactAttemptsChange(attempts);
    }
    if (status === 'visit_booked') {
      const dateStr = visitDate?.substring(0, 10) ?? format(new Date(), 'yyyy-MM-dd');
      onVisitBookedDateChange(`${dateStr}T${visitTime}`);
    }
    onNameAndIntercomChange(namePort);
    onWelcomeHomeChange(welcomeHome);
    onInspectionProtocolChange(inspectionProtocol);
    onKeysHandledChange(keysHandled);
    onQuickMoveInChange(quickMoveIn);
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
          <DialogTitle>Redigera inflytt — {tenantName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {/* Contact section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Kontakt</label>
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
                <label className="text-sm font-medium">Tid</label>
                <input type="time" className="h-9 w-full px-3 text-sm border rounded-md bg-background" value={visitTime} onChange={(e) => setVisitTime(e.target.value)} />
              </div>
            </>
          )}

          <Separator />

          {/* Name/Port */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Namn/Port klart</label>
            <RadioGroup value={namePort ? 'ja' : 'nej'} onValueChange={(v) => setNamePort(v === 'ja')} className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value="ja" id="namePortYes" />
                <label htmlFor="namePortYes" className="text-sm cursor-pointer">Ja</label>
              </div>
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value="nej" id="namePortNo" />
                <label htmlFor="namePortNo" className="text-sm cursor-pointer">Nej</label>
              </div>
            </RadioGroup>
          </div>

          {/* Welcome home */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Välkommen hem</label>
            <RadioGroup value={welcomeHome ? 'ja' : 'nej'} onValueChange={(v) => setWelcomeHome(v === 'ja')} className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value="ja" id="welcomeHomeYes" />
                <label htmlFor="welcomeHomeYes" className="text-sm cursor-pointer">Ja</label>
              </div>
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value="nej" id="welcomeHomeNo" />
                <label htmlFor="welcomeHomeNo" className="text-sm cursor-pointer">Nej</label>
              </div>
            </RadioGroup>
          </div>

          {/* Inspection protocol */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Besiktningsprotokoll</label>
            <RadioGroup value={inspectionProtocol ? 'ja' : 'nej'} onValueChange={(v) => setInspectionProtocol(v === 'ja')} className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value="ja" id="inspProtYes" />
                <label htmlFor="inspProtYes" className="text-sm cursor-pointer">Ja</label>
              </div>
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value="nej" id="inspProtNo" />
                <label htmlFor="inspProtNo" className="text-sm cursor-pointer">Nej</label>
              </div>
            </RadioGroup>
          </div>

          {/* Keys */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Nycklar uthämtade</label>
            <RadioGroup value={keysHandled ? 'ja' : 'nej'} onValueChange={(v) => setKeysHandled(v === 'ja')} className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value="ja" id="keysYes" />
                <label htmlFor="keysYes" className="text-sm cursor-pointer">Ja</label>
              </div>
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value="nej" id="keysNo" />
                <label htmlFor="keysNo" className="text-sm cursor-pointer">Nej</label>
              </div>
            </RadioGroup>
          </div>

          {/* Quick move-in */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Snabb inflytt</label>
            <RadioGroup value={quickMoveIn ? 'ja' : 'nej'} onValueChange={(v) => setQuickMoveIn(v === 'ja')} className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value="ja" id="quickYes" />
                <label htmlFor="quickYes" className="text-sm cursor-pointer">Ja</label>
              </div>
              <div className="flex items-center gap-1.5">
                <RadioGroupItem value="nej" id="quickNo" />
                <label htmlFor="quickNo" className="text-sm cursor-pointer">Nej</label>
              </div>
            </RadioGroup>
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
                id="moveInNoteImportant"
              />
              <label htmlFor="moveInNoteImportant" className="text-sm font-medium cursor-pointer">
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
import { useState } from 'react';
import { ContactStatus, WelcomeHomeMethod } from '../types/move-in-list-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
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

const CONTACT_STATUS_CONFIG: Record<ContactStatus, { label: string; order: number }> = {
  not_contacted: { label: 'Ej kontaktad', order: 0 },
  not_reached: { label: 'Ej nådd', order: 1 },
  visit_booked: { label: 'Besök bokat', order: 2 },
  visit_done: { label: 'Besök genomfört', order: 3 },
};

const WELCOME_HOME_CONFIG: Record<WelcomeHomeMethod, string> = {
  none: '–',
  digital: 'Digital',
  manual: 'Manuell',
};

interface MoveInEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName: string;
  contactStatus: ContactStatus;
  contactAttempts: number;
  visitBookedDate?: string;
  nameAndIntercomDone: boolean;
  welcomeHomeMethod: WelcomeHomeMethod;
  keysHandled: boolean;
  hasQuickMoveIn: boolean;
  onContactStatusChange: (status: ContactStatus) => void;
  onContactAttemptsChange: (count: number) => void;
  onVisitBookedDateChange: (datetime: string | undefined) => void;
  onNameAndIntercomChange: (checked: boolean) => void;
  onWelcomeHomeChange: (method: WelcomeHomeMethod) => void;
  onKeysHandledChange: (handled: boolean) => void;
  onQuickMoveInChange: (value: boolean) => void;
  onAddNote: (content: string) => void;
}

export function MoveInEditDialog({
  open, onOpenChange, tenantName,
  contactStatus: initialStatus, contactAttempts: initialAttempts, visitBookedDate: initialVisitDate,
  nameAndIntercomDone: initialNamePort, welcomeHomeMethod: initialWelcome,
  keysHandled: initialKeysHandled,
  hasQuickMoveIn: initialQuickMoveIn,
  onContactStatusChange, onContactAttemptsChange, onVisitBookedDateChange,
  onNameAndIntercomChange, onWelcomeHomeChange, onKeysHandledChange, onQuickMoveInChange, onAddNote,
}: MoveInEditDialogProps) {
  const [status, setStatus] = useState(initialStatus);
  const [attempts, setAttempts] = useState(initialAttempts);
  const [visitDate, setVisitDate] = useState(initialVisitDate);
  const [visitTime, setVisitTime] = useState(initialVisitDate?.substring(11, 16) ?? '10:00');
  const [namePort, setNamePort] = useState(initialNamePort);
  const [welcomeHome, setWelcomeHome] = useState(initialWelcome);
  const [keysHandled, setKeysHandled] = useState(initialKeysHandled);
  const [quickMoveIn, setQuickMoveIn] = useState(initialQuickMoveIn);
  const [noteContent, setNoteContent] = useState('');

  const handleOpenChange = (o: boolean) => {
    if (o) {
      setStatus(initialStatus);
      setAttempts(initialAttempts);
      setVisitDate(initialVisitDate);
      setVisitTime(initialVisitDate?.substring(11, 16) ?? '10:00');
      setNamePort(initialNamePort);
      setWelcomeHome(initialWelcome);
      setKeysHandled(initialKeysHandled);
      setQuickMoveIn(initialQuickMoveIn);
      setNoteContent('');
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
    onKeysHandledChange(keysHandled);
    onQuickMoveInChange(quickMoveIn);
    if (noteContent.trim()) {
      onAddNote(noteContent.trim());
    }
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
          <div className="flex items-center gap-2">
            <Checkbox checked={namePort} onCheckedChange={(v) => setNamePort(v === true)} id="namePort" />
            <label htmlFor="namePort" className="text-sm font-medium cursor-pointer">Namn/Port klart</label>
          </div>

          {/* Welcome home */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Välkommen hem</label>
            <Select value={welcomeHome} onValueChange={(v) => setWelcomeHome(v as WelcomeHomeMethod)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(WELCOME_HOME_CONFIG).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Keys */}
          <div className="flex items-center gap-2">
            <Checkbox checked={keysHandled} onCheckedChange={(v) => setKeysHandled(v === true)} id="keysHandledIn" />
            <label htmlFor="keysHandledIn" className="text-sm font-medium cursor-pointer">Nycklar uthämtade</label>
          </div>

          {/* Quick move-in */}
          <div className="flex items-center gap-2">
            <Checkbox checked={quickMoveIn} onCheckedChange={(v) => setQuickMoveIn(v === true)} id="quickMoveIn" />
            <label htmlFor="quickMoveIn" className="text-sm font-medium cursor-pointer">Snabb inflytt</label>
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

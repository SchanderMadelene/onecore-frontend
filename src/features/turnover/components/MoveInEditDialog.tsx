import { useState } from 'react';
import { ContactStatus, WelcomeHomeMethod } from '../types/move-in-list-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/shared/ui/textarea';
import { CalendarIcon, Minus, Plus, Save } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
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
  onContactStatusChange: (status: ContactStatus) => void;
  onContactAttemptsChange: (count: number) => void;
  onVisitBookedDateChange: (datetime: string | undefined) => void;
  onNameAndIntercomChange: (checked: boolean) => void;
  onWelcomeHomeChange: (method: WelcomeHomeMethod) => void;
  onAddNote: (content: string) => void;
}

export function MoveInEditDialog({
  open, onOpenChange, tenantName,
  contactStatus: initialStatus, contactAttempts: initialAttempts, visitBookedDate: initialVisitDate,
  nameAndIntercomDone: initialNamePort, welcomeHomeMethod: initialWelcome,
  onContactStatusChange, onContactAttemptsChange, onVisitBookedDateChange,
  onNameAndIntercomChange, onWelcomeHomeChange, onAddNote,
}: MoveInEditDialogProps) {
  const [status, setStatus] = useState(initialStatus);
  const [attempts, setAttempts] = useState(initialAttempts);
  const [visitDate, setVisitDate] = useState(initialVisitDate);
  const [visitTime, setVisitTime] = useState(initialVisitDate?.substring(11, 16) ?? '10:00');
  const [namePort, setNamePort] = useState(initialNamePort);
  const [welcomeHome, setWelcomeHome] = useState(initialWelcome);
  const [noteContent, setNoteContent] = useState('');

  const handleOpenChange = (o: boolean) => {
    if (o) {
      setStatus(initialStatus);
      setAttempts(initialAttempts);
      setVisitDate(initialVisitDate);
      setVisitTime(initialVisitDate?.substring(11, 16) ?? '10:00');
      setNamePort(initialNamePort);
      setWelcomeHome(initialWelcome);
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Antal försök</label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAttempts(Math.max(1, attempts - 1))} disabled={attempts <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[3ch] text-center">{attempts}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAttempts(attempts + 1)}>
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
                      {visitDate ? format(parseISO(visitDate), 'd MMMM yyyy', { locale: sv }) : 'Välj datum'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={visitDate ? parseISO(visitDate) : undefined}
                      onSelect={(d) => {
                        if (d) setVisitDate(`${format(d, 'yyyy-MM-dd')}T${visitTime}`);
                        else setVisitDate(undefined);
                      }}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
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

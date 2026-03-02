import { useState } from 'react';
import { MoreHorizontal, StickyNote, SprayCan, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Textarea } from '@/shared/ui/textarea';
import { Save } from 'lucide-react';
import { CleaningEditDialog } from './CleaningEditDialog';
import { ContactEditDialog } from './ContactEditDialog';
import { CleaningStatus, ContactStatus } from '../types/move-in-list-types';

interface TurnoverRowActionsProps {
  moveOutName?: string;
  moveInName?: string;
  moveOutId?: string;
  moveInId?: string;
  onAddNote: (entryId: string, content: string) => void;
  // Cleaning (move-out)
  cleaningStatus?: CleaningStatus;
  cleaningBookedDate?: string;
  cleaningApprovedDate?: string;
  onCleaningStatusChange?: (status: CleaningStatus) => void;
  onCleaningBookedDateChange?: (date: string | undefined) => void;
  // Contact (move-in)
  contactStatus?: ContactStatus;
  contactAttempts?: number;
  visitBookedDate?: string;
  onContactStatusChange?: (status: ContactStatus) => void;
  onContactAttemptsChange?: (count: number) => void;
  onVisitBookedDateChange?: (datetime: string | undefined) => void;
}

type NoteTarget = { id: string; name: string } | null;
type DialogType = 'note' | 'cleaning' | 'contact' | null;

export function TurnoverRowActions({
  moveOutName,
  moveInName,
  moveOutId,
  moveInId,
  onAddNote,
  cleaningStatus,
  cleaningBookedDate,
  cleaningApprovedDate,
  onCleaningStatusChange,
  onCleaningBookedDateChange,
  contactStatus,
  contactAttempts,
  visitBookedDate,
  onContactStatusChange,
  onContactAttemptsChange,
  onVisitBookedDateChange,
}: TurnoverRowActionsProps) {
  const [noteTarget, setNoteTarget] = useState<NoteTarget>(null);
  const [content, setContent] = useState('');
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);

  const handleSave = () => {
    if (noteTarget && content.trim()) {
      onAddNote(noteTarget.id, content.trim());
      setContent('');
      setNoteTarget(null);
      setActiveDialog(null);
    }
  };

  const handleClose = () => {
    setContent('');
    setNoteTarget(null);
    setActiveDialog(null);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background border shadow-md">
          {/* Cleaning action (move-out) */}
          {moveOutId && onCleaningStatusChange && (
            <DropdownMenuItem onClick={() => setActiveDialog('cleaning')}>
              <SprayCan className="h-4 w-4 mr-2" />
              Städkontroll{moveOutName ? ` – ${moveOutName}` : ''}
            </DropdownMenuItem>
          )}
          {/* Contact action (move-in) */}
          {moveInId && onContactStatusChange && (
            <DropdownMenuItem onClick={() => setActiveDialog('contact')}>
              <Phone className="h-4 w-4 mr-2" />
              Kontakt{moveInName ? ` – ${moveInName}` : ''}
            </DropdownMenuItem>
          )}
          {/* Separator if we have both action types and notes */}
          {(moveOutId || moveInId) && (moveOutId && onCleaningStatusChange || moveInId && onContactStatusChange) && (
            <DropdownMenuSeparator />
          )}
          {/* Notes */}
          {moveOutId && (
            <DropdownMenuItem
              onClick={() => { setNoteTarget({ id: moveOutId, name: moveOutName ?? 'Utflytt' }); setActiveDialog('note'); }}
            >
              <StickyNote className="h-4 w-4 mr-2" />
              Notering utflytt{moveOutName ? ` – ${moveOutName}` : ''}
            </DropdownMenuItem>
          )}
          {moveInId && (
            <DropdownMenuItem
              onClick={() => { setNoteTarget({ id: moveInId, name: moveInName ?? 'Inflytt' }); setActiveDialog('note'); }}
            >
              <StickyNote className="h-4 w-4 mr-2" />
              Notering inflytt{moveInName ? ` – ${moveInName}` : ''}
            </DropdownMenuItem>
          )}
          {!moveOutId && !moveInId && (
            <DropdownMenuItem disabled>Inga åtgärder</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Note dialog */}
      <Dialog open={activeDialog === 'note' && !!noteTarget} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notering – {noteTarget?.name}</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Skriv din notering här..."
            className="min-h-[120px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>Avbryt</Button>
            <Button onClick={handleSave} disabled={!content.trim()} className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              Spara
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cleaning dialog */}
      {activeDialog === 'cleaning' && cleaningStatus !== undefined && onCleaningStatusChange && onCleaningBookedDateChange && (
        <CleaningEditDialog
          open
          onOpenChange={(o) => !o && setActiveDialog(null)}
          tenantName={moveOutName ?? 'Utflytt'}
          status={cleaningStatus}
          bookedDate={cleaningBookedDate}
          approvedDate={cleaningApprovedDate}
          onStatusChange={onCleaningStatusChange}
          onBookedDateChange={onCleaningBookedDateChange}
        />
      )}

      {/* Contact dialog */}
      {activeDialog === 'contact' && contactStatus !== undefined && onContactStatusChange && onContactAttemptsChange && onVisitBookedDateChange && (
        <ContactEditDialog
          open
          onOpenChange={(o) => !o && setActiveDialog(null)}
          tenantName={moveInName ?? 'Inflytt'}
          status={contactStatus}
          attempts={contactAttempts ?? 0}
          visitBookedDate={visitBookedDate}
          onStatusChange={onContactStatusChange}
          onAttemptsChange={onContactAttemptsChange}
          onVisitBookedDateChange={onVisitBookedDateChange}
        />
      )}
    </>
  );
}

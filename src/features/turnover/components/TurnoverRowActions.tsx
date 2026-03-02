import { useState } from 'react';
import { MoreHorizontal, StickyNote, SprayCan, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  entryId: string;
  tenantName: string;
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

type ActiveDialog = 'note' | 'cleaning' | 'contact' | null;

export function TurnoverRowActions({
  entryId,
  tenantName,
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
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);
  const [noteContent, setNoteContent] = useState('');

  const handleNoteSave = () => {
    if (noteContent.trim()) {
      onAddNote(entryId, noteContent.trim());
      setNoteContent('');
      setActiveDialog(null);
    }
  };

  const handleClose = () => {
    setNoteContent('');
    setActiveDialog(null);
  };

  const hasCleaning = onCleaningStatusChange !== undefined;
  const hasContact = onContactStatusChange !== undefined;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background border shadow-md">
          {hasCleaning && (
            <DropdownMenuItem onClick={() => setActiveDialog('cleaning')}>
              <SprayCan className="h-4 w-4 mr-2" />
              Städkontroll
            </DropdownMenuItem>
          )}
          {hasContact && (
            <DropdownMenuItem onClick={() => setActiveDialog('contact')}>
              <Phone className="h-4 w-4 mr-2" />
              Kontakt
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setActiveDialog('note')}>
            <StickyNote className="h-4 w-4 mr-2" />
            Notering
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Note dialog */}
      <Dialog open={activeDialog === 'note'} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notering — {tenantName}</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Skriv din notering här..."
            className="min-h-[120px]"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>Avbryt</Button>
            <Button onClick={handleNoteSave} disabled={!noteContent.trim()} className="flex items-center gap-1">
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
          tenantName={tenantName}
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
          tenantName={tenantName}
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

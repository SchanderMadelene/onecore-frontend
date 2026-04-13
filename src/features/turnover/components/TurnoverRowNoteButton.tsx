import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { TurnoverNote } from '../types/turnover-note-types';
import { TurnoverNoteIndicator } from './TurnoverNoteIndicator';
import { NotesList } from './NotesList';

interface TurnoverRowNoteButtonProps {
  entryId: string;
  notes: TurnoverNote[];
  onAddNote: (entryId: string, content: string, isImportant?: boolean) => void;
  onToggleImportant: (noteId: string) => void;
  label?: string;
}

export function TurnoverRowNoteButton({ entryId, notes, onAddNote, onToggleImportant, label = 'Notering' }: TurnoverRowNoteButtonProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const handleSave = () => {
    if (content.trim()) {
      onAddNote(entryId, content.trim(), isImportant);
      setContent('');
      setIsImportant(false);
    }
  };

  return (
    <>
      {notes.length > 0 ? (
        <div className="flex items-center gap-1">
          <TurnoverNoteIndicator notes={notes} />
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setOpen(true)} title="Lägg till notering">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setOpen(true)} title="Lägg till notering">
          <Pencil className="h-4 w-4" />
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <NotesList notes={notes} onToggleImportant={onToggleImportant} />
            <Textarea
              placeholder="Skriv en notering..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={isImportant}
                  onCheckedChange={(v) => setIsImportant(v === true)}
                  id="noteImportant"
                />
                <label htmlFor="noteImportant" className="text-sm font-medium cursor-pointer">
                  Markera som viktig
                </label>
              </div>
              <Button onClick={handleSave} disabled={!content.trim()}>Spara</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

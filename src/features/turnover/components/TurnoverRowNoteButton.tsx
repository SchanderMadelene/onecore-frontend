import { useState } from 'react';
import { StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { TurnoverNote } from '../types/turnover-note-types';
import { TurnoverNoteIndicator } from './TurnoverNoteIndicator';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface TurnoverRowNoteButtonProps {
  entryId: string;
  notes: TurnoverNote[];
  onAddNote: (entryId: string, content: string) => void;
  label?: string;
}

export function TurnoverRowNoteButton({ entryId, notes, onAddNote, label = 'Notering' }: TurnoverRowNoteButtonProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (content.trim()) {
      onAddNote(entryId, content.trim());
      setContent('');
    }
  };

  return (
    <>
      {notes.length > 0 ? (
        <div className="flex items-center gap-1">
          <TurnoverNoteIndicator notes={notes} />
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setOpen(true)} title="Lägg till notering">
            <StickyNote className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setOpen(true)} title="Lägg till notering">
          <StickyNote className="h-4 w-4" />
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {notes.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {notes.map((note) => (
                  <div key={note.id} className="text-sm border-l-2 border-muted-foreground/30 pl-2 py-1">
                    <p className="text-foreground">{note.content}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {note.createdBy} · {format(parseISO(note.createdAt), 'd MMM HH:mm', { locale: sv })}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <Textarea
              placeholder="Skriv en notering..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={!content.trim()}>Spara</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

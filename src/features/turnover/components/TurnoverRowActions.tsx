import { useState } from 'react';
import { MoreHorizontal, StickyNote } from 'lucide-react';
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

interface TurnoverRowActionsProps {
  moveOutName?: string;
  moveInName?: string;
  moveOutId?: string;
  moveInId?: string;
  onAddNote: (entryId: string, content: string) => void;
}

type NoteTarget = { id: string; name: string } | null;

export function TurnoverRowActions({
  moveOutName,
  moveInName,
  moveOutId,
  moveInId,
  onAddNote,
}: TurnoverRowActionsProps) {
  const [noteTarget, setNoteTarget] = useState<NoteTarget>(null);
  const [content, setContent] = useState('');

  const hasBoth = !!moveOutId && !!moveInId;

  const handleSave = () => {
    if (noteTarget && content.trim()) {
      onAddNote(noteTarget.id, content.trim());
      setContent('');
      setNoteTarget(null);
    }
  };

  const handleClose = () => {
    setContent('');
    setNoteTarget(null);
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
          {moveOutId && (
            <DropdownMenuItem
              onClick={() => setNoteTarget({ id: moveOutId, name: moveOutName ?? 'Utflytt' })}
            >
              <StickyNote className="h-4 w-4 mr-2" />
              Notering utflytt{moveOutName ? ` – ${moveOutName}` : ''}
            </DropdownMenuItem>
          )}
          {moveInId && (
            <DropdownMenuItem
              onClick={() => setNoteTarget({ id: moveInId, name: moveInName ?? 'Inflytt' })}
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

      <Dialog open={!!noteTarget} onOpenChange={(open) => !open && handleClose()}>
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
            <Button variant="outline" onClick={handleClose}>
              Avbryt
            </Button>
            <Button onClick={handleSave} disabled={!content.trim()} className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              Spara
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

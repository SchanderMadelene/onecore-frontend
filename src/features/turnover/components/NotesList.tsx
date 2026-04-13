import { TurnoverNote } from '../types/turnover-note-types';
import { Checkbox } from '@/components/ui/checkbox';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface NotesListProps {
  notes: TurnoverNote[];
  onToggleImportant: (noteId: string) => void;
}

export function NotesList({ notes, onToggleImportant }: NotesListProps) {
  if (notes.length === 0) return null;

  return (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`text-sm border-l-2 pl-2 py-1 ${
            note.isImportant
              ? 'border-destructive bg-destructive/5 rounded-r'
              : 'border-muted-foreground/30'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-foreground">{note.content}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {note.createdBy} · {format(parseISO(note.createdAt), 'd MMM HH:mm', { locale: sv })}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
              <Checkbox
                checked={note.isImportant}
                onCheckedChange={() => onToggleImportant(note.id)}
                id={`important-${note.id}`}
              />
              <label
                htmlFor={`important-${note.id}`}
                className="text-xs font-medium cursor-pointer text-muted-foreground"
              >
                Viktig
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

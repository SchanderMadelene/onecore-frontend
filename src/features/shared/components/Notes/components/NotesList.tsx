
import { NoteItem } from "./NoteItem";
import type { Note } from "../types";

interface NotesListProps {
  notes: Note[];
  emptyMessage: string;
  onTogglePin: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export function NotesList({ notes, emptyMessage, onTogglePin, onDeleteNote }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-6">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteItem 
          key={note.id}
          note={note}
          onTogglePin={onTogglePin}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
}

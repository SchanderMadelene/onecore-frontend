
import { Button } from "@/components/ui/button";
import { Pin, PinOff, Trash2 } from "lucide-react";
import type { Note } from "../types";

interface NoteItemProps {
  note: Note;
  onTogglePin: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteItem({ note, onTogglePin, onDelete }: NoteItemProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('sv-SE', options);
  };

  return (
    <div 
      className={`border rounded-md p-4 ${note.isPinned ? 'bg-amber-50 border-amber-200' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {note.isPinned && (
            <Pin className="h-4 w-4 text-amber-600" />
          )}
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">
              {formatDate(note.createdAt)} av {note.createdBy}
            </p>
            {note.category && (
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md mt-1 w-fit">
                {note.category}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-muted-foreground hover:text-amber-600"
            onClick={() => onTogglePin(note.id)}
            title={note.isPinned ? "Ta bort pin" : "Pinna notering"}
          >
            {note.isPinned ? (
              <PinOff className="h-4 w-4" />
            ) : (
              <Pin className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(note.id)}
            title="Ta bort notering"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm whitespace-pre-wrap">{note.content}</p>
    </div>
  );
}

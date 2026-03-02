import { StickyNote } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/ui/hover-card';
import { TurnoverNote } from '../types/turnover-note-types';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface TurnoverNoteIndicatorProps {
  notes: TurnoverNote[];
}

export function TurnoverNoteIndicator({ notes }: TurnoverNoteIndicatorProps) {
  if (notes.length === 0) {
    return <span className="inline-flex h-8 w-8" />;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md h-8 w-8 hover:bg-muted transition-colors">
          <StickyNote className="h-4 w-4 text-muted-foreground" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent align="end" className="w-72">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Noteringar ({notes.length})</h4>
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
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

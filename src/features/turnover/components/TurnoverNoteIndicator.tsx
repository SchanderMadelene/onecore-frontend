import { StickyNote } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/ui/hover-card';
import { TurnoverNote } from '../types/turnover-note-types';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface TurnoverNoteIndicatorProps {
  notes: TurnoverNote[];
}

export function TurnoverNoteIndicator({ notes }: TurnoverNoteIndicatorProps) {
  if (notes.length === 0) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors" title="Har noteringar">
          <span className="text-[10px] font-medium text-muted-foreground">{notes.length}</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-72">
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

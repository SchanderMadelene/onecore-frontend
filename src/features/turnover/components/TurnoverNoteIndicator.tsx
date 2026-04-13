import { StickyNote, AlertTriangle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/ui/hover-card';
import { Badge } from '@/shared/ui/badge';
import { TurnoverNote } from '../types/turnover-note-types';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface TurnoverNoteIndicatorProps {
  notes: TurnoverNote[];
}

export function TurnoverNoteIndicator({ notes }: TurnoverNoteIndicatorProps) {
  if (notes.length === 0) return null;

  const hasImportant = notes.some((n) => n.isImportant);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="inline-flex items-center justify-center" title="Har noteringar">
          <Badge
            variant={hasImportant ? 'warning' : 'muted'}
            size="icon"
          >
            {hasImportant ? (
              <AlertTriangle className="h-3 w-3" />
            ) : (
              <StickyNote className="h-3 w-3" />
            )}
          </Badge>
        </button>
      </HoverCardTrigger>
      <HoverCardContent align="start" className="w-72">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Noteringar ({notes.length})</h4>
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
                {note.isImportant && (
                  <span className="text-xs font-semibold text-destructive flex items-center gap-1 mb-0.5">
                    <AlertTriangle className="h-3 w-3" />
                    Viktig
                  </span>
                )}
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

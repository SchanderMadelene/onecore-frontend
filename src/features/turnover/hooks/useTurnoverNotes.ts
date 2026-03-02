import { useState, useCallback } from 'react';
import { TurnoverNote } from '../types/turnover-note-types';

export function useTurnoverNotes() {
  const [notes, setNotes] = useState<TurnoverNote[]>([]);

  const getNotesForEntry = useCallback(
    (entryId: string) => notes.filter((n) => n.entryId === entryId),
    [notes]
  );

  const addNote = useCallback((entryId: string, content: string) => {
    const note: TurnoverNote = {
      id: crypto.randomUUID(),
      entryId,
      content,
      createdAt: new Date().toISOString(),
      createdBy: 'Användare',
    };
    setNotes((prev) => [note, ...prev]);
  }, []);

  return { notes, getNotesForEntry, addNote };
}

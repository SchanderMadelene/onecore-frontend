import { useState, useCallback } from 'react';
import { TurnoverNote } from '../types/turnover-note-types';

export function useTurnoverNotes() {
  const [notes, setNotes] = useState<TurnoverNote[]>([]);

  const getNotesForEntry = useCallback(
    (entryId: string) => notes.filter((n) => n.entryId === entryId),
    [notes]
  );

  const addNote = useCallback((entryId: string, content: string, isImportant?: boolean) => {
    const note: TurnoverNote = {
      id: crypto.randomUUID(),
      entryId,
      content,
      createdAt: new Date().toISOString(),
      createdBy: 'Användare',
      isImportant: isImportant || false,
    };
    setNotes((prev) => [note, ...prev]);
  }, []);

  const toggleImportant = useCallback((noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, isImportant: !n.isImportant } : n))
    );
  }, []);

  return { notes, getNotesForEntry, addNote, toggleImportant };
}

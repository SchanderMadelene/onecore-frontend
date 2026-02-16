import { useState, useMemo } from 'react';
import { MoveInListEntry, MoveInListChecklist } from '../types/move-in-list-types';
import { mockMoveInListEntries } from '../data/mock-move-in-list';
import { parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export function useMoveInList() {
  // Default: 16:e i aktuell månad till 15:e i nästa
  const now = new Date();
  const defaultStart = new Date(now.getFullYear(), now.getMonth(), 16);
  const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 1, 15);

  const [startDate, setStartDate] = useState<Date>(defaultStart);
  const [endDate, setEndDate] = useState<Date>(defaultEnd);
  const [selectedKvvArea, setSelectedKvvArea] = useState<string>('all');
  const [entries, setEntries] = useState<MoveInListEntry[]>(mockMoveInListEntries);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const entryDate = parseISO(entry.date);
      const inRange = isWithinInterval(entryDate, {
        start: startOfDay(startDate),
        end: endOfDay(endDate),
      });
      if (!inRange) return false;

      if (selectedKvvArea !== 'all' && entry.kvvArea !== selectedKvvArea) return false;

      return true;
    });
  }, [entries, startDate, endDate, selectedKvvArea]);

  const moveOutEntries = filteredEntries.filter(e => e.type === 'move_out');
  const moveInEntries = filteredEntries.filter(e => e.type === 'move_in');

  const updateChecklist = (entryId: string, field: keyof MoveInListChecklist, value: boolean) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.id === entryId
          ? { ...entry, checklist: { ...entry.checklist, [field]: value } }
          : entry
      )
    );
  };

  const availableKvvAreas = useMemo(() => {
    return [...new Set(entries.map(e => e.kvvArea))].sort();
  }, [entries]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedKvvArea,
    setSelectedKvvArea,
    moveOutEntries,
    moveInEntries,
    updateChecklist,
    availableKvvAreas,
  };
}

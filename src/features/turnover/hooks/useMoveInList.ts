import { useState, useMemo } from 'react';
import { MoveInListEntry, MoveInListChecklist, MoveInListPeriod } from '../types/move-in-list-types';
import { mockMoveInListEntries } from '../data/mock-move-in-list';
import { generatePeriods, getCurrentPeriod } from '../data/periods';
import { parseISO, isWithinInterval } from 'date-fns';

export function useMoveInList() {
  const periods = useMemo(() => generatePeriods(12), []);
  const defaultPeriod = getCurrentPeriod(periods);

  const [selectedPeriod, setSelectedPeriod] = useState<string>(defaultPeriod?.startDate ?? periods[0]?.startDate ?? '');
  const [selectedKvvArea, setSelectedKvvArea] = useState<string>('all');
  const [entries, setEntries] = useState<MoveInListEntry[]>(mockMoveInListEntries);

  const activePeriod = periods.find(p => p.startDate === selectedPeriod);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      // Period filter
      if (activePeriod) {
        const entryDate = parseISO(entry.date);
        const inPeriod = isWithinInterval(entryDate, {
          start: parseISO(activePeriod.startDate),
          end: parseISO(activePeriod.endDate),
        });
        if (!inPeriod) return false;
      }

      // KVV filter
      if (selectedKvvArea !== 'all' && entry.kvvArea !== selectedKvvArea) return false;

      return true;
    });
  }, [entries, activePeriod, selectedKvvArea]);

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

  // Unika KVV-områden från datan
  const availableKvvAreas = useMemo(() => {
    return [...new Set(entries.map(e => e.kvvArea))].sort();
  }, [entries]);

  return {
    periods,
    selectedPeriod,
    setSelectedPeriod,
    selectedKvvArea,
    setSelectedKvvArea,
    moveOutEntries,
    moveInEntries,
    updateChecklist,
    availableKvvAreas,
  };
}

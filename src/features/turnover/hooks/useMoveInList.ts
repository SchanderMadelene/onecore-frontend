import { useState, useMemo } from 'react';
import { MoveInListEntry, MoveInListChecklist, TurnoverRow } from '../types/move-in-list-types';
import { mockMoveInListEntries } from '../data/mock-move-in-list';
import { parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export function useMoveInList() {
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

  const combinedEntries = useMemo<TurnoverRow[]>(() => {
    const map = new Map<string, TurnoverRow>();
    filteredEntries.forEach(entry => {
      const key = `${entry.address}|${entry.residenceCode}`;
      if (!map.has(key)) {
        map.set(key, {
          residenceKey: key,
          address: entry.address,
          residenceCode: entry.residenceCode,
          kvvArea: entry.kvvArea,
          apartmentType: entry.apartmentType,
        });
      }
      const row = map.get(key)!;
      if (entry.type === 'move_out') row.moveOut = entry;
      else row.moveIn = entry;
    });
    return [...map.values()].sort((a, b) => {
      const dateA = a.moveOut?.date ?? a.moveIn?.date ?? '';
      const dateB = b.moveOut?.date ?? b.moveIn?.date ?? '';
      return dateA.localeCompare(dateB);
    });
  }, [filteredEntries]);

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
    combinedEntries,
    updateChecklist,
    availableKvvAreas,
  };
}

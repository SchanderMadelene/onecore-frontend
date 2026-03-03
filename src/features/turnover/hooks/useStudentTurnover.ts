import { useState, useMemo } from 'react';
import { StudentTurnoverEntry, StudentTurnoverRow, CleaningStatus } from '../types/move-in-list-types';
import { mockStudentTurnoverEntries } from '../data/mock-student-turnover';
import { parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export function useStudentTurnover() {
  const now = new Date();
  const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 6, 0);

  const [startDate, setStartDate] = useState<Date>(defaultStart);
  const [endDate, setEndDate] = useState<Date>(defaultEnd);
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [entries, setEntries] = useState<StudentTurnoverEntry[]>(mockStudentTurnoverEntries);

  const availableProperties = useMemo(() => {
    return [...new Set(entries.map(e => e.propertyName))].sort();
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const entryDate = parseISO(entry.date);
      const inRange = isWithinInterval(entryDate, {
        start: startOfDay(startDate),
        end: endOfDay(endDate),
      });
      if (!inRange) return false;
      if (selectedProperty !== 'all' && entry.propertyName !== selectedProperty) return false;
      return true;
    });
  }, [entries, startDate, endDate, selectedProperty]);

  const combinedEntries = useMemo<StudentTurnoverRow[]>(() => {
    const map = new Map<string, StudentTurnoverRow>();
    filteredEntries.forEach(entry => {
      const key = `${entry.propertyName}|${entry.roomCode}`;
      if (!map.has(key)) {
        map.set(key, {
          roomKey: key,
          roomCode: entry.roomCode,
          propertyName: entry.propertyName,
          kvvArea: entry.kvvArea,
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

  const updateCleaningStatus = (entryId: string, status: CleaningStatus) => {
    setEntries(prev =>
      prev.map(entry => {
        if (entry.id !== entryId) return entry;
        const updated = { ...entry.cleaningChecklist, cleaningStatus: status };
        if (status === 'reinspection' && updated.cleaningCount === 0) {
          updated.cleaningCount = 1;
        }
        if (status === 'approved') {
          updated.cleaningApprovedDate = new Date().toISOString().split('T')[0];
        }
        return { ...entry, cleaningChecklist: updated };
      })
    );
  };

  const updateCleaningBookedDate = (entryId: string, date: string | undefined) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.id === entryId
          ? { ...entry, cleaningChecklist: { ...entry.cleaningChecklist, cleaningBookedDate: date } }
          : entry
      )
    );
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedProperty,
    setSelectedProperty,
    combinedEntries,
    availableProperties,
    updateCleaningStatus,
    updateCleaningBookedDate,
  };
}

import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MoveInListEntry, MoveInListChecklist, TurnoverRow } from '../types/move-in-list-types';
import { mockMoveInListEntries } from '../data/mock-move-in-list';
import { parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export function useMoveInList() {
  const [searchParams] = useSearchParams();
  const now = new Date();
  const defaultStart = new Date(now.getFullYear(), now.getMonth(), 16);
  const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 1, 15);

  const parseDate = (key: string, fallback: Date): Date => {
    const val = searchParams.get(key);
    if (val) {
      const d = new Date(val);
      if (!isNaN(d.getTime())) return d;
    }
    return fallback;
  };

  const [startDate, setStartDate] = useState<Date>(() => parseDate('startDate', defaultStart));
  const [endDate, setEndDate] = useState<Date>(() => parseDate('endDate', defaultEnd));
  const [selectedKvvArea, setSelectedKvvArea] = useState<string>(() => searchParams.get('kvvArea') || 'all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => searchParams.get('district') || 'all');
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
      if (selectedDistrict !== 'all') {
        const entryDistrict = getDistrictFromKvv(entry.kvvArea);
        if (entryDistrict !== selectedDistrict) return false;
      }
      return true;
    });
  }, [entries, startDate, endDate, selectedKvvArea, selectedDistrict]);

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

  const availableDistricts = useMemo(() => {
    return [...new Set(entries.map(e => getDistrictFromKvv(e.kvvArea)))].sort();
  }, [entries]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedKvvArea,
    setSelectedKvvArea,
    selectedDistrict,
    setSelectedDistrict,
    moveOutEntries,
    moveInEntries,
    combinedEntries,
    updateChecklist,
    availableKvvAreas,
    availableDistricts,
  };
}

const DISTRICT_MAP: Record<string, string> = {
  '611': 'Mimer Mitt',
  '612': 'Mimer Norr',
  '613': 'Mimer Öst',
  '614': 'Mimer Väst',
  '615': 'Mimer Student',
};

function getDistrictFromKvv(kvvArea: string): string {
  const prefix = kvvArea.substring(0, 3);
  return DISTRICT_MAP[prefix] ?? 'Okänt';
}

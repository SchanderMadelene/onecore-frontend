import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoveInListPeriod } from '../types/move-in-list-types';

interface MoveInListFiltersProps {
  periods: MoveInListPeriod[];
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
  kvvAreas: string[];
  selectedKvvArea: string;
  onKvvAreaChange: (value: string) => void;
}

export function MoveInListFilters({
  periods,
  selectedPeriod,
  onPeriodChange,
  kvvAreas,
  selectedKvvArea,
  onKvvAreaChange,
}: MoveInListFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <Select value={selectedPeriod} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          {periods.map(p => (
            <SelectItem key={p.startDate} value={p.startDate}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedKvvArea} onValueChange={onKvvAreaChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="KVV-område" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla KVV-områden</SelectItem>
          {kvvAreas.map(area => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

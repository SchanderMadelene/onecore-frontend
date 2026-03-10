import { sv } from 'date-fns/locale';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/shared/common/DatePicker';

interface MoveInListFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  kvvAreas: string[];
  selectedKvvArea: string;
  onKvvAreaChange: (value: string) => void;
  districts: string[];
  selectedDistrict: string;
  onDistrictChange: (value: string) => void;
}

export function MoveInListFilters({
  searchQuery,
  onSearchQueryChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  kvvAreas,
  selectedKvvArea,
  onKvvAreaChange,
  districts,
  selectedDistrict,
  onDistrictChange,
}: MoveInListFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Sök på adress, hyresgäst, lägenhetskod, kontraktsnummer..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <DatePicker
        value={startDate}
        onChange={(date) => date && onStartDateChange(date)}
        dateFormat="d MMM yyyy"
        locale={sv}
        className="w-full sm:w-[180px]"
      />

      <DatePicker
        value={endDate}
        onChange={(date) => date && onEndDateChange(date)}
        dateFormat="d MMM yyyy"
        locale={sv}
        className="w-full sm:w-[180px]"
      />

      <Select value={selectedDistrict} onValueChange={onDistrictChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Distrikt" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla distrikt</SelectItem>
          {districts.map(district => (
            <SelectItem key={district} value={district}>
              {district}
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
    </div>
  );
}

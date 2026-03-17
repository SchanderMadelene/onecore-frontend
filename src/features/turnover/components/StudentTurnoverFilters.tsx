import { sv } from 'date-fns/locale';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/shared/common';

interface StudentTurnoverFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  properties: string[];
  selectedProperty: string;
  onPropertyChange: (value: string) => void;
}

export function StudentTurnoverFilters({
  searchQuery,
  onSearchQueryChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  properties,
  selectedProperty,
  onPropertyChange,
}: StudentTurnoverFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Sök på rum, namn, e-post..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <DatePicker
          value={startDate}
          onChange={(d) => d && onStartDateChange(d)}
          dateFormat="d MMM yyyy"
          locale={sv}
          className="w-full sm:w-[180px]"
        />

        <DatePicker
          value={endDate}
          onChange={(d) => d && onEndDateChange(d)}
          dateFormat="d MMM yyyy"
          locale={sv}
          className="w-full sm:w-[180px]"
        />

        <Select value={selectedProperty} onValueChange={onPropertyChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Fastighet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla fastigheter</SelectItem>
            {properties.map(p => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

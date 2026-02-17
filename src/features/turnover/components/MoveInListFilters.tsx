import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MoveInListFiltersProps {
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
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full sm:w-[180px] justify-start text-left font-normal")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(startDate, 'd MMM yyyy', { locale: sv })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={(date) => date && onStartDateChange(date)}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full sm:w-[180px] justify-start text-left font-normal")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(endDate, 'd MMM yyyy', { locale: sv })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={(date) => date && onEndDateChange(date)}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>

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
  );
}

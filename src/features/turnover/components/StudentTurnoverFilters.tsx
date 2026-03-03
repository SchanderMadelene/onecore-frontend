import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { CalendarIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full sm:w-[180px] justify-start text-left font-normal")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(startDate, 'd MMM yyyy', { locale: sv })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={startDate} onSelect={(d) => d && onStartDateChange(d)} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full sm:w-[180px] justify-start text-left font-normal")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(endDate, 'd MMM yyyy', { locale: sv })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={endDate} onSelect={(d) => d && onEndDateChange(d)} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>

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

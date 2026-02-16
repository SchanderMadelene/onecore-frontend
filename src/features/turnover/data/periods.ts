import { MoveInListPeriod } from '../types/move-in-list-types';
import { format, addMonths, isWithinInterval, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

/**
 * Genererar perioder baserade på månadshalvor.
 * Varje period går från den 16:e i en månad till den 15:e i nästa.
 */
export function generatePeriods(count: number = 12): MoveInListPeriod[] {
  const periods: MoveInListPeriod[] = [];
  const now = new Date();
  
  // Börja 3 perioder bakåt
  let startMonth = new Date(now.getFullYear(), now.getMonth() - 3, 16);

  for (let i = 0; i < count; i++) {
    const start = new Date(startMonth.getFullYear(), startMonth.getMonth(), 16);
    const end = new Date(startMonth.getFullYear(), startMonth.getMonth() + 1, 15);

    const label = `${format(start, 'd/M', { locale: sv })}–${format(end, 'd/M', { locale: sv })} ${format(end, 'yyyy')}`;

    periods.push({
      label,
      startDate: format(start, 'yyyy-MM-dd'),
      endDate: format(end, 'yyyy-MM-dd'),
    });

    startMonth = addMonths(startMonth, 1);
  }

  return periods;
}

/**
 * Hittar den aktuella perioden baserat på dagens datum.
 */
export function getCurrentPeriod(periods: MoveInListPeriod[]): MoveInListPeriod | undefined {
  const now = new Date();
  return periods.find(p => 
    isWithinInterval(now, { start: parseISO(p.startDate), end: parseISO(p.endDate) })
  );
}

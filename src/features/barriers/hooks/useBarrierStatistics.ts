import { useMemo } from 'react';
import { subMonths, format, parseISO, isAfter, differenceInDays } from 'date-fns';
import { sv } from 'date-fns/locale';
import type { Barrier } from '../types/barrier';
import type { BarrierReasonCategory } from '@/entities/barrier/types';
import { BARRIER_REASON_CATEGORY_LABELS } from '@/entities/barrier/types';

interface CategoryDistribution {
  category: BarrierReasonCategory;
  label: string;
  count: number;
}

interface MonthlyTrend {
  month: string;
  vlu: number;
  flu: number;
  renovation: number;
  other: number;
}

interface BarrierStatisticsSummary {
  total: number;
  activeVlu: number;
  activeFlu: number;
  activeRenovations: number;
}

interface ActiveRenovation extends Barrier {
  daysSinceStart: number;
}

export function useBarrierStatistics(barriers: Barrier[]) {
  const summary = useMemo<BarrierStatisticsSummary>(() => {
    const active = barriers.filter(b => b.status === 'active');
    return {
      total: active.length,
      activeVlu: active.filter(b => b.reasonCategory === 'VLU').length,
      activeFlu: active.filter(b => b.reasonCategory === 'FLU').length,
      activeRenovations: active.filter(b => b.reasonCategory === 'renovation_before' || b.reasonCategory === 'renovation_after').length,
    };
  }, [barriers]);

  const categoryDistribution = useMemo<CategoryDistribution[]>(() => {
    const counts = new Map<BarrierReasonCategory, number>();
    barriers.forEach(b => {
      if (b.reasonCategory) {
        counts.set(b.reasonCategory, (counts.get(b.reasonCategory) || 0) + 1);
      }
    });
    return Array.from(counts.entries())
      .map(([category, count]) => ({
        category,
        label: BARRIER_REASON_CATEGORY_LABELS[category] || category,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [barriers]);

  const monthlyTrend = useMemo<MonthlyTrend[]>(() => {
    const now = new Date();
    const months: MonthlyTrend[] = [];
    for (let i = 11; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const key = format(monthDate, 'yyyy-MM');
      const label = format(monthDate, 'MMM yy', { locale: sv });
      months.push({ month: label, vlu: 0, flu: 0, renovation: 0, other: 0 });

      barriers.forEach(b => {
        const created = b.createdDate?.slice(0, 7);
        if (created === key && b.reasonCategory) {
          const entry = months[months.length - 1];
          if (b.reasonCategory === 'VLU') entry.vlu++;
          else if (b.reasonCategory === 'FLU') entry.flu++;
          else if (b.reasonCategory === 'renovation_before' || b.reasonCategory === 'renovation_after') entry.renovation++;
          else entry.other++;
        }
      });
    }
    return months;
  }, [barriers]);

  const vluToFluTransitions = useMemo(() => {
    return barriers
      .filter(b => b.reasonCategory === 'VLU' && b.status === 'expired')
      .map(b => ({
        ...b,
        leadTimeDays: b.endDate ? differenceInDays(parseISO(b.endDate), parseISO(b.startDate)) : undefined,
      }));
  }, [barriers]);

  const activeRenovations = useMemo<ActiveRenovation[]>(() => {
    const now = new Date();
    return barriers
      .filter(b => (b.reasonCategory === 'renovation_before' || b.reasonCategory === 'renovation_after') && b.status === 'active')
      .map(b => ({
        ...b,
        daysSinceStart: differenceInDays(now, parseISO(b.startDate)),
      }));
  }, [barriers]);

  return { summary, categoryDistribution, monthlyTrend, vluToFluTransitions, activeRenovations };
}

import { Card, CardContent } from '@/components/ui/card';
import { useBarrierStatistics } from '../hooks/useBarrierStatistics';
import { BarrierCategoryChart } from './BarrierCategoryChart';
import { BarrierMonthlyTrendChart } from './BarrierMonthlyTrendChart';
import { VluFluTransitionsTable } from './VluFluTransitionsTable';
import { RenovationTrackingTable } from './RenovationTrackingTable';
import { useFeatureToggles } from '@/contexts/FeatureTogglesContext';
import type { Barrier } from '../types/barrier';

interface Props {
  barriers: Barrier[];
}

export function BarrierStatisticsView({ barriers }: Props) {
  const { features } = useFeatureToggles();
  const { summary, categoryDistribution, monthlyTrend, vluToFluTransitions, activeRenovations } = useBarrierStatistics(barriers);

  if (!features.showBarrierStatistics) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Statistikvyn är inaktiverad. Aktivera den under Inställningar → Betafunktioner.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard label="Aktiva spärrar" value={summary.total} />
        <SummaryCard label="VLU (aktiva)" value={summary.activeVlu} />
        <SummaryCard label="FLU (aktiva)" value={summary.activeFlu} />
        <SummaryCard label="Renoveringar" value={summary.activeRenovations} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarrierCategoryChart data={categoryDistribution} />
        <BarrierMonthlyTrendChart data={monthlyTrend} />
      </div>

      {/* Tables */}
      <VluFluTransitionsTable transitions={vluToFluTransitions} />
      <RenovationTrackingTable renovations={activeRenovations} />
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="pt-6 pb-4 text-center">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </CardContent>
    </Card>
  );
}

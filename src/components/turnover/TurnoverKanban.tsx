import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TurnoverCase, TurnoverStep, TurnoverStatus, TURNOVER_STEP_LABELS } from "@/types/turnover";
import { TurnoverCaseCard } from "./TurnoverCaseCard";

interface TurnoverKanbanProps {
  cases: TurnoverCase[];
}

export function TurnoverKanban({ cases }: TurnoverKanbanProps) {
  // Group cases by current step
  const stepColumns = Object.values(TurnoverStep).map(step => {
    const stepCases = cases.filter(case_ => case_.currentStep === step);
    return {
      step,
      label: TURNOVER_STEP_LABELS[step],
      cases: stepCases,
      count: stepCases.length
    };
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Kanban-vy</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Totalt: {cases.length} ärenden</span>
        </div>
      </div>

      {/* Kanban board - horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {stepColumns.map(({ step, label, cases: stepCases, count }) => (
            <div key={step} className="flex-shrink-0 w-80">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{label}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                  {stepCases.length > 0 ? (
                    stepCases.map(case_ => (
                      <TurnoverCaseCard key={case_.id} case_={case_} compact />
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      Inga ärenden i detta steg
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Klar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Pågår</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>Väntar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Blockerad</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
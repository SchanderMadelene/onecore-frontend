import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TurnoverCase } from "@/types/turnover";
import { TurnoverCaseCard } from "./TurnoverCaseCard";

interface TurnoverListProps {
  cases: TurnoverCase[];
}

export function TurnoverList({ cases }: TurnoverListProps) {
  // Sort cases by priority and updated date
  const sortedCases = [...cases].sort((a, b) => {
    const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder];
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder];
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority; // Higher priority first
    }
    
    // If same priority, sort by updated date (most recent first)
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Alla ärenden</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Visar {cases.length} ärenden</span>
        </div>
      </div>

      {sortedCases.length > 0 ? (
        <div className="space-y-4">
          {sortedCases.map(case_ => (
            <TurnoverCaseCard key={case_.id} case_={case_} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              Inga ärenden matchar dina filterkriterier
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
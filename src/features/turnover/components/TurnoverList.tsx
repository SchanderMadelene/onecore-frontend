import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TurnoverCase } from "@/types/turnover";
import { TurnoverCaseCard } from "./TurnoverCaseCard";
import { TurnoverCaseDetailDialog } from "./TurnoverCaseDetailDialog";

interface TurnoverListProps {
  cases: TurnoverCase[];
}

export function TurnoverList({ cases }: TurnoverListProps) {
  const [selectedCase, setSelectedCase] = useState<TurnoverCase | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCaseClick = (case_: TurnoverCase) => {
    setSelectedCase(case_);
    setDialogOpen(true);
  };

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
      <Card>
        <CardContent className="p-0">
          {sortedCases.length > 0 ? (
            <div className="divide-y">
              {sortedCases.map(case_ => (
                <TurnoverCaseCard 
                  key={case_.id} 
                  case_={case_} 
                  onClick={() => handleCaseClick(case_)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Inga ärenden matchar dina filterkriterier
            </div>
          )}
        </CardContent>
      </Card>

      <TurnoverCaseDetailDialog 
        case_={selectedCase}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
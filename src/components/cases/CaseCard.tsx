
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import { Case } from "./CaseForm";

interface CaseCardProps {
  caseItem: Case;
}

export function CaseCard({ caseItem }: CaseCardProps) {
  const getPriorityBadge = (priority: Case["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline">Hög</Badge>;
      case "medium":
        return <Badge variant="outline">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Låg</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Case["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline">Pågående</Badge>;
      case "pending":
        return <Badge variant="outline">Väntande</Badge>;
      case "resolved":
        return <Badge variant="outline">Åtgärdat</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden border">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg">{caseItem.title}</h3>
          <span className="text-xs bg-slate-100 px-2 py-1 rounded-md">#{caseItem.id}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{caseItem.description}</p>
        
        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>{caseItem.reportedDate}</span>
          </div>
          {caseItem.assignedTo && (
            <div className="flex items-center gap-1.5">
              <span>{caseItem.assignedTo}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span>Status: {getStatusBadge(caseItem.status)}</span>
          </div>
          <div>
            <span>Prioritet: {getPriorityBadge(caseItem.priority)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

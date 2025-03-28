
import { Case } from "./CaseForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CasesTableProps {
  cases: Case[];
}

export function CasesTable({ cases }: CasesTableProps) {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Ärende</TableHead>
          <TableHead>Rapporterad</TableHead>
          <TableHead>Åtgärdat</TableHead>
          <TableHead>Prioritet</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cases.map((caseItem) => (
          <TableRow key={caseItem.id}>
            <TableCell className="font-medium">{caseItem.id}</TableCell>
            <TableCell>{caseItem.title}</TableCell>
            <TableCell>{caseItem.reportedDate}</TableCell>
            <TableCell>{caseItem.resolvedDate}</TableCell>
            <TableCell>{getPriorityBadge(caseItem.priority)}</TableCell>
            <TableCell>{getStatusBadge(caseItem.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

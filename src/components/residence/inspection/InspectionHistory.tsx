
import type { Inspection } from "./types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface InspectionHistoryProps {
  inspections: Inspection[];
}

export const InspectionHistory = ({ inspections }: InspectionHistoryProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Besiktningsman</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inspections.map((inspection, index) => (
            <TableRow key={index}>
              <TableCell>{inspection.date}</TableCell>
              <TableCell>{inspection.inspectorName}</TableCell>
              <TableCell>{inspection.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};



import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Inspection } from "./types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface InspectionHistoryProps {
  inspections: Inspection[];
}

export const InspectionHistory = ({ inspections }: InspectionHistoryProps) => {
  const hasInspections = inspections && inspections.length > 0;
  
  return (
    <div className="space-y-4">
      {hasInspections ? (
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
                  <TableCell>{inspection?.date || 'N/A'}</TableCell>
                  <TableCell>{inspection?.inspectorName || 'N/A'}</TableCell>
                  <TableCell>{inspection?.status || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 bg-muted/30 rounded-lg border">
          <p className="text-muted-foreground">Inga besiktningar registrerade ännu</p>
        </div>
      )}
    </div>
  );
};

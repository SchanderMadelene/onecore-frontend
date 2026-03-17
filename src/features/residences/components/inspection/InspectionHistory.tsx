import type { Inspection } from "./types";
import { ResponsiveTable } from "@/shared/ui/responsive-table";

interface InspectionHistoryProps {
  inspections: Inspection[];
}

export const InspectionHistory = ({ inspections }: InspectionHistoryProps) => {
  const columns = [
    { key: "date", label: "Datum", render: (i: Inspection) => i?.date || 'N/A' },
    { key: "inspectedBy", label: "Besiktningsman", render: (i: Inspection) => i?.inspectedBy || 'N/A' },
    { key: "status", label: "Status", render: (i: Inspection) => i?.isCompleted ? 'Slutförd' : 'Pågående' },
  ];

  const mobileCardRenderer = (inspection: Inspection) => (
    <div>
      <div className="font-medium">{inspection?.date || 'N/A'}</div>
      <div className="text-sm text-muted-foreground">{inspection?.inspectedBy || 'N/A'}</div>
      <div className="text-sm mt-1">{inspection?.isCompleted ? 'Slutförd' : 'Pågående'}</div>
    </div>
  );

  return (
    <div className="space-y-4">
      <ResponsiveTable
        data={inspections || []}
        columns={columns}
        keyExtractor={(inspection: Inspection) => inspection?.date || String(Math.random())}
        emptyMessage="Inga besiktningar registrerade ännu"
        mobileCardRenderer={mobileCardRenderer}
      />
    </div>
  );
};

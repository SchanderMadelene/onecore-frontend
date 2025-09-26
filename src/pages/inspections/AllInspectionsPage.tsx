import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InspectionReadOnly } from "@/components/residence/inspection/InspectionReadOnly";
import { PageLayout } from "@/components/layout/PageLayout";
import type { Inspection } from "@/components/residence/inspection/types";

const getAllInspections = (): Inspection[] => {
  const saved = localStorage.getItem("inspections");
  return saved ? JSON.parse(saved) : [];
};

export default function AllInspectionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inspections] = useState<Inspection[]>(getAllInspections);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);

  const handleViewInspection = (inspection: Inspection) => {
    setSelectedInspection(inspection);
  };

  const getStatusBadge = (inspection: Inspection) => {
    if (inspection.isCompleted) {
      return <Badge variant="secondary">Slutförd</Badge>;
    }
    return <Badge variant="default">Pågående</Badge>;
  };

  const getCompletedRoomsCount = (inspection: Inspection) => {
    if (!inspection.rooms) return 0;
    return Object.values(inspection.rooms).filter(room => room.isHandled).length;
  };

  const getTotalRoomsCount = (inspection: Inspection) => {
    if (!inspection.rooms) return 0;
    return Object.keys(inspection.rooms).length;
  };

  const columns = [
    {
      key: "date",
      label: "Datum", 
      render: (inspection: Inspection) => inspection.date ? new Date(inspection.date).toLocaleDateString('sv-SE') : 'N/A'
    },
    {
      key: "address",
      label: "Lägenhet",
      render: (inspection: Inspection) => (
        <div>
          <div className="font-medium">Lägenhet {inspection.id?.replace('inspection-', '') || 'N/A'}</div>
          <div className="text-sm text-muted-foreground">ID: {inspection.id}</div>
        </div>
      )
    },
    {
      key: "inspector",
      label: "Besiktningsman",
      render: (inspection: Inspection) => inspection.inspectedBy || 'N/A'
    },
    {
      key: "status", 
      label: "Status",
      render: (inspection: Inspection) => getStatusBadge(inspection)
    },
    {
      key: "rooms",
      label: "Rum",
      render: (inspection: Inspection) => {
        const completed = getCompletedRoomsCount(inspection);
        const total = getTotalRoomsCount(inspection);
        return `${completed}/${total}`;
      }
    },
    {
      key: "actions",
      label: "Åtgärder",
      render: (inspection: Inspection) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleViewInspection(inspection)}
        >
          <Eye className="h-4 w-4 mr-1" />
          Visa detaljer
        </Button>
      )
    }
  ];

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alla besiktningar</h1>
          <p className="text-muted-foreground">Översikt över alla besiktningar i systemet</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Besiktningsöversikt</CardTitle>
          </CardHeader>
          <CardContent>
            {inspections.length > 0 ? (
              <ResponsiveTable
                data={inspections}
                columns={columns}
                keyExtractor={(inspection: Inspection) => inspection.id}
                emptyMessage="Inga besiktningar registrerade ännu"
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Inga besiktningar registrerade ännu</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Besiktningar skapas från individuella lägenheter
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog 
        open={selectedInspection !== null} 
        onOpenChange={(open) => !open && setSelectedInspection(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedInspection && (
            <InspectionReadOnly 
              inspection={selectedInspection}
              onClose={() => setSelectedInspection(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
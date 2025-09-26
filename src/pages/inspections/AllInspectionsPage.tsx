import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InspectionReadOnly } from "@/components/residence/inspection/InspectionReadOnly";
import { PageLayout } from "@/components/layout/PageLayout";
import type { Inspection } from "@/components/residence/inspection/types";

const getAllInspections = (): Inspection[] => {
  const saved = localStorage.getItem("inspections");
  return saved ? JSON.parse(saved) : [];
};

// Mock current user - in real app this would come from auth context
const CURRENT_USER = "Anna Lindström";

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

  // Filter inspections by category
  const ongoingInspections = inspections.filter(inspection => !inspection.isCompleted);
  const myInspections = inspections.filter(inspection => inspection.inspectedBy === CURRENT_USER);
  const completedInspections = inspections.filter(inspection => inspection.isCompleted);

  const createColumns = (showInspector: boolean = true) => [
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
    ...(showInspector ? [{
      key: "inspector",
      label: "Besiktningsman",
      render: (inspection: Inspection) => inspection.inspectedBy || 'N/A'
    }] : []),
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

  const renderInspectionTable = (data: Inspection[], title: string, showInspector: boolean = true) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <Badge variant="outline">{data.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveTable
            data={data}
            columns={createColumns(showInspector)}
            keyExtractor={(inspection: Inspection) => inspection.id}
            emptyMessage="Inga besiktningar registrerade ännu"
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Inga besiktningar i denna kategori</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alla besiktningar</h1>
          <p className="text-muted-foreground">Översikt över alla besiktningar i systemet</p>
        </div>

        <Tabs defaultValue="ongoing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ongoing" className="flex items-center gap-2">
              Pågående
              <Badge variant="secondary" className="ml-1">{ongoingInspections.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="mine" className="flex items-center gap-2">
              Mina besiktningar
              <Badge variant="secondary" className="ml-1">{myInspections.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              Avslutade
              <Badge variant="secondary" className="ml-1">{completedInspections.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-4">
            {renderInspectionTable(ongoingInspections, "Alla pågående registrerade besiktningar")}
          </TabsContent>

          <TabsContent value="mine" className="space-y-4">
            {renderInspectionTable(myInspections, "Mina besiktningar", false)}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {renderInspectionTable(completedInspections, "Skickade/avslutade besiktningar")}
          </TabsContent>
        </Tabs>
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
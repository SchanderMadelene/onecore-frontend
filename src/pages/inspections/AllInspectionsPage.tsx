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

// Extended inspection type for the overview page
interface ExtendedInspection extends Inspection {
  contractId?: string;
  address?: string;
  terminationDate?: string;
  district?: string;
  inspectionNumber?: string;
  priority?: 'avflytt' | 'inflytt';
  isAssigned?: boolean;
}

const getAllInspections = (): ExtendedInspection[] => {
  // Always return mock data for demonstration purposes
  const mockInspections: ExtendedInspection[] = [
    {
      id: "inspection-mock-1",
      date: "2024-09-20",
      inspectedBy: "Anna Lindström",
      rooms: {},
      isCompleted: false,
      contractId: "K2024001",
      address: "Storgatan 12, Västerås",
      terminationDate: "2024-10-15",
      district: "Centrum",
      inspectionNumber: "BES-2024-001",
      priority: 'avflytt',
      isAssigned: true
    },
    {
      id: "inspection-mock-2", 
      date: "2024-09-22",
      inspectedBy: "Erik Johansson",
      rooms: {},
      isCompleted: false,
      contractId: "K2024002",
      address: "Lillgatan 8, Västerås",
      terminationDate: "2024-10-20",
      district: "Söder",
      inspectionNumber: "BES-2024-002",
      priority: 'inflytt',
      isAssigned: false
    },
    {
      id: "inspection-mock-3",
      date: "2024-09-25",
      inspectedBy: "Maria Andersson",
      rooms: {},
      isCompleted: false,
      contractId: "K2024003",
      address: "Vasagatan 15, Västerås",
      terminationDate: "2024-11-01",
      district: "Norr",
      inspectionNumber: "BES-2024-003",
      priority: 'avflytt',
      isAssigned: true
    },
    {
      id: "inspection-mock-4",
      date: "2024-09-18",
      inspectedBy: "Anna Lindström",
      rooms: {},
      isCompleted: true,
      contractId: "K2024004",
      address: "Kopparbergsvägen 22, Västerås",
      terminationDate: "2024-09-30",
      district: "Väster",
      inspectionNumber: "BES-2024-004",
      priority: 'inflytt',
      isAssigned: true
    },
    {
      id: "inspection-mock-5",
      date: "2024-09-28",
      inspectedBy: "Lars Petersson",
      rooms: {},
      isCompleted: false,
      contractId: "K2024005",
      address: "Björkgatan 5, Västerås",
      terminationDate: "2024-10-25",
      district: "Öster",
      inspectionNumber: "BES-2024-005",
      priority: 'avflytt',
      isAssigned: false
    },
    {
      id: "inspection-mock-6",
      date: "2024-09-15",
      inspectedBy: "Anna Lindström",
      rooms: {},
      isCompleted: true,
      contractId: "K2024006",
      address: "Skolgatan 18, Västerås",
      terminationDate: "2024-09-20",
      district: "Centrum",
      inspectionNumber: "BES-2024-006",
      priority: 'inflytt',
      isAssigned: true
    },
    {
      id: "inspection-mock-7",
      date: "2024-09-30",
      inspectedBy: "Johanna Svensson",
      rooms: {},
      isCompleted: false,
      contractId: "K2024007",
      address: "Hantverkargatan 9, Västerås",
      terminationDate: "2024-11-10",
      district: "Söder",
      inspectionNumber: "BES-2024-007",
      priority: 'avflytt',  
      isAssigned: true
    },
    {
      id: "inspection-mock-8",
      date: "2024-09-26",
      inspectedBy: "Thomas Nilsson", 
      rooms: {},
      isCompleted: false,
      contractId: "K2024008",
      address: "Klostergatan 14, Västerås",
      terminationDate: "2024-10-30",
      district: "Norr",
      inspectionNumber: "BES-2024-008",
      priority: 'inflytt',
      isAssigned: false
    }
  ];
  
  return mockInspections;
};

// Mock current user - in real app this would come from auth context
const CURRENT_USER = "Anna Lindström";

export default function AllInspectionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inspections] = useState<ExtendedInspection[]>(() => {
    const allInspections = getAllInspections();
    console.log("Loaded inspections:", allInspections);
    return allInspections;
  });
  const [selectedInspection, setSelectedInspection] = useState<ExtendedInspection | null>(null);

  const handleViewInspection = (inspection: ExtendedInspection) => {
    setSelectedInspection(inspection);
  };

  const getStatusBadge = (inspection: ExtendedInspection) => {
    if (inspection.isCompleted) {
      return <Badge variant="secondary">Slutförd</Badge>;
    }
    return <Badge variant="default">Pågående</Badge>;
  };

  const getAssignmentStatusBadge = (isAssigned: boolean) => {
    return isAssigned ? 
      <Badge variant="default">Tilldelad</Badge> : 
      <Badge variant="outline">Inte tilldelad</Badge>;
  };

  const getPriorityBadge = (priority: 'avflytt' | 'inflytt') => {
    return priority === 'avflytt' ? 
      <Badge variant="destructive">Avflytt</Badge> : 
      <Badge variant="secondary">Inflytt</Badge>;
  };

  const getCompletedRoomsCount = (inspection: ExtendedInspection) => {
    if (!inspection.rooms) return 0;
    return Object.values(inspection.rooms).filter(room => room.isHandled).length;
  };

  const getTotalRoomsCount = (inspection: ExtendedInspection) => {
    if (!inspection.rooms) return 0;
    return Object.keys(inspection.rooms).length;
  };

  // Filter inspections by category
  const ongoingInspections = inspections.filter(inspection => !inspection.isCompleted);
  const myInspections = inspections.filter(inspection => inspection.inspectedBy === CURRENT_USER);
  const completedInspections = inspections.filter(inspection => inspection.isCompleted);

  console.log("All inspections:", inspections.length);
  console.log("Ongoing inspections:", ongoingInspections.length);
  console.log("My inspections:", myInspections.length);
  console.log("Completed inspections:", completedInspections.length);

  // Columns for ongoing inspections
  const ongoingColumns = [
    {
      key: "status",
      label: "Status",
      render: (inspection: ExtendedInspection) => getAssignmentStatusBadge(inspection.isAssigned || false)
    },
    {
      key: "priority",
      label: "Prioritet",
      render: (inspection: ExtendedInspection) => getPriorityBadge(inspection.priority || 'inflytt')
    },
    {
      key: "contractId",
      label: "Kontrakt ID",
      render: (inspection: ExtendedInspection) => inspection.contractId || 'N/A'
    },
    {
      key: "address",
      label: "Adress",
      render: (inspection: ExtendedInspection) => inspection.address || 'N/A'
    },
    {
      key: "terminationDate",
      label: "Uppsägningsdatum",
      render: (inspection: ExtendedInspection) => inspection.terminationDate || 'N/A'
    },
    {
      key: "district",
      label: "Distrikt",
      render: (inspection: ExtendedInspection) => inspection.district || 'N/A'
    },
    {
      key: "inspectionNumber",
      label: "Besiktningsnummer",
      render: (inspection: ExtendedInspection) => inspection.inspectionNumber || 'N/A'
    },
    {
      key: "actions",
      label: "Åtgärder",
      render: (inspection: ExtendedInspection) => (
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

  // Columns for other tabs
  const createStandardColumns = (showInspector: boolean = true) => [
    {
      key: "date",
      label: "Datum", 
      render: (inspection: ExtendedInspection) => inspection.date ? new Date(inspection.date).toLocaleDateString('sv-SE') : 'N/A'
    },
    {
      key: "address",
      label: "Adress",
      render: (inspection: ExtendedInspection) => inspection.address || 'N/A'
    },
    ...(showInspector ? [{
      key: "inspector",
      label: "Besiktningsman",
      render: (inspection: ExtendedInspection) => inspection.inspectedBy || 'N/A'
    }] : []),
    {
      key: "status", 
      label: "Status",
      render: (inspection: ExtendedInspection) => getStatusBadge(inspection)
    },
    {
      key: "rooms",
      label: "Rum",
      render: (inspection: ExtendedInspection) => {
        const completed = getCompletedRoomsCount(inspection);
        const total = getTotalRoomsCount(inspection);
        return `${completed}/${total}`;
      }
    },
    {
      key: "actions",
      label: "Åtgärder",
      render: (inspection: ExtendedInspection) => (
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

  const renderInspectionTable = (data: ExtendedInspection[], title: string, useOngoingColumns: boolean = false, showInspector: boolean = true) => (
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
            columns={useOngoingColumns ? ongoingColumns : createStandardColumns(showInspector)}
            keyExtractor={(inspection: ExtendedInspection) => inspection.id}
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
            {renderInspectionTable(ongoingInspections, "Alla pågående registrerade besiktningar", true)}
          </TabsContent>

          <TabsContent value="mine" className="space-y-4">
            {renderInspectionTable(myInspections, "Mina besiktningar", false, false)}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {renderInspectionTable(completedInspections, "Skickade/avslutade besiktningar", false)}
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
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, ChevronUp, ChevronDown, X, Play, PlayCircle, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InspectionReadOnly } from "@/features/properties/residences/components/inspection/InspectionReadOnly";
import { InspectionFormDialog } from "@/features/properties/residences/components/inspection/InspectionFormDialog";
import { PageLayout } from "@/layout/PageLayout";
import { 
  InspectionsHeader, 
  InspectorCell, 
  DateCell 
} from "@/features/inspections/components";
import { 
  useInspectionFilters, 
  useInspectionSorting 
} from "@/features/inspections/hooks";
import { 
  getAllInspections, 
  CURRENT_USER, 
  getMockRooms 
} from "@/features/inspections/data";
import type { ExtendedInspection } from "@/features/inspections/types";
import type { InspectionRoom as InspectionRoomType, InspectionSubmitData } from "@/features/properties/residences/components/inspection/types";

export default function AllInspectionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inspections, setInspections] = useState<ExtendedInspection[]>(getAllInspections);
  
  // State for different modal types
  const [selectedInspection, setSelectedInspection] = useState<ExtendedInspection | null>(null);
  const [formDialogInspection, setFormDialogInspection] = useState<ExtendedInspection | null>(null);
  
  // Use custom hooks
  const {
    searchQuery,
    setSearchQuery,
    selectedInspector,
    setSelectedInspector,
    selectedAddress,
    setSelectedAddress,
    selectedDistrict,
    setSelectedDistrict,
    selectedPriority,
    setSelectedPriority,
    uniqueInspectors,
    uniqueAddresses,
    uniqueDistricts,
    priorityOptions,
    filterInspections,
    clearFilters,
    hasActiveFilters
  } = useInspectionFilters(inspections);

  const {
    sortField,
    sortDirection,
    handleSort,
    sortInspections
  } = useInspectionSorting();

  // Check if inspection has actual room data (conditions filled in)
  const hasRoomData = (inspection: ExtendedInspection) => {
    return inspection.rooms && Object.keys(inspection.rooms).length > 0 &&
      Object.values(inspection.rooms).some(room => 
        Object.values(room.conditions).some(c => c && c.trim() !== "")
      );
  };

  // Determine button text based on inspection status
  const getActionButtonText = (inspection: ExtendedInspection) => {
    if (inspection.isCompleted) return "Visa protokoll";
    if (hasRoomData(inspection)) return "Fortsätt besiktning";
    return "Starta besiktning";
  };

  // Handle view/action based on status
  const handleViewInspection = (inspection: ExtendedInspection) => {
    if (inspection.isCompleted) {
      // Completed: show read-only protocol
      setSelectedInspection(inspection);
    } else {
      // Not started or in progress: open form (with or without existing data)
      setFormDialogInspection(inspection);
    }
  };

  // Handle form submission
  const handleFormSubmit = (
    inspectorName: string,
    rooms: Record<string, InspectionRoomType>,
    status: 'draft' | 'completed',
    additionalData: InspectionSubmitData
  ) => {
    if (formDialogInspection) {
      updateInspection(formDialogInspection.id, {
        inspectedBy: inspectorName,
        rooms,
        status,
        isCompleted: status === 'completed',
        needsMasterKey: additionalData.needsMasterKey,
        tenant: additionalData.tenant
      });
    }
    setFormDialogInspection(null);
  };

  // Update inspection data
  const updateInspection = (id: string, updates: Partial<ExtendedInspection>) => {
    setInspections(prev => 
      prev.map(inspection => 
        inspection.id === id 
          ? { ...inspection, ...updates }
          : inspection
      )
    );
  };

  const getStatusBadge = (inspection: ExtendedInspection) => {
    if (inspection.isCompleted) {
      return "Slutförd";
    }
    return "Pågående";
  };

  const getPriorityBadge = (priority: 'avflytt' | 'inflytt') => {
    return priority === 'avflytt' ? "Avflytt" : "Inflytt";
  };

  const getCompletedRoomsCount = (inspection: ExtendedInspection) => {
    if (!inspection.rooms) return 0;
    return Object.values(inspection.rooms).filter(room => room.isHandled).length;
  };

  const getTotalRoomsCount = (inspection: ExtendedInspection) => {
    if (!inspection.rooms) return 0;
    return Object.keys(inspection.rooms).length;
  };

  // Filter inspections by category and apply filters
  const ongoingInspections = sortInspections(filterInspections(inspections.filter(inspection => !inspection.isCompleted)));
  const myInspections = sortInspections(filterInspections(inspections.filter(inspection => 
    inspection.inspectedBy === CURRENT_USER && !inspection.isCompleted
  )));
  const completedInspections = filterInspections(inspections.filter(inspection => inspection.isCompleted));

  const renderInspectionTable = (data: ExtendedInspection[], title: string, isCompleted: boolean = false) => {
    const columns = [
      {
        key: "inspector",
        label: "Tilldelad",
        render: (inspection: ExtendedInspection) => (
          <InspectorCell 
            inspection={inspection} 
            readOnly={isCompleted} 
            onUpdate={updateInspection}
          />
        )
      },
      {
        key: "priority",
        label: "Prioritet",
        hideOnMobile: true,
        render: (inspection: ExtendedInspection) => (
          <div className="flex items-center gap-2">
            <span>{getPriorityBadge(inspection.priority || 'inflytt')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => handleSort('priority')}
            >
              {sortField === 'priority' && (
                sortDirection === 'asc' ? 
                  <ChevronUp className="h-3 w-3" /> : 
                  <ChevronDown className="h-3 w-3" />
              )}
            </Button>
          </div>
        )
      },
      {
        key: "contractId",
        label: "Kontrakt ID",
        hideOnMobile: true,
        render: (inspection: ExtendedInspection) => (
          <div className="flex items-center gap-2">
            <span>{inspection.contractId || 'N/A'}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => handleSort('contractId')}
            >
              {sortField === 'contractId' && (
                sortDirection === 'asc' ? 
                  <ChevronUp className="h-3 w-3" /> : 
                  <ChevronDown className="h-3 w-3" />
              )}
            </Button>
          </div>
        )
      },
      {
        key: "address",
        label: "Adress",
        render: (inspection: ExtendedInspection) => inspection.address || 'N/A'
      },
      {
        key: "tenantPhone",
        label: "Telefonnummer",
        hideOnMobile: true,
        render: (inspection: ExtendedInspection) => inspection.tenantPhone || 'N/A'
      },
      {
        key: "masterKey",
        label: "Huvudnyckel",
        render: (inspection: ExtendedInspection) => inspection.masterKey ? 'Ja' : 'Nej'
      },
      {
        key: "terminationDate",
        label: "Uppsägning",
        hideOnMobile: true,
        render: (inspection: ExtendedInspection) => (
          <span className="whitespace-nowrap">{inspection.terminationDate || 'N/A'}</span>
        )
      },
      {
        key: "scheduledDate",
        label: isCompleted ? "Utfört" : "Planerat datum/tid",
        render: (inspection: ExtendedInspection) => (
          <DateCell 
            inspection={inspection} 
            readOnly={isCompleted}
            onUpdate={updateInspection}
          />
        )
      },
      {
        key: "district",
        label: "Distrikt",
        hideOnMobile: true,
        render: (inspection: ExtendedInspection) => inspection.district || 'N/A'
      },
      {
        key: "inspectionNumber",
        label: "Besiktningsnummer",
        hideOnMobile: true,
        render: (inspection: ExtendedInspection) => inspection.inspectionNumber || 'N/A'
      },
      {
        key: "actions",
        label: "Åtgärder",
        render: (inspection: ExtendedInspection) => {
          const buttonText = getActionButtonText(inspection);
          const isStart = buttonText === "Starta besiktning";
          const isContinue = buttonText === "Fortsätt besiktning";
          
          return (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewInspection(inspection)}
            >
              {isStart ? (
                <Play className="h-4 w-4 mr-1" />
              ) : isContinue ? (
                <PlayCircle className="h-4 w-4 mr-1" />
              ) : (
                <Eye className="h-4 w-4 mr-1" />
              )}
              {buttonText}
            </Button>
          );
        }
      }
    ];

    return (
      <Card>
        <CardContent className="p-0">
          {data.length > 0 ? (
            <ResponsiveTable
              data={data}
              columns={columns}
              keyExtractor={(inspection: ExtendedInspection) => inspection.id}
              emptyMessage="Inga besiktningar registrerade ännu"
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Inga besiktningar i denna kategori
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <InspectionsHeader />

        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Sökfält - full bredd */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Sök på adress, hyresgäst eller besiktningsnummer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter - egen rad */}
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              {/* Inspector Filter */}
              <Select 
                value={selectedInspector || "all"} 
                onValueChange={(value) => setSelectedInspector(value === "all" ? '' : value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Besiktningsman" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla besiktningsmän</SelectItem>
                  {uniqueInspectors.map((inspector) => (
                    <SelectItem key={inspector} value={inspector}>
                      {inspector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Address Filter */}
              <Select 
                value={selectedAddress || "all"} 
                onValueChange={(value) => setSelectedAddress(value === "all" ? '' : value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Adress" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla adresser</SelectItem>
                  {uniqueAddresses.map((address) => (
                    <SelectItem key={address} value={address}>
                      {address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* District Filter */}
              <Select 
                value={selectedDistrict || "all"} 
                onValueChange={(value) => setSelectedDistrict(value === "all" ? '' : value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Distrikt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla distrikt</SelectItem>
                  {uniqueDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Priority Filter */}
              <Select 
                value={selectedPriority || "all"} 
                onValueChange={(value) => setSelectedPriority(value === "all" ? '' : value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Prioritet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla prioriteter</SelectItem>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                  <X className="h-4 w-4" />
                  Rensa filter
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="ongoing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ongoing">
              Pågående ({ongoingInspections.length})
            </TabsTrigger>
            <TabsTrigger value="mine">
              Mina besiktningar ({myInspections.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Avslutade ({completedInspections.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-4">
            {renderInspectionTable(ongoingInspections, "Alla pågående registrerade besiktningar")}
          </TabsContent>

          <TabsContent value="mine" className="space-y-4">
            {renderInspectionTable(myInspections, "Mina besiktningar")}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {renderInspectionTable(completedInspections, "Avslutade besiktningar", true)}
          </TabsContent>
        </Tabs>
      </div>

      {/* Read-only dialog for completed inspections */}
      <Dialog open={!!selectedInspection} onOpenChange={() => setSelectedInspection(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Besiktningsprotokoll</DialogTitle>
            <DialogDescription>
              {selectedInspection?.address} - {selectedInspection?.inspectionNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedInspection && (
            <InspectionReadOnly inspection={selectedInspection} />
          )}
        </DialogContent>
      </Dialog>

      {/* Form dialog for draft/in_progress inspections */}
      {formDialogInspection && (
        <InspectionFormDialog
          isOpen={!!formDialogInspection}
          onClose={() => setFormDialogInspection(null)}
          onSubmit={handleFormSubmit}
          rooms={getMockRooms()}
          existingInspection={formDialogInspection}
        />
      )}
    </PageLayout>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Eye, ChevronUp, ChevronDown, ChevronsUpDown, Check, X, Play, PlayCircle, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InspectionReadOnly } from "@/components/residence/inspection/InspectionReadOnly";
import { InspectionFormDialog } from "@/components/residence/inspection/InspectionFormDialog";
import { PageLayout } from "@/components/layout/PageLayout";
import { cn } from "@/lib/utils";
import { InspectionsHeader } from "./components/InspectionsHeader";
import { InspectorCell } from "./components/InspectorCell";
import { DateCell } from "./components/DateCell";
import { SortableHeader } from "./components/SortableHeader";
import { useInspectionFilters } from "./hooks/useInspectionFilters";
import { useInspectionSorting } from "./hooks/useInspectionSorting";
import { getAllInspections, CURRENT_USER, type ExtendedInspection } from "./data/mockInspections";
import { getMockRooms } from "./data/mockRooms";
import type { InspectionRoom as InspectionRoomType, InspectionSubmitData } from "@/components/residence/inspection/types";

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
    openInspectorDropdown,
    setOpenInspectorDropdown,
    openAddressDropdown,
    setOpenAddressDropdown,
    openDistrictDropdown,
    setOpenDistrictDropdown,
    openPriorityDropdown,
    setOpenPriorityDropdown,
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
      <div className="space-y-4">
        {data.length > 0 ? (
          <ResponsiveTable
            data={data}
            columns={columns}
            keyExtractor={(inspection: ExtendedInspection) => inspection.id}
            emptyMessage="Inga besiktningar registrerade ännu"
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Inga besiktningar i denna kategori</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <InspectionsHeader />

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
            <Popover open={openInspectorDropdown} onOpenChange={setOpenInspectorDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openInspectorDropdown}
                  className="w-full sm:w-[180px] justify-between"
                >
                  {selectedInspector ? selectedInspector : "Välj besiktningsman..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 bg-background z-50" align="start">
                <Command>
                  <CommandInput placeholder="Sök besiktningsman..." />
                  <CommandList>
                    <CommandEmpty>Ingen besiktningsman hittades.</CommandEmpty>
                    <CommandGroup>
                      {uniqueInspectors.map((inspector) => (
                        <CommandItem
                          key={inspector}
                          value={inspector}
                          onSelect={() => {
                            setSelectedInspector(selectedInspector === inspector ? '' : inspector);
                            setOpenInspectorDropdown(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedInspector === inspector ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {inspector}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Address Filter */}
            <Popover open={openAddressDropdown} onOpenChange={setOpenAddressDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openAddressDropdown}
                  className="w-full sm:w-[180px] justify-between"
                >
                  {selectedAddress ? selectedAddress : "Välj adress..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 bg-background z-50" align="start">
                <Command>
                  <CommandInput placeholder="Sök adress..." />
                  <CommandList>
                    <CommandEmpty>Ingen adress hittades.</CommandEmpty>
                    <CommandGroup>
                      {uniqueAddresses.map((address) => (
                        <CommandItem
                          key={address}
                          value={address}
                          onSelect={() => {
                            setSelectedAddress(selectedAddress === address ? '' : address);
                            setOpenAddressDropdown(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedAddress === address ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {address}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* District Filter */}
            <Popover open={openDistrictDropdown} onOpenChange={setOpenDistrictDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openDistrictDropdown}
                  className="w-full sm:w-[180px] justify-between"
                >
                  {selectedDistrict ? selectedDistrict : "Välj distrikt..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 bg-background z-50" align="start">
                <Command>
                  <CommandInput placeholder="Sök distrikt..." />
                  <CommandList>
                    <CommandEmpty>Inget distrikt hittades.</CommandEmpty>
                    <CommandGroup>
                      {uniqueDistricts.map((district) => (
                        <CommandItem
                          key={district}
                          value={district}
                          onSelect={() => {
                            setSelectedDistrict(selectedDistrict === district ? '' : district);
                            setOpenDistrictDropdown(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedDistrict === district ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {district}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Priority Filter */}
            <Popover open={openPriorityDropdown} onOpenChange={setOpenPriorityDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openPriorityDropdown}
                  className="w-full sm:w-[180px] justify-between"
                >
                  {selectedPriority ? priorityOptions.find(p => p.value === selectedPriority)?.label : "Välj prioritet..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 bg-background z-50" align="start">
                <Command>
                  <CommandInput placeholder="Sök prioritet..." />
                  <CommandList>
                    <CommandEmpty>Ingen prioritet hittades.</CommandEmpty>
                    <CommandGroup>
                      {priorityOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => {
                            setSelectedPriority(selectedPriority === option.value ? '' : option.value);
                            setOpenPriorityDropdown(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedPriority === option.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Rensa filter
              </Button>
            )}
        </div>

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

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Eye, ChevronUp, ChevronDown, Calendar as CalendarIcon, ChevronsUpDown, Check, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { InspectionReadOnly } from "@/components/residence/inspection/InspectionReadOnly";
import { PageLayout } from "@/components/layout/PageLayout";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { Inspection } from "@/components/residence/inspection/types";
import { InspectionsHeader } from "./components/InspectionsHeader";

// Extended inspection type for the overview page
interface ExtendedInspection extends Inspection {
  contractId?: string;
  address?: string;
  terminationDate?: string;
  district?: string;
  inspectionNumber?: string;
  priority?: 'avflytt' | 'inflytt';
  isAssigned?: boolean;
  scheduledDate?: Date;
  assignedInspector?: string;
}

// Available inspectors for assignment
const AVAILABLE_INSPECTORS = [
  "Anna Lindström",
  "Erik Johansson", 
  "Maria Andersson",
  "Lars Petersson",
  "Johanna Svensson",
  "Thomas Nilsson"
];

type SortField = 'priority' | 'contractId' | 'terminationDate';
type SortDirection = 'asc' | 'desc';

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
      address: "Storgatan 12",
      terminationDate: "2024-10-15",
      district: "Centrum",
      inspectionNumber: "BES-2024-001",
      priority: 'avflytt',
      isAssigned: true,
      scheduledDate: new Date("2024-10-16T10:00:00"),
      assignedInspector: "Anna Lindström"
    },
    {
      id: "inspection-mock-2", 
      date: "2024-09-22",
      inspectedBy: "Erik Johansson",
      rooms: {},
      isCompleted: false,
      contractId: "K2024002",
      address: "Lillgatan 8",
      terminationDate: "2024-10-20",
      district: "Söder",
      inspectionNumber: "BES-2024-002",
      priority: 'inflytt',
      isAssigned: false,
      scheduledDate: undefined,
      assignedInspector: undefined
    },
    {
      id: "inspection-mock-3",
      date: "2024-09-25",
      inspectedBy: "Maria Andersson",
      rooms: {},
      isCompleted: false,
      contractId: "K2024003",
      address: "Vasagatan 15",
      terminationDate: "2024-11-01",
      district: "Norr",
      inspectionNumber: "BES-2024-003",
      priority: 'avflytt',
      isAssigned: true,
      scheduledDate: new Date("2024-11-02T14:30:00"),
      assignedInspector: "Maria Andersson"
    },
    {
      id: "inspection-mock-4",
      date: "2024-09-18",
      inspectedBy: "Anna Lindström",
      rooms: {},
      isCompleted: true,
      contractId: "K2024004",
      address: "Kopparbergsvägen 22",
      terminationDate: "2024-09-30",
      district: "Väster",
      inspectionNumber: "BES-2024-004",
      priority: 'inflytt',
      isAssigned: true,
      scheduledDate: new Date("2024-10-01T09:00:00"),
      assignedInspector: "Anna Lindström"
    },
    {
      id: "inspection-mock-5",
      date: "2024-09-28",
      inspectedBy: "Lars Petersson",
      rooms: {},
      isCompleted: false,
      contractId: "K2024005",
      address: "Björkgatan 5",
      terminationDate: "2024-10-25",
      district: "Öster",
      inspectionNumber: "BES-2024-005",
      priority: 'avflytt',
      isAssigned: false,
      scheduledDate: undefined,
      assignedInspector: undefined
    },
    {
      id: "inspection-mock-6",
      date: "2024-09-15",
      inspectedBy: "Anna Lindström",
      rooms: {},
      isCompleted: true,
      contractId: "K2024006",
      address: "Skolgatan 18",
      terminationDate: "2024-09-20",
      district: "Centrum",
      inspectionNumber: "BES-2024-006",
      priority: 'inflytt',
      isAssigned: true,
      scheduledDate: new Date("2024-09-21T11:00:00"),
      assignedInspector: "Anna Lindström"
    },
    {
      id: "inspection-mock-7",
      date: "2024-09-30",
      inspectedBy: "Johanna Svensson",
      rooms: {},
      isCompleted: false,
      contractId: "K2024007",
      address: "Hantverkargatan 9",
      terminationDate: "2024-11-10",
      district: "Söder",
      inspectionNumber: "BES-2024-007",
      priority: 'avflytt',  
      isAssigned: true,
      scheduledDate: new Date("2024-11-11T13:00:00"),
      assignedInspector: "Johanna Svensson"
    },
    {
      id: "inspection-mock-8",
      date: "2024-09-26",
      inspectedBy: "Thomas Nilsson", 
      rooms: {},
      isCompleted: false,
      contractId: "K2024008",
      address: "Klostergatan 14",
      terminationDate: "2024-10-30",
      district: "Norr",
      inspectionNumber: "BES-2024-008",
      priority: 'inflytt',
      isAssigned: false,
      scheduledDate: undefined,
      assignedInspector: undefined
    }
  ];
  
  return mockInspections;
};

// Mock current user - in real app this would come from auth context
const CURRENT_USER = "Anna Lindström";

export default function AllInspectionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inspections, setInspections] = useState<ExtendedInspection[]>(() => {
    const allInspections = getAllInspections();
    console.log("Loaded inspections:", allInspections);
    return allInspections;
  });
  const [selectedInspection, setSelectedInspection] = useState<ExtendedInspection | null>(null);
  const [sortField, setSortField] = useState<SortField>('terminationDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  
  // Filter states
  const [selectedInspector, setSelectedInspector] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [openInspectorDropdown, setOpenInspectorDropdown] = useState(false);
  const [openAddressDropdown, setOpenAddressDropdown] = useState(false);
  const [openDistrictDropdown, setOpenDistrictDropdown] = useState(false);
  const [openPriorityDropdown, setOpenPriorityDropdown] = useState(false);
  
  // Extract unique values for dropdowns
  const uniqueInspectors = useMemo(() => {
    const inspectors = new Set<string>();
    inspections.forEach(i => {
      if (i.inspectedBy) inspectors.add(i.inspectedBy);
      if (i.assignedInspector) inspectors.add(i.assignedInspector);
    });
    return Array.from(inspectors).sort();
  }, [inspections]);

  const uniqueAddresses = useMemo(() => {
    const addresses = new Set(inspections.map(i => i.address || '').filter(Boolean));
    return Array.from(addresses).sort();
  }, [inspections]);

  const uniqueDistricts = useMemo(() => {
    const districts = new Set(inspections.map(i => i.district || '').filter(Boolean));
    return Array.from(districts).sort();
  }, [inspections]);

  const priorityOptions = [
    { value: 'avflytt', label: 'Avflytt' },
    { value: 'inflytt', label: 'Inflytt' }
  ];
  
  // Filter function
  const filterInspections = (inspectionsList: ExtendedInspection[]) => {
    let filtered = [...inspectionsList];
    
    if (selectedInspector) {
      filtered = filtered.filter(i => 
        i.inspectedBy === selectedInspector || i.assignedInspector === selectedInspector
      );
    }
    if (selectedAddress) {
      filtered = filtered.filter(i => i.address === selectedAddress);
    }
    if (selectedDistrict) {
      filtered = filtered.filter(i => i.district === selectedDistrict);
    }
    if (selectedPriority) {
      filtered = filtered.filter(i => i.priority === selectedPriority);
    }
    
    return filtered;
  };

  const clearFilters = () => {
    setSelectedInspector('');
    setSelectedAddress('');
    setSelectedDistrict('');
    setSelectedPriority('');
  };

  const hasActiveFilters = selectedInspector || selectedAddress || selectedDistrict || selectedPriority;

  const handleViewInspection = (inspection: ExtendedInspection) => {
    setSelectedInspection(inspection);
  };

  // Sorting functionality
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortInspections = (inspections: ExtendedInspection[]) => {
    return [...inspections].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'priority':
          aValue = a.priority === 'avflytt' ? 0 : 1;
          bValue = b.priority === 'avflytt' ? 0 : 1;
          break;
        case 'contractId':
          aValue = a.contractId || '';
          bValue = b.contractId || '';
          break;
        case 'terminationDate':
          aValue = new Date(a.terminationDate || '').getTime();
          bValue = new Date(b.terminationDate || '').getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
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

  // Editable components
  const StatusCell = ({ inspection }: { inspection: ExtendedInspection }) => (
    <Select
      value={inspection.isAssigned ? 'assigned' : 'unassigned'}
      onValueChange={(value) => {
        updateInspection(inspection.id, { 
          isAssigned: value === 'assigned',
          assignedInspector: value === 'unassigned' ? undefined : inspection.assignedInspector
        });
      }}
    >
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="assigned">Tilldelad</SelectItem>
        <SelectItem value="unassigned">Inte tilldelad</SelectItem>
      </SelectContent>
    </Select>
  );

  const InspectorCell = ({ inspection }: { inspection: ExtendedInspection }) => (
    <Select
      value={inspection.assignedInspector || ''}
      onValueChange={(value) => {
        updateInspection(inspection.id, { 
          assignedInspector: value,
          isAssigned: !!value
        });
      }}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Välj besiktningsman" />
      </SelectTrigger>
      <SelectContent>
        {AVAILABLE_INSPECTORS.map(inspector => (
          <SelectItem key={inspector} value={inspector}>
            {inspector}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const DateCell = ({ inspection }: { inspection: ExtendedInspection }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-48 justify-start text-left font-normal",
            !inspection.scheduledDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {inspection.scheduledDate ? (
            format(inspection.scheduledDate, "PPP HH:mm", { locale: sv })
          ) : (
            <span>Välj datum och tid</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={inspection.scheduledDate}
          onSelect={(date) => {
            if (date) {
              const newDate = new Date(date);
              newDate.setHours(9, 0, 0, 0); // Default to 09:00
              updateInspection(inspection.id, { scheduledDate: newDate });
            }
          }}
          initialFocus
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      className="h-auto p-0 font-semibold text-muted-foreground hover:text-foreground"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? 
          <ChevronUp className="ml-1 h-4 w-4" /> : 
          <ChevronDown className="ml-1 h-4 w-4" />
      )}
    </Button>
  );

  const getStatusBadge = (inspection: ExtendedInspection) => {
    if (inspection.isCompleted) {
      return "Slutförd";
    }
    return "Pågående";
  };

  const getAssignmentStatusBadge = (isAssigned: boolean) => {
    return isAssigned ? "Tilldelad" : "Inte tilldelad";
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
  const myInspections = filterInspections(inspections.filter(inspection => inspection.inspectedBy === CURRENT_USER));
  const completedInspections = filterInspections(inspections.filter(inspection => inspection.isCompleted));

  console.log("All inspections:", inspections.length);
  console.log("Ongoing inspections:", ongoingInspections.length);
  console.log("My inspections:", myInspections.length);
  console.log("Completed inspections:", completedInspections.length);

  // Columns for ongoing inspections with editing capabilities
  const ongoingColumns = [
    {
      key: "status",
      label: "Status",
      render: (inspection: ExtendedInspection) => <StatusCell inspection={inspection} />
    },
    {
      key: "priority",
      label: "Prioritet",
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
      key: "terminationDate",
      label: "Uppsägningsdatum",
      render: (inspection: ExtendedInspection) => (
        <div className="flex items-center gap-2">
          <span>{inspection.terminationDate || 'N/A'}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => handleSort('terminationDate')}
          >
            {sortField === 'terminationDate' && (
              sortDirection === 'asc' ? 
                <ChevronUp className="h-3 w-3" /> : 
                <ChevronDown className="h-3 w-3" />
            )}
          </Button>
        </div>
      )
    },
    {
      key: "inspector",
      label: "Besiktningsman/Resurs",
      render: (inspection: ExtendedInspection) => <InspectorCell inspection={inspection} />
    },
    {
      key: "scheduledDate",
      label: "Planerat datum/tid",
      render: (inspection: ExtendedInspection) => <DateCell inspection={inspection} />
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
        <InspectionsHeader />

        {/* Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Inspector Filter */}
            <Popover open={openInspectorDropdown} onOpenChange={setOpenInspectorDropdown}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openInspectorDropdown}
                  className="w-full sm:w-[250px] justify-between"
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
                  className="w-full sm:w-[250px] justify-between"
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
                  className="w-full sm:w-[250px] justify-between"
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
                  className="w-full sm:w-[250px] justify-between"
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
        </div>

        <Tabs defaultValue="ongoing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ongoing">
              Pågående
            </TabsTrigger>
            <TabsTrigger value="mine">
              Mina besiktningar
            </TabsTrigger>
            <TabsTrigger value="completed">
              Avslutade
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
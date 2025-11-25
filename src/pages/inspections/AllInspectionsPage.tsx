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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { InspectionReadOnly } from "@/components/residence/inspection/InspectionReadOnly";
import { PageLayout } from "@/components/layout/PageLayout";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
  tenantPhone?: string;
  masterKey?: boolean;
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
      assignedInspector: "Anna Lindström",
      tenantPhone: "070-123 45 67",
      masterKey: true
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
      assignedInspector: undefined,
      tenantPhone: "070-234 56 78",
      masterKey: false
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
      assignedInspector: "Maria Andersson",
      tenantPhone: "070-345 67 89",
      masterKey: true
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
      assignedInspector: "Anna Lindström",
      tenantPhone: "070-456 78 90",
      masterKey: false
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
      assignedInspector: undefined,
      tenantPhone: "070-567 89 01",
      masterKey: true
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
      assignedInspector: "Anna Lindström",
      tenantPhone: "070-678 90 12",
      masterKey: false
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
      assignedInspector: "Johanna Svensson",
      tenantPhone: "070-789 01 23",
      masterKey: true
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
      assignedInspector: undefined,
      tenantPhone: "070-890 12 34",
      masterKey: false
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
  const InspectorCell = ({ inspection, readOnly = false }: { inspection: ExtendedInspection; readOnly?: boolean }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingInspector, setPendingInspector] = useState<string | undefined>();
    const [changeReason, setChangeReason] = useState<string>('');
    const [changeComment, setChangeComment] = useState<string>('');

    // Om readOnly, visa bara resursens namn
    if (readOnly) {
      return (
        <span className="text-sm">
          {inspection.assignedInspector || 'Ej tilldelad'}
        </span>
      );
    }

    const handleValueChange = (value: string) => {
      const newInspector = value === 'none' ? undefined : value;
      
      // Om besiktningen redan är tilldelad och man väljer en ny resurs
      if (inspection.assignedInspector && inspection.assignedInspector !== newInspector) {
        setPendingInspector(newInspector);
        setShowConfirmDialog(true);
      } else {
        // Direkt uppdatering om ingen är tilldelad eller om man tar bort tilldelningen
        updateInspection(inspection.id, { 
          assignedInspector: newInspector,
          isAssigned: value !== 'none'
        });
      }
    };

    const handleConfirmChange = () => {
      console.log({
        inspectionId: inspection.id,
        previousInspector: inspection.assignedInspector,
        newInspector: pendingInspector,
        reason: changeReason,
        comment: changeComment,
        timestamp: new Date().toISOString()
      });

      updateInspection(inspection.id, { 
        assignedInspector: pendingInspector,
        isAssigned: pendingInspector !== undefined
      });

      // Rensa state
      setShowConfirmDialog(false);
      setPendingInspector(undefined);
      setChangeReason('');
      setChangeComment('');
    };

    const handleCancelChange = () => {
      setShowConfirmDialog(false);
      setPendingInspector(undefined);
      setChangeReason('');
      setChangeComment('');
    };

    return (
      <>
        <Select
          value={inspection.assignedInspector || 'none'}
          onValueChange={handleValueChange}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Ej tilldelad</SelectItem>
            {AVAILABLE_INSPECTORS.map(inspector => (
              <SelectItem key={inspector} value={inspector}>
                {inspector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bekräfta byte av resurs</AlertDialogTitle>
              <AlertDialogDescription>
                Du håller på att byta resurs från <strong>{inspection.assignedInspector}</strong> till{' '}
                <strong>{pendingInspector || 'Ej tilldelad'}</strong>. Vänligen ange anledning till bytet.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Anledning *</label>
                <Select value={changeReason} onValueChange={setChangeReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj anledning" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sjukdom">Sjukdom</SelectItem>
                    <SelectItem value="semester">Semester</SelectItem>
                    <SelectItem value="schema-konflikt">Schema-konflikt</SelectItem>
                    <SelectItem value="resursbrist">Resursbrist</SelectItem>
                    <SelectItem value="annat">Annat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Kommentar (valfritt)</label>
                <Textarea
                  placeholder="Ange ytterligare information om bytet..."
                  value={changeComment}
                  onChange={(e) => setChangeComment(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelChange}>Avbryt</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmChange}
                disabled={!changeReason}
              >
                Bekräfta byte
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  };

  const DateCell = ({ inspection, readOnly = false }: { inspection: ExtendedInspection; readOnly?: boolean }) => {
    const [timeValue, setTimeValue] = useState(() => {
      if (inspection.scheduledDate) {
        const hours = inspection.scheduledDate.getHours().toString().padStart(2, '0');
        const minutes = inspection.scheduledDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      }
      return "09:00";
    });

    // Om readOnly, visa bara datumet som text
    if (readOnly) {
      return (
        <span className="text-sm whitespace-nowrap">
          {inspection.scheduledDate ? format(inspection.scheduledDate, "dd-MM-yyyy HH:mm") : 'Ej planerat'}
        </span>
      );
    }

    const handleDateSelect = (date: Date | undefined) => {
      if (date) {
        const [hours, minutes] = timeValue.split(':').map(Number);
        const newDate = new Date(date);
        newDate.setHours(hours, minutes, 0, 0);
        updateInspection(inspection.id, { scheduledDate: newDate });
      }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = e.target.value;
      setTimeValue(newTime);
      
      if (inspection.scheduledDate && /^\d{2}:\d{2}$/.test(newTime)) {
        const [hours, minutes] = newTime.split(':').map(Number);
        if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
          const newDate = new Date(inspection.scheduledDate);
          newDate.setHours(hours, minutes, 0, 0);
          updateInspection(inspection.id, { scheduledDate: newDate });
        }
      }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-52 justify-start text-left font-normal",
              !inspection.scheduledDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">
              {inspection.scheduledDate ? (
                format(inspection.scheduledDate, "dd-MM-yyyy HH:mm")
              ) : (
                "Välj datum och tid"
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={inspection.scheduledDate}
            onSelect={handleDateSelect}
            initialFocus
            className="p-3 pointer-events-auto"
          />
          <div className="p-3 border-t">
            <label className="text-sm font-medium mb-2 block">Klockslag</label>
            <Input
              type="time"
              value={timeValue}
              onChange={handleTimeChange}
              className="w-full"
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  };

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

  const renderInspectionTable = (data: ExtendedInspection[], title: string, isCompleted: boolean = false) => {
    // Skapa kolumner dynamiskt baserat på om det är avslutade besiktningar
    const columns = [
      {
        key: "inspector",
        label: "Tilldelad",
        render: (inspection: ExtendedInspection) => <InspectorCell inspection={inspection} readOnly={isCompleted} />
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
          render: (inspection: ExtendedInspection) => <DateCell inspection={inspection} readOnly={isCompleted} />
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

    return (
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
              columns={columns}
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
  };

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
            {renderInspectionTable(ongoingInspections, "Alla pågående registrerade besiktningar")}
          </TabsContent>

          <TabsContent value="mine" className="space-y-4">
            {renderInspectionTable(myInspections, "Mina besiktningar")}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {renderInspectionTable(completedInspections, "Skickade/avslutade besiktningar", true)}
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
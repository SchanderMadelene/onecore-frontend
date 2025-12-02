import type { Inspection, ResidenceInfo } from "@/components/residence/inspection/types";

// Extended inspection type for the overview page
export interface ExtendedInspection extends Inspection {
  contractId?: string;
  address?: string;
  terminationDate?: string;
  district?: string;
  priority?: 'avflytt' | 'inflytt';
  isAssigned?: boolean;
  scheduledDate?: Date;
  assignedInspector?: string;
  tenantPhone?: string;
  masterKey?: boolean;
}

// Available inspectors for assignment
export const AVAILABLE_INSPECTORS = [
  "Anna Lindström",
  "Erik Johansson", 
  "Maria Andersson",
  "Lars Petersson",
  "Johanna Svensson",
  "Thomas Nilsson"
];

// Mock current user - in real app this would come from auth context
export const CURRENT_USER = "Anna Lindström";

// Helper to create mock residence info
const createMockResidence = (address: string, id: string): ResidenceInfo => ({
  id,
  objectNumber: `LGH-${id.slice(-3)}`,
  address,
  apartmentType: 'Standard',
  size: 65
});

export const getAllInspections = (): ExtendedInspection[] => {
  // Always return mock data for demonstration purposes
  const mockInspections: ExtendedInspection[] = [
    {
      id: "inspection-mock-1",
      inspectionNumber: "BES-2024-001",
      date: "2024-09-20",
      inspectedBy: "Anna Lindström",
      rooms: {},
      status: 'in_progress',
      isCompleted: false,
      residence: createMockResidence("Storgatan 12", "res-001"),
      needsMasterKey: true,
      contractId: "K2024001",
      address: "Storgatan 12",
      terminationDate: "2024-10-15",
      district: "Centrum",
      priority: 'avflytt',
      isAssigned: true,
      scheduledDate: new Date("2024-10-16T10:00:00"),
      assignedInspector: "Anna Lindström",
      tenantPhone: "070-123 45 67",
      masterKey: true
    },
    {
      id: "inspection-mock-2", 
      inspectionNumber: "BES-2024-002",
      date: "2024-09-22",
      inspectedBy: "Erik Johansson",
      rooms: {},
      status: 'draft',
      isCompleted: false,
      residence: createMockResidence("Lillgatan 8", "res-002"),
      needsMasterKey: false,
      contractId: "K2024002",
      address: "Lillgatan 8",
      terminationDate: "2024-10-20",
      district: "Söder",
      priority: 'inflytt',
      isAssigned: false,
      scheduledDate: undefined,
      assignedInspector: undefined,
      tenantPhone: "070-234 56 78",
      masterKey: false
    },
    {
      id: "inspection-mock-3",
      inspectionNumber: "BES-2024-003",
      date: "2024-09-25",
      inspectedBy: "Maria Andersson",
      rooms: {},
      status: 'in_progress',
      isCompleted: false,
      residence: createMockResidence("Vasagatan 15", "res-003"),
      needsMasterKey: true,
      contractId: "K2024003",
      address: "Vasagatan 15",
      terminationDate: "2024-11-01",
      district: "Norr",
      priority: 'avflytt',
      isAssigned: true,
      scheduledDate: new Date("2024-11-02T14:30:00"),
      assignedInspector: "Maria Andersson",
      tenantPhone: "070-345 67 89",
      masterKey: true
    },
    {
      id: "inspection-mock-4",
      inspectionNumber: "BES-2024-004",
      date: "2024-09-18",
      inspectedBy: "Anna Lindström",
      rooms: {},
      status: 'completed',
      isCompleted: true,
      residence: createMockResidence("Kopparbergsvägen 22", "res-004"),
      needsMasterKey: false,
      contractId: "K2024004",
      address: "Kopparbergsvägen 22",
      terminationDate: "2024-09-30",
      district: "Väster",
      priority: 'inflytt',
      isAssigned: true,
      scheduledDate: new Date("2024-10-01T09:00:00"),
      assignedInspector: "Anna Lindström",
      tenantPhone: "070-456 78 90",
      masterKey: false
    },
    {
      id: "inspection-mock-5",
      inspectionNumber: "BES-2024-005",
      date: "2024-09-28",
      inspectedBy: "Lars Petersson",
      rooms: {},
      status: 'in_progress',
      isCompleted: false,
      residence: createMockResidence("Björkgatan 5", "res-005"),
      needsMasterKey: true,
      contractId: "K2024005",
      address: "Björkgatan 5",
      terminationDate: "2024-10-25",
      district: "Öster",
      priority: 'avflytt',
      isAssigned: false,
      scheduledDate: undefined,
      assignedInspector: undefined,
      tenantPhone: "070-567 89 01",
      masterKey: true
    },
    {
      id: "inspection-mock-6",
      inspectionNumber: "BES-2024-006",
      date: "2024-09-15",
      inspectedBy: "Anna Lindström",
      rooms: {},
      status: 'completed',
      isCompleted: true,
      residence: createMockResidence("Skolgatan 18", "res-006"),
      needsMasterKey: false,
      contractId: "K2024006",
      address: "Skolgatan 18",
      terminationDate: "2024-09-20",
      district: "Centrum",
      priority: 'inflytt',
      isAssigned: true,
      scheduledDate: new Date("2024-09-21T11:00:00"),
      assignedInspector: "Anna Lindström",
      tenantPhone: "070-678 90 12",
      masterKey: false
    },
    {
      id: "inspection-mock-7",
      inspectionNumber: "BES-2024-007",
      date: "2024-09-30",
      inspectedBy: "Johanna Svensson",
      rooms: {},
      status: 'in_progress',
      isCompleted: false,
      residence: createMockResidence("Hantverkargatan 9", "res-007"),
      needsMasterKey: true,
      contractId: "K2024007",
      address: "Hantverkargatan 9",
      terminationDate: "2024-11-10",
      district: "Söder",
      priority: 'avflytt',  
      isAssigned: true,
      scheduledDate: new Date("2024-11-11T13:00:00"),
      assignedInspector: "Johanna Svensson",
      tenantPhone: "070-789 01 23",
      masterKey: true
    },
    {
      id: "inspection-mock-8",
      inspectionNumber: "BES-2024-008",
      date: "2024-09-26",
      inspectedBy: "Thomas Nilsson", 
      rooms: {},
      status: 'draft',
      isCompleted: false,
      residence: createMockResidence("Klostergatan 14", "res-008"),
      needsMasterKey: false,
      contractId: "K2024008",
      address: "Klostergatan 14",
      terminationDate: "2024-10-30",
      district: "Norr",
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

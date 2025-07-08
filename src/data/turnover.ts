import { 
  TurnoverCase, 
  TurnoverStep, 
  TurnoverStatus, 
  TurnoverRole,
  TurnoverStepData 
} from "@/types/turnover";

// Helper function to create step data
const createStep = (
  step: TurnoverStep, 
  status: TurnoverStatus, 
  assignedTo?: string,
  completedAt?: string,
  completedBy?: string,
  dueDate?: string
): TurnoverStepData => ({
  step,
  status,
  assignedTo,
  completedAt,
  completedBy,
  dueDate,
  comments: [],
  documents: []
});

export const mockTurnoverCases: TurnoverCase[] = [
  {
    id: "turn-001",
    propertyId: "algen-1",
    propertyName: "Algen 1",
    buildingId: "algen-1-building-a",
    buildingName: "Odenplan 5A", 
    residenceId: "res-001",
    residenceCode: "1201",
    address: "Odenplan 5A, lgh 1201",
    
    outgoingTenant: {
      id: "tenant-001",
      name: "Anna Andersson",
      email: "anna.andersson@email.com",
      phone: "070-123 45 67",
      moveOutDate: "2024-02-15",
      terminationDate: "2023-12-15",
      terminationReason: "Flytt till annan stad"
    },
    
    incomingTenant: {
      id: "tenant-new-001", 
      name: "Erik Eriksson",
      email: "erik.eriksson@email.com",
      phone: "070-987 65 43",
      moveInDate: "2024-02-20"
    },
    
    steps: [
      createStep(TurnoverStep.TERMINATION_RECEIVED, TurnoverStatus.COMPLETED, "user-cs-1", "2023-12-16T10:00:00Z", "Maria Johansson"),
      createStep(TurnoverStep.INSPECTION_SCHEDULED, TurnoverStatus.COMPLETED, "user-insp-1", "2024-01-15T14:30:00Z", "Lars Petersson"),
      createStep(TurnoverStep.INSPECTION_COMPLETED, TurnoverStatus.COMPLETED, "user-insp-1", "2024-01-20T11:00:00Z", "Lars Petersson"),
      createStep(TurnoverStep.ACTIONS_COMPLETED, TurnoverStatus.IN_PROGRESS, "user-pm-1", undefined, undefined, "2024-02-10"),
      createStep(TurnoverStep.CLEANING_APPROVED, TurnoverStatus.PENDING, "user-pm-1"),
      createStep(TurnoverStep.LISTING_PUBLISHED, TurnoverStatus.PENDING, "user-cs-1"),
      createStep(TurnoverStep.SHOWING_SCHEDULED, TurnoverStatus.PENDING, "user-pm-1"),
      createStep(TurnoverStep.TENANT_SELECTED, TurnoverStatus.PENDING, "user-cs-1"),
      createStep(TurnoverStep.KEYS_HANDED_OVER, TurnoverStatus.PENDING, "user-pm-1"),
      createStep(TurnoverStep.MOVE_IN_COMPLETED, TurnoverStatus.PENDING, "user-cs-1")
    ],
    
    currentStep: TurnoverStep.ACTIONS_COMPLETED,
    priority: "normal",
    createdAt: "2023-12-15T09:00:00Z",
    updatedAt: "2024-01-20T11:00:00Z",
    estimatedCompletion: "2024-02-25",
    
    participants: [
      {
        id: "user-cs-1",
        name: "Maria Johansson",
        role: TurnoverRole.CUSTOMER_SERVICE,
        email: "maria.johansson@mimer.nu",
        phone: "021-123 45 67"
      },
      {
        id: "user-insp-1", 
        name: "Lars Petersson",
        role: TurnoverRole.INSPECTOR,
        email: "lars.petersson@mimer.nu",
        phone: "021-123 45 68"
      },
      {
        id: "user-pm-1",
        name: "Karin Nilsson", 
        role: TurnoverRole.PROPERTY_MANAGER,
        email: "karin.nilsson@mimer.nu",
        phone: "021-123 45 69"
      }
    ]
  },
  
  {
    id: "turn-002",
    propertyId: "bjornen-4", 
    propertyName: "Björnen 4",
    buildingId: "bjornen-4-building-b",
    buildingName: "Kopparbergsvägen 12B",
    residenceId: "res-045",
    residenceCode: "0301",
    address: "Kopparbergsvägen 12B, lgh 0301",
    
    outgoingTenant: {
      id: "tenant-045",
      name: "Mikael Svensson", 
      email: "mikael.svensson@email.com",
      phone: "070-555 12 34",
      moveOutDate: "2024-03-01",
      terminationDate: "2024-01-01",
      terminationReason: "Familjeförstoring"
    },
    
    steps: [
      createStep(TurnoverStep.TERMINATION_RECEIVED, TurnoverStatus.COMPLETED, "user-cs-1", "2024-01-02T09:15:00Z", "Maria Johansson"),
      createStep(TurnoverStep.INSPECTION_SCHEDULED, TurnoverStatus.IN_PROGRESS, "user-insp-1", undefined, undefined, "2024-02-15"),
      createStep(TurnoverStep.INSPECTION_COMPLETED, TurnoverStatus.PENDING, "user-insp-1"),
      createStep(TurnoverStep.ACTIONS_COMPLETED, TurnoverStatus.PENDING, "user-pm-1"),
      createStep(TurnoverStep.CLEANING_APPROVED, TurnoverStatus.PENDING, "user-pm-1"),
      createStep(TurnoverStep.LISTING_PUBLISHED, TurnoverStatus.PENDING, "user-cs-1"),
      createStep(TurnoverStep.SHOWING_SCHEDULED, TurnoverStatus.PENDING, "user-pm-1"),
      createStep(TurnoverStep.TENANT_SELECTED, TurnoverStatus.PENDING, "user-cs-1"),
      createStep(TurnoverStep.KEYS_HANDED_OVER, TurnoverStatus.PENDING, "user-pm-1"),
      createStep(TurnoverStep.MOVE_IN_COMPLETED, TurnoverStatus.PENDING, "user-cs-1")
    ],
    
    currentStep: TurnoverStep.INSPECTION_SCHEDULED,
    priority: "high",
    createdAt: "2024-01-01T08:30:00Z", 
    updatedAt: "2024-01-02T09:15:00Z",
    estimatedCompletion: "2024-03-15",
    
    participants: [
      {
        id: "user-cs-1",
        name: "Maria Johansson",
        role: TurnoverRole.CUSTOMER_SERVICE,
        email: "maria.johansson@mimer.nu",
        phone: "021-123 45 67"
      },
      {
        id: "user-insp-1",
        name: "Lars Petersson", 
        role: TurnoverRole.INSPECTOR,
        email: "lars.petersson@mimer.nu",
        phone: "021-123 45 68"
      },
      {
        id: "user-pm-2",
        name: "Johan Lindberg",
        role: TurnoverRole.PROPERTY_MANAGER,
        email: "johan.lindberg@mimer.nu",
        phone: "021-123 45 70"
      }
    ]
  },

  {
    id: "turn-003",
    propertyId: "lindaren-2",
    propertyName: "Lindaren 2", 
    buildingId: "lindaren-2-building-c",
    buildingName: "Stallhagen 3C",
    residenceId: "res-078",
    residenceCode: "0802",
    address: "Stallhagen 3C, lgh 0802",
    
    outgoingTenant: {
      id: "tenant-078",
      name: "Lisa Karlsson",
      email: "lisa.karlsson@email.com", 
      moveOutDate: "2024-04-30",
      terminationDate: "2024-02-28",
      terminationReason: "Köpt egen bostad"
    },
    
    steps: [
      createStep(TurnoverStep.TERMINATION_RECEIVED, TurnoverStatus.COMPLETED, "user-cs-2", "2024-03-01T11:20:00Z", "Emma Olsson"),
      createStep(TurnoverStep.INSPECTION_SCHEDULED, TurnoverStatus.PENDING, "user-insp-2", undefined, undefined, "2024-04-25"),
      createStep(TurnoverStep.INSPECTION_COMPLETED, TurnoverStatus.PENDING, "user-insp-2"),
      createStep(TurnoverStep.ACTIONS_COMPLETED, TurnoverStatus.PENDING, "user-pm-3"),
      createStep(TurnoverStep.CLEANING_APPROVED, TurnoverStatus.PENDING, "user-pm-3"),
      createStep(TurnoverStep.LISTING_PUBLISHED, TurnoverStatus.PENDING, "user-cs-2"),
      createStep(TurnoverStep.SHOWING_SCHEDULED, TurnoverStatus.PENDING, "user-pm-3"),
      createStep(TurnoverStep.TENANT_SELECTED, TurnoverStatus.PENDING, "user-cs-2"),
      createStep(TurnoverStep.KEYS_HANDED_OVER, TurnoverStatus.PENDING, "user-pm-3"),
      createStep(TurnoverStep.MOVE_IN_COMPLETED, TurnoverStatus.PENDING, "user-cs-2")
    ],
    
    currentStep: TurnoverStep.TERMINATION_RECEIVED,
    priority: "low",
    createdAt: "2024-02-28T16:45:00Z",
    updatedAt: "2024-03-01T11:20:00Z", 
    estimatedCompletion: "2024-05-15",
    
    participants: [
      {
        id: "user-cs-2",
        name: "Emma Olsson",
        role: TurnoverRole.CUSTOMER_SERVICE,
        email: "emma.olsson@mimer.nu", 
        phone: "021-123 45 71"
      },
      {
        id: "user-insp-2",
        name: "Pär Andersson",
        role: TurnoverRole.INSPECTOR,
        email: "par.andersson@mimer.nu",
        phone: "021-123 45 72"
      },
      {
        id: "user-pm-3", 
        name: "Anna Bergström",
        role: TurnoverRole.PROPERTY_MANAGER,
        email: "anna.bergstrom@mimer.nu",
        phone: "021-123 45 73"
      }
    ]
  }
];
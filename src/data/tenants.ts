
// Tenant mock data
export const mockTenant = {
  firstName: "Anna",
  lastName: "Andersson",
  phone: "070-123 45 67",
  email: "anna.andersson@example.com",
  contractStatus: "terminated" as const,
  moveInDate: "2023-01-01",
  moveOutDate: "2023-12-31",
  contractNumber: "KT2023-001",
  personalNumber: "19850101-1234",
  nationality: "Svensk",
  language: "Svenska",
  hasLegalGuardian: false,
  portalCredentials: {
    username: "anna.andersson",
    password: "password123"
  },
  loginCount: 12,
  lastLogin: "2023-11-15T14:30:00",
  isPrimaryTenant: true
};

// Scenario 1: Sambos (båda står på kontraktet)
export const mockMultipleTenants = [
  {
    firstName: "Erik",
    lastName: "Johansson",
    phone: "073-456 78 90",
    email: "erik.johansson@example.com",
    contractStatus: "permanent" as const,
    moveInDate: "2024-01-15",
    contractNumber: "KT2024-002",
    personalNumber: "19900405-5678",
    isPrimaryTenant: true,
    relationshipType: "sambo" as const
  },
  {
    firstName: "Maria",
    lastName: "Johansson",
    phone: "070-987 65 43",
    email: "maria.johansson@example.com",
    contractStatus: "permanent" as const,
    moveInDate: "2024-01-15",
    contractNumber: "KT2024-002",
    personalNumber: "19920712-4321",
    relationshipType: "sambo" as const
  }
];

// Scenario 2: Andrahandsuthyrning
export const mockSecondHandTenants = [
  {
    firstName: "Lars",
    lastName: "Eriksson", 
    phone: "070-222 33 44",
    email: "lars.eriksson@example.com",
    contractStatus: "permanent" as const,
    moveInDate: "2022-05-01",
    contractNumber: "KT2022-005",
    personalNumber: "19781120-3344",
    isPrimaryTenant: true,
    relationshipType: "primaryTenant" as const
  },
  {
    firstName: "Sofia",
    lastName: "Bergström",
    phone: "073-555 66 77", 
    email: "sofia.bergstrom@example.com",
    contractStatus: "temporary" as const,
    moveInDate: "2024-03-01",
    moveOutDate: "2024-09-01",
    contractNumber: "AH2024-001",
    personalNumber: "19950630-8877",
    relationshipType: "secondaryTenant" as const
  }
];

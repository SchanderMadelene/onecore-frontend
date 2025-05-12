
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

// Multiple tenants for the same apartment
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
    isPrimaryTenant: true
  },
  {
    firstName: "Maria",
    lastName: "Johansson",
    phone: "070-987 65 43",
    email: "maria.johansson@example.com",
    contractStatus: "permanent" as const,
    moveInDate: "2024-01-15",
    contractNumber: "KT2024-002",
    personalNumber: "19920712-4321"
  }
];

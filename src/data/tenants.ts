
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
  lastLogin: "2023-11-15T14:30:00"
};

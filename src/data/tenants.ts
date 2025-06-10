
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
  housingContractType: "Korttid",
  portalCredentials: {
    username: "anna.andersson",
    password: "password123"
  },
  loginCount: 12,
  lastLogin: "2023-11-15T14:30:00",
  isPrimaryTenant: true
};

// Erik Karlsson - Privat kund
export const mockErikKarlsson = {
  firstName: "Erik",
  lastName: "Karlsson",
  phone: "073-456 78 90",
  email: "erik.karlsson@example.com",
  contractStatus: "permanent" as const,
  moveInDate: "2020-03-15",
  contractNumber: "KT2020-015",
  personalNumber: "19760315-5678",
  nationality: "Svensk",
  language: "Svenska",
  hasLegalGuardian: false,
  housingContractType: "Tillsvidare",
  portalCredentials: {
    username: "erik.karlsson",
    password: "password456"
  },
  loginCount: 45,
  lastLogin: "2024-06-08T09:15:00",
  isPrimaryTenant: true
};

// Maria Lindberg - Privat kund
export const mockMariaLindberg = {
  firstName: "Maria",
  lastName: "Lindberg",
  phone: "070-987 65 43",
  email: "maria.lindberg@example.com",
  contractStatus: "permanent" as const,
  moveInDate: "2021-11-22",
  contractNumber: "KT2021-122",
  personalNumber: "19911122-9012",
  nationality: "Svensk",
  language: "Svenska",
  hasLegalGuardian: false,
  housingContractType: "Tillsvidare",
  portalCredentials: {
    username: "maria.lindberg",
    password: "password789"
  },
  loginCount: 28,
  lastLogin: "2024-06-09T16:45:00",
  isPrimaryTenant: true
};

// Svenssons Bygg AB - Företagskund
export const mockSvenssonsBuilding = {
  firstName: "Svenssons",
  lastName: "Bygg AB",
  phone: "08-555 123 45",
  email: "info@svenssonsbygg.se",
  contractStatus: "permanent" as const,
  moveInDate: "2019-01-01",
  contractNumber: "FT2019-001",
  personalNumber: "5566778899",
  nationality: "Svensk",
  language: "Svenska",
  hasLegalGuardian: false,
  housingContractType: "Företagskontrakt",
  companyInfo: {
    organizationNumber: "556677-8899",
    contactPerson: "Lars Svensson",
    contactTitle: "VD",
    invoiceAddress: "Byggvägen 12, 123 45 Stockholm"
  },
  portalCredentials: {
    username: "svenssons.bygg",
    password: "company123"
  },
  loginCount: 67,
  lastLogin: "2024-06-10T08:30:00",
  isPrimaryTenant: true,
  isCompany: true
};

// Johanssons Fastigheter KB - Företagskund
export const mockJohanssonsFastigheter = {
  firstName: "Johanssons",
  lastName: "Fastigheter KB",
  phone: "08-444 567 89",
  email: "kontakt@johanssonsfastigheter.se",
  contractStatus: "permanent" as const,
  moveInDate: "2018-06-01",
  contractNumber: "FT2018-006",
  personalNumber: "1122334455",
  nationality: "Svensk",
  language: "Svenska",
  hasLegalGuardian: false,
  housingContractType: "Företagskontrakt",
  companyInfo: {
    organizationNumber: "112233-4455",
    contactPerson: "Anna Johansson",
    contactTitle: "Fastighetschef",
    invoiceAddress: "Fastighetsvägen 8, 456 78 Göteborg"
  },
  portalCredentials: {
    username: "johanssons.fastigheter",
    password: "company456"
  },
  loginCount: 89,
  lastLogin: "2024-06-09T14:20:00",
  isPrimaryTenant: true,
  isCompany: true
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
    relationshipType: "primaryTenant" as const,
    isPrimaryContractHolder: true
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

// Funktion för att hämta tenant baserat på ID
export const getTenantById = (id: string) => {
  switch(id) {
    case "19850101-1234":
      return mockTenant;
    case "19760315-5678":
      return mockErikKarlsson;
    case "19911122-9012":
      return mockMariaLindberg;
    case "5566778899":
      return mockSvenssonsBuilding;
    case "1122334455":
      return mockJohanssonsFastigheter;
    default:
      return mockTenant;
  }
};

// Funktion för att hämta alla tenants
export const getAllTenants = () => [
  mockTenant,
  mockErikKarlsson,
  mockMariaLindberg,
  mockSvenssonsBuilding,
  mockJohanssonsFastigheter
];

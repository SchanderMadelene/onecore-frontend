// Tenant mock data
export const mockTenant = {
  firstName: "Anna",
  lastName: "Andersson",
  phone: "070-123 45 67",
  email: "anna.andersson@example.com",
  contractStatus: "terminated" as const,
  customerType: "tenant" as const,
  moveInDate: "2023-01-01",
  moveOutDate: "2023-12-31",
  contractNumber: "KT2023-001",
  personalNumber: "19850101-1234",
  address: "Storgatan 15A, 722 13 Västerås",
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
  customerType: "tenant" as const,
  moveInDate: "2020-03-15",
  contractNumber: "KT2020-015",
  personalNumber: "19760315-5678",
  address: "Vasagatan 8B, 722 17 Västerås",
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
  customerType: "tenant" as const,
  moveInDate: "2021-11-22",
  contractNumber: "KT2021-122",
  personalNumber: "19911122-9012",
  address: "Karlsgatan 22C, 722 15 Västerås",
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

// Johan Svensson - Privat kund
export const mockJohanSvensson = {
  firstName: "Johan",
  lastName: "Svensson",
  phone: "070-234 56 78",
  email: "johan.svensson@example.com",
  contractStatus: "permanent" as const,
  customerType: "tenant" as const,
  moveInDate: "2019-08-12",
  contractNumber: "KT2019-087",
  personalNumber: "19820812-3456",
  nationality: "Svensk",
  language: "Svenska",
  hasLegalGuardian: false,
  housingContractType: "Tillsvidare",
  portalCredentials: {
    username: "johan.svensson",
    password: "password321"
  },
  loginCount: 67,
  lastLogin: "2024-06-10T11:20:00",
  isPrimaryTenant: true
};

// Lisa Nilsson - Privat kund
export const mockLisaNilsson = {
  firstName: "Lisa",
  lastName: "Nilsson",
  phone: "073-345 67 89",
  email: "lisa.nilsson@example.com",
  contractStatus: "permanent" as const,
  customerType: "tenant" as const,
  moveInDate: "2022-02-28",
  contractNumber: "KT2022-028",
  personalNumber: "19900228-7890",
  nationality: "Svensk",
  language: "Svenska",
  hasLegalGuardian: false,
  housingContractType: "Tillsvidare",
  portalCredentials: {
    username: "lisa.nilsson",
    password: "password654"
  },
  loginCount: 23,
  lastLogin: "2024-06-07T14:45:00",
  isPrimaryTenant: true
};

// Pär Gustafsson - Privat kund
export const mockParGustafsson = {
  firstName: "Pär",
  lastName: "Gustafsson",
  phone: "070-456 78 90",
  email: "par.gustafsson@example.com",
  contractStatus: "terminated" as const,
  customerType: "tenant" as const,
  moveInDate: "2021-05-15",
  moveOutDate: "2024-05-15",
  contractNumber: "KT2021-055",
  personalNumber: "19750515-2345",
  nationality: "Svensk",
  language: "Svenska",
  hasLegalGuardian: false,
  housingContractType: "Korttid",
  portalCredentials: {
    username: "par.gustafsson",
    password: "password987"
  },
  loginCount: 8,
  lastLogin: "2024-05-10T10:30:00",
  isPrimaryTenant: true
};

// Sökande kunder (ännu inte hyresgäster)
export const mockSeekers = [
  {
    firstName: "Sarah",
    lastName: "Blomberg",
    phone: "073-111 22 33",
    email: "sarah.blomberg@example.com",
    customerType: "applicant" as const,
    registrationDate: "2024-05-20",
    personalNumber: "19950425-1122",
    nationality: "Svensk",
    language: "Svenska",
    hasLegalGuardian: false,
    portalCredentials: {
      username: "sarah.blomberg",
      password: "password111"
    },
    loginCount: 5,
    lastLogin: "2024-06-09T12:30:00",
    queuePosition: 456,
    housingInterests: ["1 rum och kök", "2 rum och kök"]
  },
  {
    firstName: "Marcus",
    lastName: "Hedström",
    phone: "070-444 55 66",
    email: "marcus.hedstrom@example.com",
    customerType: "applicant" as const,
    registrationDate: "2024-03-12",
    personalNumber: "19881203-4455",
    nationality: "Svensk",
    language: "Svenska",
    hasLegalGuardian: false,
    portalCredentials: {
      username: "marcus.hedstrom",
      password: "password222"
    },
    loginCount: 18,
    lastLogin: "2024-06-10T08:45:00",
    queuePosition: 234,
    housingInterests: ["2 rum och kök", "3 rum och kök"]
  },
  {
    firstName: "Emma",
    lastName: "Östberg",
    phone: "073-777 88 99",
    email: "emma.ostberg@example.com",
    customerType: "applicant" as const,
    registrationDate: "2024-01-08",
    personalNumber: "19921015-7788",
    nationality: "Svensk",
    language: "Svenska",
    hasLegalGuardian: false,
    portalCredentials: {
      username: "emma.ostberg",
      password: "password333"
    },
    loginCount: 32,
    lastLogin: "2024-06-08T19:20:00",
    queuePosition: 123,
    housingInterests: ["1 rum och kök"]
  }
];

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
  // Först kolla hyresgäster
  switch(id) {
    case "19850101-1234":
      return mockTenant;
    case "19760315-5678":
      return mockErikKarlsson;
    case "19911122-9012":
      return mockMariaLindberg;
    case "19820812-3456":
      return mockJohanSvensson;
    case "19900228-7890":
      return mockLisaNilsson;
    case "19750515-2345":
      return mockParGustafsson;
  }
  
  // Sedan kolla sökande
  const seeker = mockSeekers.find(s => s.personalNumber === id);
  if (seeker) return seeker;
  
  return mockTenant;
};

// Funktion för att hämta alla kunder (både hyresgäster och sökande)
export const getAllCustomers = () => [
  ...getAllTenants(),
  ...mockSeekers
];

// Funktion för att hämta alla hyresgäster
export const getAllTenants = () => [
  mockTenant,
  mockErikKarlsson,
  mockMariaLindberg,
  mockJohanSvensson,
  mockLisaNilsson,
  mockParGustafsson
];

// Funktion för att hämta alla sökande
export const getAllApplicants = () => mockSeekers;

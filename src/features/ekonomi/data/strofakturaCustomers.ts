import { CustomerSearchResult } from "../types/strofaktura";

// Mockdata för kunder med deras hyreskontrakt
export const strofakturaCustomers: CustomerSearchResult[] = [
  {
    customerNumber: "KN2023-001",
    personalNumber: "19850115-4321",
    firstName: "Anna",
    lastName: "Andersson",
    fullName: "Anna Andersson",
    leaseContracts: [
      {
        leaseId: "102-003-99-0001/01",
        objectNumber: "LGH-001-0101",
        propertyName: "Kvarngärdet 1",
        buildingName: "Storgatan 12",
        district: "Centrum",
        address: "Storgatan 12A, 722 15 Västerås"
      }
    ]
  },
  {
    customerNumber: "KN2020-015",
    personalNumber: "19900312-4567",
    firstName: "Erik",
    lastName: "Eriksson",
    fullName: "Erik Eriksson",
    leaseContracts: [
      {
        leaseId: "102-003-99-0002/02",
        objectNumber: "LGH-001-0205",
        propertyName: "Kvarngärdet 1",
        buildingName: "Kungsgatan 5",
        district: "Centrum",
        address: "Kungsgatan 5, 722 14 Västerås"
      },
      {
        leaseId: "102-003-99-0010/01",
        objectNumber: "LGH-003-0302",
        propertyName: "Björken 3",
        buildingName: "Vasagatan 8",
        district: "Öster",
        address: "Vasagatan 8B, 722 17 Västerås"
      }
    ]
  },
  {
    customerNumber: "KN2021-122",
    personalNumber: "19880610-7890",
    firstName: "Maria",
    lastName: "Lindberg",
    fullName: "Maria Lindberg",
    leaseContracts: [
      {
        leaseId: "103-005-99-0003/01",
        objectNumber: "LGH-005-0412",
        propertyName: "Eken 5",
        buildingName: "Parkgatan 22",
        district: "Väster",
        address: "Parkgatan 22C, 722 18 Västerås"
      }
    ]
  },
  {
    customerNumber: "KN2019-087",
    personalNumber: "19750423-1234",
    firstName: "Johan",
    lastName: "Svensson",
    fullName: "Johan Svensson",
    leaseContracts: [
      {
        leaseId: "104-001-99-0004/01",
        objectNumber: "LGH-001-0508",
        propertyName: "Linden 2",
        buildingName: "Drottninggatan 15",
        district: "Norr",
        address: "Drottninggatan 15A, 722 11 Västerås"
      }
    ]
  },
  {
    customerNumber: "KN2022-028",
    personalNumber: "19920815-5678",
    firstName: "Lisa",
    lastName: "Nilsson",
    fullName: "Lisa Nilsson",
    leaseContracts: [
      {
        leaseId: "105-002-99-0005/01",
        objectNumber: "LGH-002-0203",
        propertyName: "Aspen 4",
        buildingName: "Eriksgatan 7",
        district: "Söder",
        address: "Eriksgatan 7B, 722 13 Västerås"
      }
    ]
  }
];

// Sökfunktion för kunder baserat på kundnummer eller personnummer
export const searchStrofakturaCustomers = (query: string): CustomerSearchResult[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return strofakturaCustomers.filter(customer =>
    customer.customerNumber.toLowerCase().includes(searchTerm) ||
    customer.personalNumber.includes(searchTerm) ||
    customer.firstName.toLowerCase().includes(searchTerm) ||
    customer.lastName.toLowerCase().includes(searchTerm) ||
    customer.fullName.toLowerCase().includes(searchTerm)
  );
};

// Hämta kund baserat på kundnummer
export const getCustomerByNumber = (customerNumber: string): CustomerSearchResult | undefined => {
  return strofakturaCustomers.find(c => c.customerNumber === customerNumber);
};

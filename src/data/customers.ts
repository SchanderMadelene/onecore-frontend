
import { getAllTenants, getAllApplicants } from "./tenants";
import type { Customer } from "@/components/rentals/types/parking";

// Utöka befintliga kunder med kundnummer och adress
const createCustomerWithNumber = (tenant: any, customerNumber: string, address: string): Customer => ({
  customerNumber,
  personalNumber: tenant.personalNumber,
  firstName: tenant.firstName,
  lastName: tenant.lastName,
  phone: tenant.phone,
  email: tenant.email,
  customerType: tenant.customerType,
  address // Lägg till adress
});

// Mockdata för kunder med kundnummer och adresser
export const mockCustomers: Customer[] = [
  createCustomerWithNumber(getAllTenants()[0], "KN2023-001", "Storgatan 12, Västerås"), // Anna Andersson
  createCustomerWithNumber(getAllTenants()[1], "KN2020-015", "Vasagatan 8A, Västerås"), // Erik Karlsson
  createCustomerWithNumber(getAllTenants()[2], "KN2021-122", "Kopparbergsvägen 15, Västerås"), // Maria Lindberg
  createCustomerWithNumber(getAllTenants()[3], "KN2019-087", "Ringvägen 23B, Västerås"), // Johan Svensson
  createCustomerWithNumber(getAllTenants()[4], "KN2022-028", "Björkgatan 7, Västerås"), // Lisa Nilsson
  createCustomerWithNumber(getAllTenants()[5], "KN2021-055", "Måsvägen 34, Västerås"), // Pär Gustafsson
  createCustomerWithNumber(getAllApplicants()[0], "KN2024-201", "Tallvägen 11, Västerås"), // Sarah Blomberg
  createCustomerWithNumber(getAllApplicants()[1], "KN2024-134", "Granvägen 6, Västerås"), // Marcus Hedström
  createCustomerWithNumber(getAllApplicants()[2], "KN2024-089", "Ekebacken 19, Västerås"), // Emma Östberg
];

// Sökfunktion för kunder
export const searchCustomers = (query: string): Customer[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return mockCustomers.filter((customer: any) => 
    customer.customerNumber.toLowerCase().includes(searchTerm) ||
    customer.personalNumber.toLowerCase().includes(searchTerm) ||
    customer.firstName.toLowerCase().includes(searchTerm) ||
    customer.lastName.toLowerCase().includes(searchTerm) ||
    (customer.address && customer.address.toLowerCase().includes(searchTerm))
  );
};

// Hämta kund baserat på kundnummer eller personnummer
export const getCustomerById = (id: string): Customer | null => {
  return mockCustomers.find(customer => 
    customer.customerNumber === id || customer.personalNumber === id
  ) || null;
};

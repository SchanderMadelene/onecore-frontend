
import { getAllTenants, getAllApplicants } from "./tenants";
import type { Customer } from "@/features/rentals/components/types/parking";

// Utöka befintliga kunder med kundnummer
const createCustomerWithNumber = (tenant: any, customerNumber: string): Customer => ({
  customerNumber,
  personalNumber: tenant.personalNumber,
  firstName: tenant.firstName,
  lastName: tenant.lastName,
  phone: tenant.phone,
  email: tenant.email,
  customerType: tenant.customerType
});

// Mockdata för kunder med kundnummer
export const mockCustomers: Customer[] = [
  createCustomerWithNumber(getAllTenants()[0], "KN2023-001"), // Anna Andersson
  createCustomerWithNumber(getAllTenants()[1], "KN2020-015"), // Erik Karlsson
  createCustomerWithNumber(getAllTenants()[2], "KN2021-122"), // Maria Lindberg
  createCustomerWithNumber(getAllTenants()[3], "KN2019-087"), // Johan Svensson
  createCustomerWithNumber(getAllTenants()[4], "KN2022-028"), // Lisa Nilsson
  createCustomerWithNumber(getAllTenants()[5], "KN2021-055"), // Pär Gustafsson
  createCustomerWithNumber(getAllApplicants()[0], "KN2024-201"), // Sarah Blomberg
  createCustomerWithNumber(getAllApplicants()[1], "KN2024-134"), // Marcus Hedström
  createCustomerWithNumber(getAllApplicants()[2], "KN2024-089"), // Emma Östberg
];

// Sökfunktion för kunder
export const searchCustomers = (query: string): Customer[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return mockCustomers.filter(customer => 
    customer.customerNumber.toLowerCase().includes(searchTerm) ||
    customer.personalNumber.toLowerCase().includes(searchTerm) ||
    customer.firstName.toLowerCase().includes(searchTerm) ||
    customer.lastName.toLowerCase().includes(searchTerm)
  );
};

// Hämta kund baserat på kundnummer eller personnummer
export const getCustomerById = (id: string): Customer | null => {
  return mockCustomers.find(customer => 
    customer.customerNumber === id || customer.personalNumber === id
  ) || null;
};

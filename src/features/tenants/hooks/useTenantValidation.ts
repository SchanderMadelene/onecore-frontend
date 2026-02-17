import { useState, useEffect } from "react";
import { getCustomerById } from "../data/customers";
import { getMockContractsForTenant } from "../data/contracts";
import type { Customer } from "@/features/rentals/components/types/parking";

// Export the ValidationResult type
export type ValidationResult = 
  | 'ok' 
  | 'no-contract'
  | 'needs-replace-by-property'
  | 'needs-replace-by-residential-area'
  | 'has-at-least-one-parking-space';

export interface TenantValidation {
  customer: Customer;
  validationResult: ValidationResult;
  queuePoints: number;
  hasValidContract: boolean;
  parkingSpaceCount: number;
  hasContractInDistrict: boolean;
  hasUpcomingContractInDistrict: boolean;
  isAboutToLeave: boolean;
}

export const useTenantValidation = (
  customerNumber?: string,
  districtCode?: string,
  rentalObjectCode?: string
) => {
  const [data, setData] = useState<TenantValidation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerNumber || !districtCode || !rentalObjectCode) {
      setData(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      const customer = getCustomerById(customerNumber);
      
      if (!customer) {
        setError("Kund inte hittad");
        setIsLoading(false);
        return;
      }

      const contracts = getMockContractsForTenant(customer.personalNumber);
      const housingContracts = contracts.filter(c => c.type === "housing");
      const parkingContracts = contracts.filter(c => c.type === "parking");
      const activeHousingContracts = housingContracts.filter(c => c.status === "active");

      // Mock district validation - simulate checking if customer has contract in same district
      const hasContractInDistrict = activeHousingContracts.length > 0;
      const hasUpcomingContractInDistrict = false; // Mock - no upcoming contracts in our data
      const isAboutToLeave = customer.customerType === "tenant" && Math.random() < 0.1; // 10% chance mock

      let validationResult: ValidationResult = 'ok';

      // Check if customer is just an applicant
      if (customer.customerType === "applicant") {
        validationResult = 'no-contract';
      }
      // Check if customer has no valid housing contract
      else if (activeHousingContracts.length === 0) {
        validationResult = 'no-contract';
      }
      // Check if customer is about to leave (has termination notice)
      else if (isAboutToLeave) {
        validationResult = 'no-contract';
      }
      // Check if customer has parking spaces already
      else if (parkingContracts.length > 0) {
        // In legacy system, this triggers the need for application type selection
        validationResult = 'has-at-least-one-parking-space';
      }
      // Mock property restrictions - simulate restricted areas/properties
      else if (rentalObjectCode.includes('RESTRICTED') || Math.random() < 0.2) {
        validationResult = 'needs-replace-by-property';
      }
      // Mock residential area restrictions
      else if (!hasContractInDistrict && Math.random() < 0.3) {
        validationResult = 'needs-replace-by-residential-area';
      }

      setData({
        customer,
        validationResult,
        queuePoints: Math.floor(Math.random() * 500) + 100,
        hasValidContract: activeHousingContracts.length > 0,
        parkingSpaceCount: parkingContracts.length,
        hasContractInDistrict,
        hasUpcomingContractInDistrict,
        isAboutToLeave
      });
      
      setIsLoading(false);
    }, 800);
  }, [customerNumber, districtCode, rentalObjectCode]);

  return { data, isLoading, error };
};

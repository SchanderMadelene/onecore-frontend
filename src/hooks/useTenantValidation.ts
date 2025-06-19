
import { useState, useEffect } from "react";
import { getCustomerById } from "@/data/customers";
import { getMockContractsForTenant } from "@/data/contracts";
import type { Customer } from "@/components/rentals/types/parking";

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

      let validationResult: ValidationResult = 'ok';

      // Check if customer is just an applicant
      if (customer.customerType === "applicant") {
        validationResult = 'no-contract';
      }
      // Check if customer has parking spaces
      else if (parkingContracts.length > 0) {
        validationResult = 'has-at-least-one-parking-space';
      }
      // Check if customer has valid housing contract in district
      else if (activeHousingContracts.length === 0) {
        validationResult = 'no-contract';
      }

      setData({
        customer,
        validationResult,
        queuePoints: Math.floor(Math.random() * 500) + 100, // Mock queue points
        hasValidContract: activeHousingContracts.length > 0,
        parkingSpaceCount: parkingContracts.length
      });
      
      setIsLoading(false);
    }, 800);
  }, [customerNumber, districtCode, rentalObjectCode]);

  return { data, isLoading, error };
};

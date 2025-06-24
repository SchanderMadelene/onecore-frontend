
import type { Customer } from "../types/parking";
import type { TenantValidation } from "@/hooks/useTenantValidation";
import { CustomerInformationCard } from "@/components/shared/CustomerInformationCard";

interface CustomerInformationProps {
  customer: Customer;
  tenantValidation: TenantValidation;
}

export const CustomerInformation = ({ customer, tenantValidation }: CustomerInformationProps) => {
  const badge = {
    label: customer.customerType === "tenant" ? "Hyresgäst" : "Sökande",
    variant: customer.customerType === "tenant" ? "default" : "secondary"
  } as const;

  const additionalInfo = tenantValidation.queuePoints ? (
    <p className="text-foreground">
      <span className="font-medium">Köpoäng:</span> {tenantValidation.queuePoints}
    </p>
  ) : null;

  return (
    <CustomerInformationCard 
      customer={customer}
      displayMode="compact"
      badge={badge}
      additionalInfo={additionalInfo}
    />
  );
};

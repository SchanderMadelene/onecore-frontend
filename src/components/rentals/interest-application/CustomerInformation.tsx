
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import type { Customer } from "../types/parking";
import type { TenantValidation } from "@/features/tenants/hooks/useTenantValidation";

interface CustomerInformationProps {
  customer: Customer;
  tenantValidation: TenantValidation;
}

export const CustomerInformation = ({ customer, tenantValidation }: CustomerInformationProps) => {
  const badge = {
    label: customer.customerType === "tenant" ? "Hyresgäst" : "Sökande",
    variant: customer.customerType === "tenant" ? "default" : "secondary"
  } as const;

  const fullName = `${customer.firstName} ${customer.lastName}`;

  return (
    <Card className="bg-muted/30 border-muted">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-semibold text-foreground text-lg">
                {fullName}
              </h3>
              <Badge variant={badge.variant}>
                {badge.label}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm">
              {customer.customerNumber && (
                <p className="text-foreground">
                  <span className="font-medium">Kundnummer:</span> {customer.customerNumber}
                </p>
              )}
              {customer.personalNumber && (
                <p className="text-foreground">
                  <span className="font-medium">Personnummer:</span> {customer.personalNumber}
                </p>
              )}
              {customer.phone && (
                <p className="text-foreground">
                  <span className="font-medium">Telefon:</span> {customer.phone}
                </p>
              )}
              {customer.email && (
                <p className="text-foreground">
                  <span className="font-medium">E-post:</span> {customer.email}
                </p>
              )}
              {tenantValidation.queuePoints && (
                <p className="text-foreground">
                  <span className="font-medium">Köpoäng:</span> {tenantValidation.queuePoints}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

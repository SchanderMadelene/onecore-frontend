
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, X } from "lucide-react";
import type { Customer } from "../types/parking";
import type { TenantValidation } from "@/features/tenants/hooks/useTenantValidation";

interface CustomerInformationProps {
  customer: Customer;
  tenantValidation: TenantValidation;
  onClear?: () => void;
}

export const CustomerInformation = ({ customer, tenantValidation, onClear }: CustomerInformationProps) => {
  // TODO: Stäm av med användaren – ersätt binär badge (Hyresgäst/Sökande) med
  // fulla customerRoles renderade som Tag-komponenter. Möjliga roller:
  // Hyresgäst, Sökande, Andrahandshyresgäst, Kontaktperson, Tidigare hyresgäst,
  // Nyttjare, God man. Se mem://data-model/customer-roles.
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
              <div className="flex items-center gap-2">
                <Badge variant={badge.variant}>
                  {badge.label}
                </Badge>
                {onClear && (
                  <button
                    type="button"
                    onClick={onClear}
                    aria-label="Ta bort vald kund"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
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

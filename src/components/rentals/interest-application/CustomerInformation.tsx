
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import type { Customer } from "../types/parking";
import type { TenantValidation } from "@/hooks/useTenantValidation";

interface CustomerInformationProps {
  customer: Customer;
  tenantValidation: TenantValidation;
}

export const CustomerInformation = ({ customer, tenantValidation }: CustomerInformationProps) => {
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
                {customer.firstName} {customer.lastName}
              </h3>
              <Badge variant={customer.customerType === "tenant" ? "default" : "secondary"}>
                {customer.customerType === "tenant" ? "Hyresgäst" : "Sökande"}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm">
              <p className="text-foreground">
                <span className="font-medium">Kundnummer:</span> {customer.customerNumber}
              </p>
              <p className="text-foreground">
                <span className="font-medium">Personnummer:</span> {customer.personalNumber}
              </p>
              <p className="text-foreground">
                <span className="font-medium">Telefon:</span> {customer.phone}
              </p>
              <p className="text-foreground">
                <span className="font-medium">E-post:</span> {customer.email}
              </p>
              {tenantValidation.queuePosition && (
                <p className="text-foreground">
                  <span className="font-medium">Köpoäng:</span> {tenantValidation.queuePosition}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

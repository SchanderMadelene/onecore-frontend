
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

// Union type for different customer data structures
export type CustomerData = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  nationalRegistrationNumber?: string;
  personalNumber?: string;
  contactCode?: string;
  customerNumber?: string;
  phoneNumber?: string;
  phone?: string;
  email?: string;
  customerType?: "tenant" | "applicant";
};

interface CustomerInformationCardProps {
  customer: CustomerData;
  displayMode?: "full" | "compact" | "card-header";
  title?: string;
  badge?: {
    label: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  additionalInfo?: React.ReactNode;
}

export function CustomerInformationCard({ 
  customer, 
  displayMode = "full",
  title = "Kundinformation",
  badge,
  additionalInfo
}: CustomerInformationCardProps) {
  // Normalize data from different structures
  const fullName = customer.fullName || `${customer.firstName || ''} ${customer.lastName || ''}`.trim();
  const personalNumber = customer.nationalRegistrationNumber || customer.personalNumber;
  const customerNumber = customer.contactCode || customer.customerNumber;
  const phone = customer.phoneNumber || customer.phone;

  const renderContent = () => {
    if (displayMode === "compact") {
      return (
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-semibold text-foreground text-lg">
                {fullName}
              </h3>
              {badge && (
                <Badge variant={badge.variant || "default"}>
                  {badge.label}
                </Badge>
              )}
            </div>
            
            <div className="space-y-1 text-sm">
              {customerNumber && (
                <p className="text-foreground">
                  <span className="font-medium">Kundnummer:</span> {customerNumber}
                </p>
              )}
              {personalNumber && (
                <p className="text-foreground">
                  <span className="font-medium">Personnummer:</span> {personalNumber}
                </p>
              )}
              {phone && (
                <p className="text-foreground">
                  <span className="font-medium">Telefon:</span> {phone}
                </p>
              )}
              {customer.email && (
                <p className="text-foreground">
                  <span className="font-medium">E-post:</span> {customer.email}
                </p>
              )}
              {additionalInfo}
            </div>
          </div>
        </div>
      );
    }

    if (displayMode === "card-header") {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Namn</dt>
              <dd className="text-sm">{fullName}</dd>
            </div>
            {personalNumber && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Personnummer</dt>
                <dd className="text-sm">{personalNumber}</dd>
              </div>
            )}
          </div>
          <div className="space-y-3">
            {customerNumber && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Kundnummer</dt>
                <dd className="text-sm">{customerNumber}</dd>
              </div>
            )}
            {phone && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Telefonnummer</dt>
                <dd className="text-sm">{phone}</dd>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Full mode - table-like layout
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-muted-foreground">Namn</span>
            <span className="text-sm">{fullName}</span>
          </div>
          {personalNumber && (
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">Personnummer</span>
              <span className="text-sm">{personalNumber}</span>
            </div>
          )}
          {customerNumber && (
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">Kundnummer</span>
              <span className="text-sm">{customerNumber}</span>
            </div>
          )}
          {phone && (
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">Telefonnummer</span>
              <span className="text-sm">{phone}</span>
            </div>
          )}
          {customer.email && (
            <div className="flex justify-between">
              <span className="text-sm font-medium text-muted-foreground">E-post</span>
              <span className="text-sm">{customer.email}</span>
            </div>
          )}
        </div>
        {additionalInfo}
      </div>
    );
  };

  if (displayMode === "compact") {
    return (
      <Card className="bg-muted/30 border-muted">
        <CardContent className="p-4">
          {renderContent()}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}

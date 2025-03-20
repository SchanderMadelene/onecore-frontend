
import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { mockTenant } from "@/data/tenants";

interface BasicInformationProps {
  inspectorName: string;
  setInspectorName?: (name: string) => void;
  roomCount: number;
  apartmentInfo?: {
    address: string;
    hasMainKey: boolean;
  };
  tenant?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    contractStatus: "permanent" | "terminated";
    moveInDate: string;
    moveOutDate?: string;
    contractNumber: string;
    personalNumber: string;
  };
}

export function BasicInformation({ 
  inspectorName, 
  setInspectorName,
  roomCount, 
  apartmentInfo,
  tenant = mockTenant // Default to mockTenant if not provided
}: BasicInformationProps) {
  // Format current date with time
  const formatDateWithTime = () => {
    const now = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleString('sv-SE', dateOptions);
  };

  const handleCall = () => {
    if (tenant) {
      window.location.href = `tel:${tenant.phone.replace(/[\s-]/g, '')}`;
    }
  };

  const handleSMS = () => {
    if (tenant) {
      window.location.href = `sms:${tenant.phone.replace(/[\s-]/g, '')}`;
    }
  };

  const handleEmail = () => {
    if (tenant) {
      window.location.href = `mailto:${tenant.email}`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Datum</p>
          <p className="font-medium">{formatDateWithTime()}</p>
        </div>
        {apartmentInfo && (
          <div>
            <p className="text-sm text-muted-foreground">Lägenhet</p>
            <p className="font-medium">{apartmentInfo.address}</p>
          </div>
        )}
        <div>
          <p className="text-sm text-muted-foreground">Antal rum</p>
          <p className="font-medium">{roomCount}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="font-medium">Pågående</p>
        </div>
      </div>

      {/* Tenant information section */}
      {tenant && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-base font-medium mb-3">Hyresgästinformation</h3>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Namn</p>
              <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontraktstatus</p>
              <p className="font-medium">
                {tenant.contractStatus === "permanent" ? "Tillsvidare" : "Uppsagt"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
              <p className="font-medium">{new Date(tenant.moveInDate).toLocaleDateString('sv-SE')}</p>
            </div>
            {tenant.moveOutDate && (
              <div>
                <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
                <p className="font-medium">{new Date(tenant.moveOutDate).toLocaleDateString('sv-SE')}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Telefon</p>
              <div className="flex items-center gap-2">
                <p className="font-medium truncate max-w-[60%]">{tenant.phone}</p>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" onClick={handleCall} title="Ring" className="h-8 w-8">
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleSMS} title="Skicka SMS" className="h-8 w-8">
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">E-post</p>
              <div className="flex items-center gap-2">
                <p className="font-medium truncate max-w-[60%]">{tenant.email}</p>
                <Button variant="outline" size="icon" onClick={handleEmail} title="Skicka e-post" className="h-8 w-8">
                  <Mail className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

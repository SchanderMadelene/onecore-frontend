import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeaseContractTenant } from "../types/leaseContract";

interface LeaseContractActionsProps {
  tenant: LeaseContractTenant | undefined;
}

export function LeaseContractActions({ tenant }: LeaseContractActionsProps) {
  const phoneNumber = tenant?.phoneNumbers?.[0]?.phoneNumber;

  const handleCall = () => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber.replace(/[\s-]/g, '')}`;
    }
  };

  const handleSMS = () => {
    if (phoneNumber) {
      window.location.href = `sms:${phoneNumber.replace(/[\s-]/g, '')}`;
    }
  };

  if (!phoneNumber) {
    return <span className="text-muted-foreground text-sm">Inget telefonnummer</span>;
  }

  return (
    <div className="flex gap-1">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleCall}
        title="Ring"
        className="h-8 w-8"
      >
        <Phone className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleSMS}
        title="Skicka SMS"
        className="h-8 w-8"
      >
        <MessageSquare className="h-4 w-4" />
      </Button>
    </div>
  );
}


import { Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TenantInformationCardProps {
  tenant: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    contractStatus: "permanent" | "temporary" | "terminated";
    moveInDate: string;
    moveOutDate?: string;
    personalNumber?: string;
  };
}

export function TenantInformationCard({ tenant }: TenantInformationCardProps) {
  const handleCall = () => {
    window.location.href = `tel:${tenant.phone.replace(/[\s-]/g, '')}`;
  };

  const handleSMS = () => {
    window.location.href = `sms:${tenant.phone.replace(/[\s-]/g, '')}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${tenant.email}`;
  };

  // Format contract status in Swedish
  const getContractStatus = (status: string) => {
    switch (status) {
      case "permanent": return "Tillsvidare";
      case "temporary": return "Tidsbegränsat";
      case "terminated": return "Uppsagt";
      default: return status;
    }
  };

  return (
    <Card className="border-slate-200">
      <CardContent className="p-4 pt-4">
        <h3 className="font-medium text-lg mb-4">Hyresgästinformation</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Namn</p>
            <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Kontraktstatus</p>
            <p className="font-medium">{getContractStatus(tenant.contractStatus)}</p>
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
              <p className="font-medium">{tenant.phone}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleCall} title="Ring">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleSMS} title="Skicka SMS">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">E-post</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{tenant.email}</p>
              <Button variant="outline" size="icon" onClick={handleEmail} title="Skicka e-post">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {tenant.personalNumber && (
            <div>
              <p className="text-sm text-muted-foreground">Personnummer</p>
              <p className="font-medium">{tenant.personalNumber}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

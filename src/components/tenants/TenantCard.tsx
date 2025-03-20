
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageSquare, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TenantCardProps {
  tenant: {
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

export function TenantCard({ tenant }: TenantCardProps) {
  const handleCall = () => {
    window.location.href = `tel:${tenant.phone.replace(/[\s-]/g, '')}`;
  };

  const handleSMS = () => {
    window.location.href = `sms:${tenant.phone.replace(/[\s-]/g, '')}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${tenant.email}`;
  };

  // Function to mask personal number - show only last 4 digits
  const maskedPersonalNumber = () => {
    const parts = tenant.personalNumber.split('-');
    if (parts.length === 2) {
      return `XXXXXXXX-${parts[1]}`;
    }
    // If no hyphen, mask all but last 4 chars
    return `XXXXXXXX${tenant.personalNumber.slice(-4)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personuppgifter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Namn</p>
              <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Personnummer</p>
              <p className="font-medium">{maskedPersonalNumber()}</p>
            </div>
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
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Kontraktsnummer</p>
              <p className="font-medium">{tenant.contractNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontraktsstatus</p>
              <p className="font-medium">
                {tenant.contractStatus === "permanent" ? "Tillsvidare" : "Uppsagt"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{new Date(tenant.moveInDate).toLocaleDateString('sv-SE')}</p>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            {tenant.moveOutDate && (
              <div>
                <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{new Date(tenant.moveOutDate).toLocaleDateString('sv-SE')}</p>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

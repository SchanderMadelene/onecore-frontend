
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MessageSquare, User } from "lucide-react";

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
    nationality?: string;
    language?: string;
    hasLegalGuardian?: boolean;
    housingContractType?: string;
    portalCredentials?: {
      username: string;
      password: string;
    };
    loginCount?: number;
    lastLogin?: string;
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

  // Format personal number to P-number format
  const formatPersonalNumber = (personalNumber: string) => {
    // Remove any existing formatting and extract just the numbers
    const numbersOnly = personalNumber.replace(/\D/g, '');
    // Take the last 6 digits and prefix with P
    const lastSixDigits = numbersOnly.slice(-6);
    return `P${lastSixDigits.padStart(6, '0')}`;
  };

  const housingContractTypes = [
    "Ungdomslägenhet",
    "Kooperativ",
    "Lätt att leva",
    "Trygghetsboende",
    "Poängfritt",
    "Korttid",
    "Snabb infytt",
    "Renoverad"
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Personuppgifter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Namn</p>
              <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kundnummer/P-nummer</p>
              <p className="font-medium">{formatPersonalNumber(tenant.personalNumber)}</p>
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
            <div>
              <p className="text-sm text-muted-foreground">Språk</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{tenant.language || "Svenska"}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Kontraktsstatus</p>
              <p className="font-medium">
                {tenant.contractStatus === "permanent" ? "Tillsvidare" : "Uppsagt"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontrakttyp bostad</p>
              <Select value={tenant.housingContractType || ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Välj kontrakttyp" />
                </SelectTrigger>
                <SelectContent>
                  {housingContractTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{new Date(tenant.moveInDate).toLocaleDateString('sv-SE')}</p>
              </div>
            </div>
            {tenant.moveOutDate && (
              <div>
                <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{new Date(tenant.moveOutDate).toLocaleDateString('sv-SE')}</p>
                </div>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">God man/Förvaltarskap</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{tenant.hasLegalGuardian ? "Ja" : "Nej"}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Mina Sidor</p>
              <div className="border rounded-md p-3 bg-muted/20 space-y-2 mt-1">
                <div>
                  <p className="text-xs text-muted-foreground">Användarnamn</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{tenant.portalCredentials?.username || "Ej registrerad"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lösenord</p>
                  <p className="font-medium">••••••••</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Antal inloggningar</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{tenant.loginCount || 0}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Senaste inloggning</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">
                  {tenant.lastLogin 
                    ? new Date(tenant.lastLogin).toLocaleDateString('sv-SE', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : "Aldrig"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

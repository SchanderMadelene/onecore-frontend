
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Phone, Mail, MessageSquare, User, Users, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TenantCardProps {
  tenant: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    customerType: "tenant" | "applicant";
    contractStatus?: "permanent" | "terminated";
    moveInDate?: string;
    moveOutDate?: string;
    contractNumber?: string;
    personalNumber: string;
    address?: string;
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
    registrationDate?: string;
    queuePosition?: number;
    housingInterests?: string[];
  };
}

export function TenantCard({ tenant }: TenantCardProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

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
    const numbersOnly = personalNumber.replace(/\D/g, '');
    const lastSixDigits = numbersOnly.slice(-6);
    return `P${lastSixDigits.padStart(6, '0')}`;
  };

  const cardContent = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Namn</p>
          <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Personnummer</p>
          <p className="font-medium">{tenant.personalNumber}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Bostadsadress</p>
          <p className="font-medium">{tenant.address}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Kundnummer</p>
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
      </div>
      
      <div className="space-y-4">
        {tenant.customerType === "applicant" && (
          <>
            <div>
              <p className="text-sm text-muted-foreground">Registreringsdatum</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{tenant.registrationDate ? new Date(tenant.registrationDate).toLocaleDateString('sv-SE') : "Ej angivet"}</p>
              </div>
            </div>
            {tenant.queuePosition && (
              <div>
                <p className="text-sm text-muted-foreground">Köposition</p>
                <p className="font-medium">#{tenant.queuePosition}</p>
              </div>
            )}
            {tenant.housingInterests && tenant.housingInterests.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Intresseanmälningar</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tenant.housingInterests.map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </>
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
  );

  if (isMobile) {
    return (
      <Card>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <div className="w-full cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-left">
                      {tenant.customerType === "tenant" ? "Hyresgäst" : "Sökande"}
                    </CardTitle>
                    <div className="space-y-1 mt-2">
                      <p className="text-sm font-medium">{tenant.address}</p>
                      <p className="text-sm text-muted-foreground">{formatPersonalNumber(tenant.personalNumber)} • {tenant.phone}</p>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="border-t border-border mx-6 mb-4"></div>
            <CardContent>
              {cardContent}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>
          {tenant.customerType === "tenant" ? "Hyresgäst" : "Sökande"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cardContent}
      </CardContent>
    </Card>
  );
}

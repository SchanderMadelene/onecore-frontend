
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, User, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Uppdaterad typ för att stödja flera hyresgäster och relationsstyper
interface Tenant {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contractStatus: "permanent" | "temporary" | "terminated";
  moveInDate: string;
  moveOutDate?: string;
  contractNumber: string;
  personalNumber: string;
  isPrimaryTenant?: boolean;
  relationshipType?: "sambo" | "primaryTenant" | "secondaryTenant";
}

interface TenantInformationProps {
  tenant: Tenant | Tenant[];
}

export function TenantInformation({ tenant }: TenantInformationProps) {
  // Konvertera till en array om det bara är en hyresgäst
  const tenants = Array.isArray(tenant) ? tenant : [tenant];
  const primaryTenant = tenants.find(t => t.isPrimaryTenant) || tenants[0];
  const additionalTenants = tenants.filter(t => t !== primaryTenant);
  
  // Avgör vilken typ av kontraktsrelation vi har
  const isSecondaryRental = tenants.some(t => t.relationshipType === "secondaryTenant");
  
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/[\s-]/g, '')}`;
  };

  const handleSMS = (phone: string) => {
    window.location.href = `sms:${phone.replace(/[\s-]/g, '')}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  // Helper function för att visa rätt etikett baserat på relationshipType
  const getTenantTypeLabel = (tenant: Tenant) => {
    if (tenant.relationshipType === "primaryTenant") return "Förstahandshyresgäst";
    if (tenant.relationshipType === "secondaryTenant") return "Andrahandshyresgäst";
    if (tenant.relationshipType === "sambo") {
      return tenant.isPrimaryTenant ? "Primär hyresgäst" : "Sambo/Partner";
    }
    return tenant.isPrimaryTenant ? "Primär hyresgäst" : "Ytterligare hyresgäst";
  };

  // Helper function för att visa rätt badge för kontraktsstatus
  const getContractStatusBadge = (status: string) => {
    switch(status) {
      case "permanent":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Tillsvidare</Badge>;
      case "temporary":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Tidsbegränsat</Badge>;
      case "terminated":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Uppsagt</Badge>;
      default:
        return <Badge variant="outline">Okänd</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {tenants.length > 1 && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Kontraktsinformation</h3>
          {isSecondaryRental ? (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Andrahandsuthyrning
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {tenants.length} personer på kontraktet
            </Badge>
          )}
        </div>
      )}
      
      <div className="space-y-6">
        {/* Primär hyresgäst */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-slate-500" />
              <h4 className="font-medium">{getTenantTypeLabel(primaryTenant)}</h4>
            </div>
            <Button variant="outline" asChild className="shrink-0">
              <Link to={`/tenants/detail/${primaryTenant.personalNumber}`}>
                <User className="h-4 w-4 mr-2" />
                Öppna kundkort
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Namn</p>
                <p className="font-medium">{primaryTenant.firstName} {primaryTenant.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kontraktstatus</p>
                <div className="flex items-center gap-2">
                  {getContractStatusBadge(primaryTenant.contractStatus)}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{new Date(primaryTenant.moveInDate).toLocaleDateString('sv-SE')}</p>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              {primaryTenant.moveOutDate && (
                <div>
                  <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{new Date(primaryTenant.moveOutDate).toLocaleDateString('sv-SE')}</p>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Telefon</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{primaryTenant.phone}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleCall(primaryTenant.phone)} title="Ring">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleSMS(primaryTenant.phone)} title="Skicka SMS">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">E-post</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{primaryTenant.email}</p>
                  <Button variant="outline" size="icon" onClick={() => handleEmail(primaryTenant.email)} title="Skicka e-post">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Personnummer</p>
                <p className="font-medium">{primaryTenant.personalNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kontraktsnummer</p>
                <p className="font-medium">{primaryTenant.contractNumber}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ytterligare hyresgäster om det finns några */}
        {additionalTenants.length > 0 && (
          <>
            <Separator />
            {additionalTenants.map((additionalTenant, index) => (
              <div key={additionalTenant.personalNumber} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-slate-500" />
                    <h4 className="font-medium">{getTenantTypeLabel(additionalTenant)}</h4>
                  </div>
                  <Button variant="outline" asChild className="shrink-0">
                    <Link to={`/tenants/detail/${additionalTenant.personalNumber}`}>
                      <User className="h-4 w-4 mr-2" />
                      Öppna kundkort
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Namn</p>
                      <p className="font-medium">{additionalTenant.firstName} {additionalTenant.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Kontraktstatus</p>
                      <div className="flex items-center gap-2">
                        {getContractStatusBadge(additionalTenant.contractStatus)}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{new Date(additionalTenant.moveInDate).toLocaleDateString('sv-SE')}</p>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    {additionalTenant.moveOutDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{new Date(additionalTenant.moveOutDate).toLocaleDateString('sv-SE')}</p>
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Telefon</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{additionalTenant.phone}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleCall(additionalTenant.phone)} title="Ring">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleSMS(additionalTenant.phone)} title="Skicka SMS">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">E-post</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{additionalTenant.email}</p>
                        <Button variant="outline" size="icon" onClick={() => handleEmail(additionalTenant.email)} title="Skicka e-post">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Personnummer</p>
                      <p className="font-medium">{additionalTenant.personalNumber}</p>
                    </div>
                    {additionalTenant.relationshipType === "secondaryTenant" && (
                      <div>
                        <p className="text-sm text-muted-foreground">Kontraktsnummer</p>
                        <p className="font-medium">{additionalTenant.contractNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

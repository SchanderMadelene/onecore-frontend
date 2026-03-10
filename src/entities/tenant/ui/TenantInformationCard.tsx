import { Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabLayout } from "@/components/ui/tab-layout";
import { Notes } from "@/components/common";
import { CollapsibleInfoCard } from "@/shared/ui/collapsible-info-card";

interface TenantData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contractStatus: "permanent" | "temporary" | "terminated";
  moveInDate: string;
  moveOutDate?: string;
  personalNumber?: string;
  isPrimaryTenant?: boolean;
  relationshipType?: string;
}

interface TenantInformationCardProps {
  tenant: TenantData | TenantData[];
  displayMode?: "full" | "compact";
}

export function TenantInformationCard({ tenant, displayMode = "full" }: TenantInformationCardProps) {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/[\s-]/g, '')}`;
  };

  const handleSMS = (phone: string) => {
    window.location.href = `sms:${phone.replace(/[\s-]/g, '')}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const getContractStatus = (status: string) => {
    switch (status) {
      case "permanent": return "Tillsvidare";
      case "temporary": return "Andrahandsuthyrning";
      case "terminated": return "Uppsagt";
      default: return status;
    }
  };

  const isMultipleTenants = Array.isArray(tenant);
  const tenants = isMultipleTenants ? tenant : [tenant];
  const isSecondHandRental = tenants.some(t => t.contractStatus === "temporary");

  const titleContent = (
    <div className="flex items-center gap-3">
      <span>Hyresgästinformation</span>
      {isSecondHandRental && (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
          Andrahandsuthyrning
        </Badge>
      )}
    </div>
  );

  const previewContent = (
    <div className="space-y-1">
      {tenants.map((t, i) => (
        <div key={i} className="flex items-center justify-between text-sm">
          <span className="font-medium">{t.firstName} {t.lastName}</span>
          <span className="text-muted-foreground">{getContractStatus(t.contractStatus)}</span>
        </div>
      ))}
    </div>
  );

  const renderTenantInfo = (tenantData: TenantData, index: number) => {
    const isSecondaryTenant = tenantData.contractStatus === "temporary";
    
    return (
      <div key={index} className="space-y-4">
        {isMultipleTenants && (
          <div className="mb-3">
            <h4 className="font-medium text-base">
              {tenantData.contractStatus === "temporary" 
                ? "Andrahandsuthyrning"
                : (tenantData.isPrimaryTenant ? "Kontraktsinnehavare" : "Hyresgäst")
              }
            </h4>
          </div>
        )}
        
        <div>
          <p className="text-sm text-muted-foreground">Namn</p>
          <p className="font-medium">{tenantData.firstName} {tenantData.lastName}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Kontraktstatus</p>
          <p className="font-medium">{getContractStatus(tenantData.contractStatus)}</p>
        </div>
        
        {tenantData.personalNumber && !isSecondaryTenant && (
          <div>
            <p className="text-sm text-muted-foreground">Personnummer</p>
            <p className="font-medium">{tenantData.personalNumber}</p>
          </div>
        )}
        
        <div>
          <p className="text-sm text-muted-foreground">Telefon</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{tenantData.phone}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => handleCall(tenantData.phone)} title="Ring">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleSMS(tenantData.phone)} title="Skicka SMS">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">E-post</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{tenantData.email}</p>
            <Button variant="outline" size="icon" onClick={() => handleEmail(tenantData.email)} title="Skicka e-post">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
          <p className="font-medium">{new Date(tenantData.moveInDate).toLocaleDateString('sv-SE')}</p>
        </div>
        
        {tenantData.moveOutDate && (
          <div>
            <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
            <p className="font-medium">{new Date(tenantData.moveOutDate).toLocaleDateString('sv-SE')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <CollapsibleInfoCard
      title={titleContent}
      previewContent={previewContent}
    >
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-slate-100/70 p-1 rounded-lg overflow-x-auto">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="notes">Noteringar</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <TabLayout title="Information" showCard={true}>
            <div className="space-y-6">
              {tenants.map((tenantData, index) => (
                <div key={index}>
                  {renderTenantInfo(tenantData, index)}
                  {index < tenants.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
          </TabLayout>
        </TabsContent>
        
        <TabsContent value="notes">
          <TabLayout title="Noteringar" showCard={true}>
            <Notes
              entityType="tenant"
              entityId="current-tenant"
              placeholder="Skriv din notering här..."
              emptyMessage="Inga noteringar har lagts till för denna hyresgäst ännu."
            />
          </TabLayout>
        </TabsContent>
      </Tabs>
    </CollapsibleInfoCard>
  );
}

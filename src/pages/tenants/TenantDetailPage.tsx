
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { TenantCard } from "@/components/tenants/TenantCard";
import { TenantContracts } from "@/components/tenants/TenantContracts";
import { mockTenant } from "@/data/tenants";
import { getMockContractsForTenant } from "@/data/contracts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Wallet, Key, Bell, FileWarning, CircleAlert, Users, StickyNote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TenantQueueSystem } from "@/components/tenants/TenantQueueSystem";
import { TenantNotes } from "@/components/tenants/TenantNotes";

const TenantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const tenantId = id || mockTenant.personalNumber;
  const contracts = getMockContractsForTenant(tenantId);
  
  // This would typically come from API data
  const hasActiveCases = true;

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">
          {mockTenant.firstName} {mockTenant.lastName}
        </h1>
        <p className="text-muted-foreground mb-6">
          Kundkort för hyresgäst med personnummer {tenantId}
        </p>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <TenantCard tenant={mockTenant} />
        </div>

        <Tabs defaultValue="contracts" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="contracts" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              Kontrakt
            </TabsTrigger>
            <TabsTrigger value="queue" className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              Kösystem
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-1.5">
              <FileWarning className="h-4 w-4" />
              Ärenden
              {hasActiveCases && (
                <Badge 
                  variant="outline" 
                  className="ml-1.5 py-0 px-1.5 h-5 text-[10px] font-semibold bg-slate-200 text-slate-700 border-slate-300"
                >
                  1
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="ledger" className="flex items-center gap-1.5">
              <Wallet className="h-4 w-4" />
              Kundreskontra
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-1.5">
              <StickyNote className="h-4 w-4" />
              Noteringar
            </TabsTrigger>
            <TabsTrigger value="keys" className="flex items-center gap-1.5">
              <Key className="h-4 w-4" />
              Nycklar
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-1.5">
              <Bell className="h-4 w-4" />
              Händelselogg
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              Dokument
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contracts">
            <TenantContracts contracts={contracts} />
          </TabsContent>
          
          <TabsContent value="events">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Händelselogg</h3>
              <p className="text-muted-foreground">Ingen händelsehistorik tillgänglig för denna kund.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="cases">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Ärenden</h3>
              {hasActiveCases ? (
                <div className="p-4 border border-red-200 bg-red-50 rounded-md mb-4">
                  <div className="flex items-start gap-3">
                    <CircleAlert className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-800 mb-1">Vattenläcka i kök</h4>
                      <p className="text-sm text-red-700">Rapporterad: 2023-08-15</p>
                      <p className="text-sm text-red-700">Status: Pågående</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Inga ärenden registrerade för denna kund.</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="queue">
            <TenantQueueSystem />
          </TabsContent>
          
          <TabsContent value="notes">
            <TenantNotes />
          </TabsContent>
          
          <TabsContent value="ledger">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Kundreskontra</h3>
              <p className="text-muted-foreground">Ingen information om kundreskontra tillgänglig.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="keys">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Nycklar</h3>
              <p className="text-muted-foreground">Inga nycklar registrerade för denna kund.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Dokument</h3>
              <p className="text-muted-foreground">Inga dokument tillgängliga för denna kund.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TenantDetailPage;

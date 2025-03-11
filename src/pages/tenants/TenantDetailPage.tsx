
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { TenantCard } from "@/components/tenants/TenantCard";
import { TenantContracts } from "@/components/tenants/TenantContracts";
import { mockTenant } from "@/data/tenants";
import { getMockContractsForTenant } from "@/data/contracts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Wallet, Key, Bell, FileWarning, CircleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="contracts" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              Kontrakt
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-1.5">
              <Bell className="h-4 w-4" />
              Händelselogg
            </TabsTrigger>
            <TabsTrigger value="cases" className="relative flex items-center gap-1.5">
              {hasActiveCases && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
              <FileWarning className="h-4 w-4" />
              Ärenden
              {hasActiveCases && (
                <Badge 
                  variant="destructive" 
                  className="ml-1.5 py-0 px-1.5 h-5 text-[10px] font-semibold"
                >
                  1
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="ledger" className="flex items-center gap-1.5">
              <Wallet className="h-4 w-4" />
              Kundreskontra
            </TabsTrigger>
            <TabsTrigger value="keys" className="flex items-center gap-1.5">
              <Key className="h-4 w-4" />
              Nycklar
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              Dokument
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contracts" className="mt-0">
            <TenantContracts contracts={contracts} />
          </TabsContent>
          
          <TabsContent value="events" className="mt-0">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Händelselogg</h3>
              <p className="text-muted-foreground">Ingen händelsehistorik tillgänglig för denna kund.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="cases" className="mt-0">
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
          
          <TabsContent value="ledger" className="mt-0">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Kundreskontra</h3>
              <p className="text-muted-foreground">Ingen information om kundreskontra tillgänglig.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="keys" className="mt-0">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Nycklar</h3>
              <p className="text-muted-foreground">Inga nycklar registrerade för denna kund.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
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

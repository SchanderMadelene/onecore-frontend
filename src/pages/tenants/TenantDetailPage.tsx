
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { TenantCard } from "@/components/tenants/TenantCard";
import { TenantContracts } from "@/components/tenants/TenantContracts";
import { mockTenant } from "@/data/tenants";
import { getMockContractsForTenant } from "@/data/contracts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Wallet, Key, Bell, FileWarning, Users, StickyNote, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TenantQueueSystem } from "@/components/tenants/TenantQueueSystem";
import { TenantNotes } from "@/components/tenants/TenantNotes";
import { TenantOrders } from "@/components/tenants/TenantOrders";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

const TenantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { features } = useFeatureToggles();
  const tenantId = id || mockTenant.personalNumber;
  const contracts = getMockContractsForTenant(tenantId);
  
  // This would typically come from API data
  const hasActiveCases = true;

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <TooltipProvider>
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-bold">
              {mockTenant.firstName} {mockTenant.lastName}
            </h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full border border-amber-200 cursor-help">
                  <TriangleAlert className="h-4 w-4 text-amber-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Åk aldrig ensam till kund. Ta alltid med dig en kollega vid hembesök.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <TenantCard tenant={mockTenant} />
        </div>

        <Tabs defaultValue="contracts" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="contracts" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              Hyreskontrakt
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
                  2
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
              Nyckelknippa
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
            {features.showTenantContracts ? (
              <TenantContracts contracts={contracts} />
            ) : (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <p className="text-slate-500">
                  För att se hyreskontrakt, aktivera funktionen i inställningarna.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="events">
            {features.showTenantEvents ? (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Händelselogg</h3>
                <p className="text-muted-foreground">Ingen händelsehistorik tillgänglig för denna kund.</p>
              </div>
            ) : (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <p className="text-slate-500">
                  För att se händelselogg, aktivera funktionen i inställningarna.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cases">
            {features.showTenantCases ? (
              <TenantOrders />
            ) : (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <p className="text-slate-500">
                  För att se ärenden, aktivera funktionen i inställningarna.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="queue">
            {features.showTenantQueue ? (
              <TenantQueueSystem />
            ) : (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <p className="text-slate-500">
                  För att se kösystem, aktivera funktionen i inställningarna.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="notes">
            {features.showTenantNotes ? (
              <TenantNotes />
            ) : (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <p className="text-slate-500">
                  För att se noteringar, aktivera funktionen i inställningarna.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ledger">
            {features.showTenantLedger ? (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Kundreskontra</h3>
                <p className="text-muted-foreground">Ingen information om kundreskontra tillgänglig.</p>
              </div>
            ) : (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <p className="text-slate-500">
                  För att se kundreskontra, aktivera funktionen i inställningarna.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="keys">
            {features.showTenantKeys ? (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Nycklar</h3>
                <p className="text-muted-foreground">Inga nycklar registrerade för denna kund.</p>
              </div>
            ) : (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <p className="text-slate-500">
                  För att se nycklar, aktivera funktionen i inställningarna.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="documents">
            {features.showTenantDocuments ? (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Dokument</h3>
                <p className="text-muted-foreground">Inga dokument tillgängliga för denna kund.</p>
              </div>
            ) : (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <p className="text-slate-500">
                  För att se dokument, aktivera funktionen i inställningarna.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TenantDetailPage;

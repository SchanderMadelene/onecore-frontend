import { TabsContent } from "@/components/ui/tabs";
import { TenantContracts } from "@/components/tenants/TenantContracts";
import { TenantQueueSystem } from "@/components/tenants/TenantQueueSystem";
import { TenantNotes } from "@/components/tenants/TenantNotes";
import { TenantOrders } from "@/components/tenants/TenantOrders";
import { TenantEventLog } from "@/components/tenants/TenantEventLog";
import { TenantDocuments } from "@/components/tenants/TenantDocuments";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

interface TenantDetailTabsContentProps {
  contracts: any[];
  personalNumber?: string;
  customerNumber: string;
  customerName: string;
}

const FeatureGatedTabContent = ({ 
  isEnabled, 
  fallbackMessage, 
  children 
}: { 
  isEnabled: boolean; 
  fallbackMessage: string; 
  children: React.ReactNode; 
}) => {
  if (!isEnabled) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <p className="text-slate-500">{fallbackMessage}</p>
      </div>
    );
  }
  return <>{children}</>;
};

export const TenantDetailTabsContent = ({ contracts, personalNumber, customerNumber, customerName }: TenantDetailTabsContentProps) => {
  const { features } = useFeatureToggles();

  return (
    <>
      <TabsContent value="contracts">
        <FeatureGatedTabContent
          isEnabled={features.showTenantContracts}
          fallbackMessage="För att se hyreskontrakt, aktivera funktionen i inställningarna."
        >
          <TenantContracts contracts={contracts} />
        </FeatureGatedTabContent>
      </TabsContent>

      <TabsContent value="queue">
        <FeatureGatedTabContent
          isEnabled={features.showTenantQueue}
          fallbackMessage="För att se kösystem, aktivera funktionen i inställningarna."
        >
          <TenantQueueSystem customerNumber={customerNumber} customerName={customerName} />
        </FeatureGatedTabContent>
      </TabsContent>

      <TabsContent value="cases">
        <FeatureGatedTabContent
          isEnabled={features.showTenantCases}
          fallbackMessage="För att se ärenden, aktivera funktionen i inställningarna."
        >
          <TenantOrders />
        </FeatureGatedTabContent>
      </TabsContent>

      <TabsContent value="ledger">
        <FeatureGatedTabContent
          isEnabled={features.showTenantLedger}
          fallbackMessage="För att se kundreskontra, aktivera funktionen i inställningarna."
        >
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Kundreskontra</h3>
            <p className="text-muted-foreground">Ingen information om kundreskontra tillgänglig.</p>
          </div>
        </FeatureGatedTabContent>
      </TabsContent>

      <TabsContent value="notes">
        <FeatureGatedTabContent
          isEnabled={features.showTenantNotes}
          fallbackMessage="För att se noteringar, aktivera funktionen i inställningarna."
        >
          <TenantNotes />
        </FeatureGatedTabContent>
      </TabsContent>

      <TabsContent value="keys">
        <FeatureGatedTabContent
          isEnabled={features.showTenantKeys}
          fallbackMessage="För att se nycklar, aktivera funktionen i inställningarna."
        >
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Nycklar</h3>
            <p className="text-muted-foreground">Inga nycklar registrerade för denna kund.</p>
          </div>
        </FeatureGatedTabContent>
      </TabsContent>

      <TabsContent value="events">
        <FeatureGatedTabContent
          isEnabled={features.showTenantEvents}
          fallbackMessage="För att se händelselogg, aktivera funktionen i inställningarna."
        >
          <TenantEventLog personalNumber={personalNumber || ""} />
        </FeatureGatedTabContent>
      </TabsContent>

      <TabsContent value="documents">
        <FeatureGatedTabContent
          isEnabled={features.showTenantDocuments}
          fallbackMessage="För att se dokument, aktivera funktionen i inställningarna."
        >
          <TenantDocuments />
        </FeatureGatedTabContent>
      </TabsContent>
    </>
  );
};
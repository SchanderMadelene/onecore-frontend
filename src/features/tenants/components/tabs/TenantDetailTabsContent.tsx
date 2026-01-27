import { TabsContent } from "@/components/ui/tabs";
import { TenantContracts } from "../TenantContracts";
import { TenantQueueSystem } from "../TenantQueueSystem";
import { TenantNotes } from "../TenantNotes";
import { TenantOrders } from "../TenantOrders";
import { TenantEventLog } from "../TenantEventLog";
import { TenantDocuments } from "../TenantDocuments";
import { TenantLedger } from "../TenantLedger";
import { TenantKeys } from "../TenantKeys";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { StickyNote } from "lucide-react";
import { getMockLedgerForCustomer } from "@/data/ledger";
import { getMockInvoicesForCustomer } from "@/data/invoices";

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
          <TenantQueueSystem 
            customerNumber={customerNumber} 
            customerName={customerName}
            personalNumber={personalNumber}
          />
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
          <TenantLedger 
            ledger={getMockLedgerForCustomer(personalNumber || customerNumber)} 
            invoices={getMockInvoicesForCustomer(personalNumber || customerNumber)}
          />
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
          <TenantKeys />
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
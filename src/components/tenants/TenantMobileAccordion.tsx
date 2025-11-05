import { TenantContracts } from "./TenantContracts";
import { TenantQueueSystem } from "./TenantQueueSystem";
import { TenantNotes } from "./TenantNotes";
import { TenantOrders } from "./TenantOrders";
import { TenantLedger } from "./TenantLedger";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { MobileAccordion as GenericMobileAccordion, MobileAccordionItem } from "@/components/ui/mobile-accordion";
import { getMockLedgerForCustomer } from "@/data/ledger";
import { getMockInvoicesForCustomer } from "@/data/invoices";

interface TenantMobileAccordionProps {
  contracts: any[];
  hasActiveCases?: boolean;
  customerNumber: string;
  customerName: string;
  customerRoles?: string[];
}

export function TenantMobileAccordion({ contracts, hasActiveCases, customerNumber, customerName, customerRoles = [] }: TenantMobileAccordionProps) {
  const { features } = useFeatureToggles();
  
  // Kund är bara sökande om de bara har rollen "Sökande" och inga andra roller
  const isApplicantOnly = customerRoles.length === 1 && customerRoles.includes("Sökande");
  
  const accordionItems: MobileAccordionItem[] = [
    {
      id: "contracts",
      title: "Hyreskontrakt",
      disabled: isApplicantOnly,
      content: features.showTenantContracts ? (
        <TenantContracts contracts={contracts} />
      ) : (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-slate-500">
            För att se hyreskontrakt, aktivera funktionen i inställningarna.
          </p>
        </div>
      )
    },
    {
      id: "queue",
      title: "Kösystem",
      content: features.showTenantQueue ? (
        <TenantQueueSystem customerNumber={customerNumber} customerName={customerName} />
      ) : (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-slate-500">
            För att se kösystem, aktivera funktionen i inställningarna.
          </p>
        </div>
      )
    },
    {
      id: "cases",
      title: hasActiveCases ? `Ärenden (2)` : "Ärenden",
      disabled: isApplicantOnly,
      content: features.showTenantCases ? (
        <TenantOrders />
      ) : (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-slate-500">
            För att se ärenden, aktivera funktionen i inställningarna.
          </p>
        </div>
      )
    },
    {
      id: "ledger",
      title: "Fakturor & betalningar",
      disabled: isApplicantOnly,
      content: features.showTenantLedger ? (
        <TenantLedger 
          ledger={getMockLedgerForCustomer(customerNumber)} 
          invoices={getMockInvoicesForCustomer(customerNumber)}
        />
      ) : (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-slate-500">
            För att se kundreskontra, aktivera funktionen i inställningarna.
          </p>
        </div>
      )
    },
    {
      id: "notes",
      title: "Noteringar",
      disabled: isApplicantOnly,
      content: features.showTenantNotes ? (
        <TenantNotes />
      ) : (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-slate-500">För att se noteringar, aktivera funktionen i inställningarna.</p>
        </div>
      ),
    },
    {
      id: "keys",
      title: "Nyckelknippa",
      disabled: isApplicantOnly,
      content: features.showTenantKeys ? (
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
      )
    },
    {
      id: "events",
      title: "Händelselogg",
      content: features.showTenantEvents ? (
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
      )
    },
    {
      id: "documents",
      title: "Dokument",
      content: features.showTenantDocuments ? (
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
      )
    }
  ];
  
  return (
    <GenericMobileAccordion 
      items={accordionItems}
      defaultOpen={isApplicantOnly ? ["queue"] : ["contracts"]}
      className="space-y-3"
    />
  );
}
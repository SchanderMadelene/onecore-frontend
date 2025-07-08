import { FileText, Wallet, Key, Bell, FileWarning, Users, StickyNote, MessageSquare, Calendar } from "lucide-react";
import { TenantContracts } from "./TenantContracts";
import { TenantQueueSystem } from "./TenantQueueSystem";
import { TenantNotes } from "./TenantNotes";
import { TenantOrders } from "./TenantOrders";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { MobileAccordion as GenericMobileAccordion, MobileAccordionItem } from "@/components/ui/mobile-accordion";

interface TenantMobileAccordionProps {
  contracts: any[];
  hasActiveCases?: boolean;
}

export function TenantMobileAccordion({ contracts, hasActiveCases }: TenantMobileAccordionProps) {
  const { features } = useFeatureToggles();
  
  const accordionItems: MobileAccordionItem[] = [
    {
      id: "contracts",
      icon: FileText,
      title: "Hyreskontrakt",
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
      icon: Users,
      title: "Kösystem",
      content: features.showTenantQueue ? (
        <TenantQueueSystem />
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
      icon: MessageSquare,
      title: hasActiveCases ? `Ärenden (2)` : "Ärenden",
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
      icon: Wallet,
      title: "Kundreskontra",
      content: features.showTenantLedger ? (
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
      )
    },
    {
      id: "notes",
      icon: StickyNote,
      title: "Noteringar",
      content: features.showTenantNotes ? (
        <TenantNotes />
      ) : (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p className="text-slate-500">
            För att se noteringar, aktivera funktionen i inställningarna.
          </p>
        </div>
      )
    },
    {
      id: "keys",
      icon: Key,
      title: "Nyckelknippa",
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
      icon: Calendar,
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
      icon: FileWarning,
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
      defaultOpen={["contracts"]}
      className="space-y-3"
    />
  );
}
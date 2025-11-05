import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TenantDetailTabsProps {
  defaultValue: string;
  children: React.ReactNode;
  hasActiveCases?: boolean;
  customerRoles?: string[];
}

export const TenantDetailTabs = ({ defaultValue, children, hasActiveCases, customerRoles = [] }: TenantDetailTabsProps) => {
  // Kund är bara sökande om de bara har rollen "Sökande" och inga andra roller
  const isApplicantOnly = customerRoles.length === 1 && customerRoles.includes("Sökande");
  
  return (
    <Tabs defaultValue={defaultValue} className="space-y-6">
      <TabsList className="bg-slate-100/70 p-1 rounded-lg overflow-x-auto">
        <TabsTrigger value="contracts" disabled={isApplicantOnly}>
          Hyreskontrakt
        </TabsTrigger>
        <TabsTrigger value="queue">
          Kösystem
        </TabsTrigger>
        <TabsTrigger value="cases" disabled={isApplicantOnly}>
          {hasActiveCases ? "Ärenden (2)" : "Ärenden"}
        </TabsTrigger>
        <TabsTrigger value="ledger" disabled={isApplicantOnly}>
          Fakturor & betalningar
        </TabsTrigger>
        <TabsTrigger value="notes" disabled={isApplicantOnly}>
          Noteringar
        </TabsTrigger>
        <TabsTrigger value="keys" disabled={isApplicantOnly}>
          Nyckelknippa
        </TabsTrigger>
        <TabsTrigger value="events">
          Händelselogg
        </TabsTrigger>
        <TabsTrigger value="documents">
          Dokument
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};
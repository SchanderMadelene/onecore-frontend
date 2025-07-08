import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Wallet, Key, Bell, FileWarning, Users, StickyNote, MessageSquare, Calendar } from "lucide-react";

interface TenantDetailTabsProps {
  defaultValue: string;
  children: React.ReactNode;
  hasActiveCases?: boolean;
}

export const TenantDetailTabs = ({ defaultValue, children, hasActiveCases }: TenantDetailTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="mb-4 bg-slate-100/70 p-1 rounded-lg">
        <TabsTrigger value="contracts" className="flex items-center gap-1.5">
          <FileText className="h-4 w-4" />
          Hyreskontrakt
        </TabsTrigger>
        <TabsTrigger value="queue" className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          Kösystem
        </TabsTrigger>
        <TabsTrigger value="cases" className="flex items-center gap-1.5">
          <MessageSquare className="h-4 w-4" />
          {hasActiveCases ? "Ärenden (2)" : "Ärenden"}
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
          <Calendar className="h-4 w-4" />
          Händelselogg
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center gap-1.5">
          <FileWarning className="h-4 w-4" />
          Dokument
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, ClipboardList, Users, MessageSquare, FileImage, FileText } from "lucide-react";

interface ResidenceTabsListProps {
  defaultValue: string;
  children: React.ReactNode;
}

export const ResidenceTabsList = ({ defaultValue, children }: ResidenceTabsListProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="mb-4 bg-slate-100/70 p-1 rounded-lg">
        <TabsTrigger value="info" className="flex items-center gap-1.5">
          <Info className="h-4 w-4" />
          Rumsinformation
        </TabsTrigger>
        <TabsTrigger value="floorplan" className="flex items-center gap-1.5">
          <FileImage className="h-4 w-4" />
          Planritning
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center gap-1.5">
          <FileText className="h-4 w-4" />
          Dokument
        </TabsTrigger>
        <TabsTrigger value="inspections" className="flex items-center gap-1.5">
          <ClipboardList className="h-4 w-4" />
          Besiktningar
        </TabsTrigger>
        <TabsTrigger value="tenant" className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          Hyresgäst
        </TabsTrigger>
        <TabsTrigger value="issues" className="flex items-center gap-1.5">
          <MessageSquare className="h-4 w-4" />
          Ärenden
        </TabsTrigger>
        <TabsTrigger value="notes" className="flex items-center gap-1.5">
          <FileText className="h-4 w-4" />
          Noteringar
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

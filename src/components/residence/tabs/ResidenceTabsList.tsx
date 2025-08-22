
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface ResidenceTabsListProps {
  defaultValue: string;
  children: React.ReactNode;
}

export const ResidenceTabsList = ({ defaultValue, children }: ResidenceTabsListProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="mb-4 bg-slate-100/70 p-1 rounded-lg">
        <TabsTrigger value="info">
          Rumsinformation
        </TabsTrigger>
        <TabsTrigger value="floorplan">
          Planritning
        </TabsTrigger>
        <TabsTrigger value="documents">
          Dokument
        </TabsTrigger>
        <TabsTrigger value="inspections">
          Besiktningar
        </TabsTrigger>
        <TabsTrigger value="tenant">
          Hyresgäst
        </TabsTrigger>
        <TabsTrigger value="issues">
          Ärenden
        </TabsTrigger>
        <TabsTrigger value="notes">
          Noteringar
        </TabsTrigger>
        <TabsTrigger value="access">
          Lås och passage
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};


import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

interface ResidenceTabsListProps {
  defaultValue: string;
  children: React.ReactNode;
}

export const ResidenceTabsList = ({ defaultValue, children }: ResidenceTabsListProps) => {
  const { features } = useFeatureToggles();

  return (
    <Tabs defaultValue={defaultValue} className="space-y-6">
      <TabsList className="bg-slate-100/70 p-1 rounded-lg overflow-x-auto">
        {features.showRoomInformation && (
          <TabsTrigger value="info">
            Rumsinformation
          </TabsTrigger>
        )}
        {features.showFloorplan && (
          <TabsTrigger value="floorplan">
            Planritning
          </TabsTrigger>
        )}
        {features.showDocuments && (
          <TabsTrigger value="documents">
            Dokument
          </TabsTrigger>
        )}
        {features.showInspections && (
          <TabsTrigger value="inspections">
            Besiktningar
          </TabsTrigger>
        )}
        {features.showTenantInfo && (
          <TabsTrigger value="tenant">
            Hyresgäst
          </TabsTrigger>
        )}
        {features.showApartmentIssues && (
          <TabsTrigger value="issues">
            Ärenden
          </TabsTrigger>
        )}
        {features.showResidenceNotes && (
          <TabsTrigger value="notes">
            Noteringar
          </TabsTrigger>
        )}
        {features.showResidenceAccess && (
          <TabsTrigger value="access">
            Lås och passage
          </TabsTrigger>
        )}
      </TabsList>
      {children}
    </Tabs>
  );
};

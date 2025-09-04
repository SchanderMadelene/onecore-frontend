import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabLayout } from "@/components/ui/tab-layout";
import { BuildingEntrances } from "./BuildingEntrances";
import { BuildingPartsTab } from "./tabs/BuildingPartsTab";
import { BuildingSpacesTab } from "./tabs/BuildingSpacesTab";
import { BuildingInstallationsTab } from "./tabs/BuildingInstallationsTab";
import { BuildingParkingTab } from "./tabs/BuildingParkingTab";
import { BuildingDocumentsTab } from "./tabs/BuildingDocumentsTab";
import { BuildingOrdersTab } from "./tabs/BuildingOrdersTab";
import { BuildingDetailTabsMobile } from "./BuildingDetailTabsMobile";
import { Notes } from "@/components/shared/Notes";
import { FeatureGatedContent } from "@/components/residence/tabs/FeatureGatedContent";
import { MessageSquare } from "lucide-react";

import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Building } from "@/types/api";

interface BuildingDetailTabsProps {
  building: Building;
  basePath: string;
}

export const BuildingDetailTabs = ({ building, basePath }: BuildingDetailTabsProps) => {
  const { features } = useFeatureToggles();
  const isMobile = useIsMobile();

  if (isMobile) {
    return <BuildingDetailTabsMobile building={building} basePath={basePath} />;
  }

  return (
    <Tabs defaultValue="orders" className="space-y-6">
      <TabsList className="bg-slate-100/70 p-1 rounded-lg overflow-x-auto">
        <TabsTrigger value="entrances">
          Uppgångar
        </TabsTrigger>
        
        <TabsTrigger value="parts">
          Byggnadsdelar
        </TabsTrigger>
        
        <TabsTrigger value="spaces">
          Utrymmen
        </TabsTrigger>
        
        <TabsTrigger value="installations">
          Installationer
        </TabsTrigger>
        
        <TabsTrigger value="parking">
          Parkering
        </TabsTrigger>
        
        <TabsTrigger value="documents">
          Dokument
        </TabsTrigger>
        
        <TabsTrigger value="orders">
          Ärenden
        </TabsTrigger>
        
        <TabsTrigger value="notes">
          Noteringar
        </TabsTrigger>
      </TabsList>

      <TabsContent value="entrances">
        <FeatureGatedContent
          isEnabled={features.showBuildingEntrances}
          fallbackMessage="Uppgångsfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingEntrances building={building} basePath={basePath} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="parts">
        <FeatureGatedContent
          isEnabled={features.showBuildingParts}
          fallbackMessage="Byggnadsdelarfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingPartsTab building={building} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="spaces">
        <FeatureGatedContent
          isEnabled={features.showBuildingSpaces}
          fallbackMessage="Utrymmenfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingSpacesTab building={building} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="installations">
        <FeatureGatedContent
          isEnabled={features.showBuildingInstallations}
          fallbackMessage="Installationerfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingInstallationsTab building={building} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="parking">
        <FeatureGatedContent
          isEnabled={features.showBuildingParking}
          fallbackMessage="Parkeringfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingParkingTab building={building} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="documents">
        <FeatureGatedContent
          isEnabled={features.showBuildingDocuments}
          fallbackMessage="Dokumentfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingDocumentsTab />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="orders">
        <FeatureGatedContent
          isEnabled={true}
          fallbackMessage="Ärendefunktionen är inte aktiverad."
        >
          <BuildingOrdersTab building={building} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="notes">
        <FeatureGatedContent
          isEnabled={true}
          fallbackMessage="Noteringsfunktionen är inte aktiverad."
        >
          <TabLayout 
            title="Noteringar" 
            icon={MessageSquare}
            showCard={true}
          >
            <Notes
              entityType="building"
              entityId={building.id}
              placeholder="Skriv din notering här..."
              emptyMessage="Inga noteringar har lagts till för denna byggnad ännu."
            />
          </TabLayout>
        </FeatureGatedContent>
      </TabsContent>
    </Tabs>
  );
};
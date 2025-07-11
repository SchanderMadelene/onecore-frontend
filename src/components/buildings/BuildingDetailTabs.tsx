import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileAccordion } from "@/components/ui/mobile-accordion";
import { BuildingEntrances } from "./BuildingEntrances";
import { BuildingPartsTab } from "./tabs/BuildingPartsTab";
import { BuildingSpacesTab } from "./tabs/BuildingSpacesTab";
import { BuildingInstallationsTab } from "./tabs/BuildingInstallationsTab";
import { BuildingParkingTab } from "./tabs/BuildingParkingTab";
import { BuildingDocumentsTab } from "./tabs/BuildingDocumentsTab";
import { FeatureGatedContent } from "@/components/residence/tabs/FeatureGatedContent";
import { Home, Building2, Box, Settings, Car, FileText } from "lucide-react";
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

  const accordionItems = [
    {
      id: "entrances",
      icon: Home,
      title: "Uppgångar",
      content: features.showBuildingEntrances ? (
        <BuildingEntrances building={building} basePath={basePath} />
      ) : (
        <FeatureGatedContent
          isEnabled={false}
          fallbackMessage="Uppgångsfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <div />
        </FeatureGatedContent>
      )
    },
    {
      id: "parts",
      icon: Building2,
      title: "Byggnadsdelar",
      content: (
        <FeatureGatedContent
          isEnabled={features.showBuildingParts}
          fallbackMessage="Byggnadsdelarfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingPartsTab building={building} />
        </FeatureGatedContent>
      )
    },
    {
      id: "spaces",
      icon: Box,
      title: "Utrymmen",
      content: (
        <FeatureGatedContent
          isEnabled={features.showBuildingSpaces}
          fallbackMessage="Utrymmenfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingSpacesTab building={building} />
        </FeatureGatedContent>
      )
    },
    {
      id: "installations",
      icon: Settings,
      title: "Installationer",
      content: (
        <FeatureGatedContent
          isEnabled={features.showBuildingInstallations}
          fallbackMessage="Installationerfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingInstallationsTab building={building} />
        </FeatureGatedContent>
      )
    },
    {
      id: "parking",
      icon: Car,
      title: "Parkering",
      content: (
        <FeatureGatedContent
          isEnabled={features.showBuildingParking}
          fallbackMessage="Parkeringfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingParkingTab building={building} />
        </FeatureGatedContent>
      )
    },
    {
      id: "documents",
      icon: FileText,
      title: "Dokument",
      content: (
        <FeatureGatedContent
          isEnabled={features.showBuildingDocuments}
          fallbackMessage="Dokumentfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingDocumentsTab />
        </FeatureGatedContent>
      )
    }
  ];

  if (isMobile) {
    return (
      <MobileAccordion 
        items={accordionItems}
        defaultOpen={["entrances"]}
        className="w-full"
      />
    );
  }

  return (
    <Tabs defaultValue="entrances" className="w-full">
      <TabsList className="mb-4 bg-slate-100/70 p-1 rounded-lg justify-start">
        <TabsTrigger value="entrances" className="flex items-center gap-1.5">
          <Home className="h-4 w-4" />
          Uppgångar
        </TabsTrigger>
        
        <TabsTrigger value="parts" className="flex items-center gap-1.5">
          <Building2 className="h-4 w-4" />
          Byggnadsdelar
        </TabsTrigger>
        
        <TabsTrigger value="spaces" className="flex items-center gap-1.5">
          <Box className="h-4 w-4" />
          Utrymmen
        </TabsTrigger>
        
        <TabsTrigger value="installations" className="flex items-center gap-1.5">
          <Settings className="h-4 w-4" />
          Installationer
        </TabsTrigger>
        
        <TabsTrigger value="parking" className="flex items-center gap-1.5">
          <Car className="h-4 w-4" />
          Parkering
        </TabsTrigger>
        
        <TabsTrigger value="documents" className="flex items-center gap-1.5">
          <FileText className="h-4 w-4" />
          Dokument
        </TabsTrigger>
      </TabsList>

      <TabsContent value="entrances" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        {features.showBuildingEntrances ? (
          <BuildingEntrances building={building} basePath={basePath} />
        ) : (
          <FeatureGatedContent
            isEnabled={false}
            fallbackMessage="Uppgångsfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
          >
            <div />
          </FeatureGatedContent>
        )}
      </TabsContent>

      <TabsContent value="parts" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <FeatureGatedContent
          isEnabled={features.showBuildingParts}
          fallbackMessage="Byggnadsdelarfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingPartsTab building={building} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="spaces" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <FeatureGatedContent
          isEnabled={features.showBuildingSpaces}
          fallbackMessage="Utrymmenfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingSpacesTab building={building} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="installations" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <FeatureGatedContent
          isEnabled={features.showBuildingInstallations}
          fallbackMessage="Installationerfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingInstallationsTab building={building} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="parking" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <FeatureGatedContent
          isEnabled={features.showBuildingParking}
          fallbackMessage="Parkeringfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingParkingTab building={building} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="documents" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <FeatureGatedContent
          isEnabled={features.showBuildingDocuments}
          fallbackMessage="Dokumentfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingDocumentsTab />
        </FeatureGatedContent>
      </TabsContent>
    </Tabs>
  );
};
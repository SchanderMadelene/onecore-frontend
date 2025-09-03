import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BuildingEntrances } from "./BuildingEntrances";
import { BuildingPartsTab } from "./tabs/BuildingPartsTab";
import { BuildingSpacesTab } from "./tabs/BuildingSpacesTab";
import { BuildingInstallationsTab } from "./tabs/BuildingInstallationsTab";
import { BuildingParkingTab } from "./tabs/BuildingParkingTab";
import { BuildingDocumentsTab } from "./tabs/BuildingDocumentsTab";
import { BuildingOrdersTab } from "./tabs/BuildingOrdersTab";
import { Notes } from "@/components/shared/Notes";
import { FeatureGatedContent } from "@/components/residence/tabs/FeatureGatedContent";

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
      title: "Dokument",
      content: (
        <FeatureGatedContent
          isEnabled={features.showBuildingDocuments}
          fallbackMessage="Dokumentfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingDocumentsTab />
        </FeatureGatedContent>
      )
    },
    {
      id: "orders",
      title: "Ärenden",
      content: (
        <BuildingOrdersTab building={building} />
      )
    },
    {
      id: "notes",
      title: "Noteringar",
      content: (
        <Notes
          entityType="building"
          entityId={building.id}
          title="Noteringar för byggnad"
          placeholder="Skriv din notering här..."
          emptyMessage="Inga noteringar har lagts till för denna byggnad ännu."
        />
      )
    }
  ];

  if (isMobile) {
    return (
      <div className="w-full">
        <Accordion type="multiple" defaultValue={["orders"]} className="space-y-2">
          {accordionItems.map(item => (
            <AccordionItem key={item.id} value={item.id} className="rounded-lg border border-slate-200">
              <AccordionTrigger className="px-2 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium">{item.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-0 pb-2">
                  {item.content}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  return (
    <Tabs defaultValue="entrances" className="w-full">
      <TabsList className="mb-4 bg-slate-100/70 p-1 rounded-lg justify-start">
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

      <TabsContent value="orders" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <BuildingOrdersTab building={building} />
      </TabsContent>

      <TabsContent value="notes" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <Notes
          entityType="building"
          entityId={building.id}
          title="Noteringar för byggnad"
          placeholder="Skriv din notering här..."
          emptyMessage="Inga noteringar har lagts till för denna byggnad ännu."
        />
      </TabsContent>
    </Tabs>
  );
};
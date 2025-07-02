import { useState } from "react";
import { MobileTabs } from "@/components/ui/mobile-tabs";
import { BuildingEntrances } from "./BuildingEntrances";
import { BuildingPartsTab } from "./tabs/BuildingPartsTab";
import { BuildingSpacesTab } from "./tabs/BuildingSpacesTab";
import { BuildingInstallationsTab } from "./tabs/BuildingInstallationsTab";
import { BuildingParkingTab } from "./tabs/BuildingParkingTab";
import { FeatureGatedContent } from "@/components/residence/tabs/FeatureGatedContent";
import { Home, Building2, Box, Settings, Car } from "lucide-react";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import type { Building } from "@/types/api";

interface BuildingDetailTabsProps {
  building: Building;
  basePath: string;
}

export const BuildingDetailTabs = ({ building, basePath }: BuildingDetailTabsProps) => {
  const { features } = useFeatureToggles();
  const [activeTab, setActiveTab] = useState("entrances");

  const tabs = [
    {
      value: "entrances",
      label: (
        <div className="flex items-center gap-1.5">
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Uppgångar</span>
          <span className="sm:hidden">Uppg.</span>
        </div>
      ),
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
      value: "parts",
      label: (
        <div className="flex items-center gap-1.5">
          <Building2 className="h-4 w-4" />
          <span className="hidden sm:inline">Byggnadsdelar</span>
          <span className="sm:hidden">Delar</span>
        </div>
      ),
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
      value: "spaces",
      label: (
        <div className="flex items-center gap-1.5">
          <Box className="h-4 w-4" />
          <span className="hidden sm:inline">Utrymmen</span>
          <span className="sm:hidden">Utr.</span>
        </div>
      ),
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
      value: "installations",
      label: (
        <div className="flex items-center gap-1.5">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Installationer</span>
          <span className="sm:hidden">Inst.</span>
        </div>
      ),
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
      value: "parking",
      label: (
        <div className="flex items-center gap-1.5">
          <Car className="h-4 w-4" />
          <span className="hidden sm:inline">Parkering</span>
          <span className="sm:hidden">Park.</span>
        </div>
      ),
      content: (
        <FeatureGatedContent
          isEnabled={features.showBuildingParking}
          fallbackMessage="Parkeringfunktionen är inte aktiverad. Aktivera den i betainställningarna för att se innehållet."
        >
          <BuildingParkingTab building={building} />
        </FeatureGatedContent>
      )
    }
  ];

  return (
    <MobileTabs 
      value={activeTab}
      onValueChange={setActiveTab}
      tabs={tabs}
      className="w-full"
    />
  );
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyInfoTab } from "./tabs/PropertyInfoTab";
import { PropertyDocumentsTab } from "./tabs/PropertyDocumentsTab";
import { PropertyPlanningTab } from "./tabs/PropertyPlanningTab";
import { PropertyBuildingsTab } from "./tabs/PropertyBuildingsTab";
import { PropertyMapTab } from "./tabs/PropertyMapTab";
import { PropertyStatisticsTab } from "./tabs/PropertyStatisticsTab";
import { PropertyMaintenanceUnitsTab } from "./tabs/PropertyMaintenanceUnitsTab";
import { PropertyOrdersTab } from "./tabs/PropertyOrdersTab";
import { PropertyAccessTab } from "./tabs/PropertyAccessTab";
import { PropertyDetailTabsMobile } from "./PropertyDetailTabsMobile";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { FeatureGatedContent } from "@/components/residence/tabs/FeatureGatedContent";
import type { PropertyDetail } from "@/types/api";

interface PropertyDetailTabsProps {
  propertyDetail: PropertyDetail;
}

export const PropertyDetailTabs = ({ propertyDetail }: PropertyDetailTabsProps) => {
  const isMobile = useIsMobile();
  const { features } = useFeatureToggles();

  if (isMobile) {
    return <PropertyDetailTabsMobile propertyDetail={propertyDetail} />;
  }

  return (
    <Tabs defaultValue="info" className="space-y-6">
      <TabsList className="bg-slate-100/70 p-1 rounded-lg overflow-x-auto">
        {features.showPropertyInfo && (
          <TabsTrigger value="info">
            <span className="hidden sm:inline">Fastighet</span>
            <span className="sm:hidden">Info</span>
          </TabsTrigger>
        )}
        {features.showPropertyStatistics && (
          <TabsTrigger value="statistics">
            <span className="hidden sm:inline">Fastighetssammanställning</span>
            <span className="sm:hidden">Sammanst.</span>
          </TabsTrigger>
        )}
        {features.showPropertyDocuments && (
          <TabsTrigger value="documents">
            <span className="hidden sm:inline">Dokument</span>
            <span className="sm:hidden">Dok</span>
          </TabsTrigger>
        )}
        {features.showPropertyPlanning && (
          <TabsTrigger value="planning">
            <span className="hidden sm:inline">Planerat underhåll</span>
            <span className="sm:hidden">Plan</span>
          </TabsTrigger>
        )}
        {features.showPropertyBuildings && (
          <TabsTrigger value="buildings">
            <span className="hidden sm:inline">Byggnader</span>
            <span className="sm:hidden">Bygg</span>
          </TabsTrigger>
        )}
        {features.showPropertyMaintenance && (
          <TabsTrigger value="maintenance">
            <span className="hidden sm:inline">Underhållsenheter</span>
            <span className="sm:hidden">Underhåll</span>
          </TabsTrigger>
        )}
        {features.showPropertyOrders && (
          <TabsTrigger value="orders">
            <span className="hidden sm:inline">Ärenden</span>
            <span className="sm:hidden">Ärende</span>
          </TabsTrigger>
        )}
        {features.showPropertyAccess && (
          <TabsTrigger value="access">
            <span className="hidden sm:inline">Lås & passage</span>
            <span className="sm:hidden">Lås</span>
          </TabsTrigger>
        )}
        {features.showPropertyMap && (
          <TabsTrigger value="map">
            <span>Ritningar</span>
          </TabsTrigger>
        )}
      </TabsList>

      {features.showPropertyInfo && (
        <TabsContent value="info">
          <FeatureGatedContent
            isEnabled={features.showPropertyInfo}
            fallbackMessage="För att se fastighetsinformation, aktivera funktionen i inställningarna."
          >
            <PropertyInfoTab property={propertyDetail} />
          </FeatureGatedContent>
        </TabsContent>
      )}

      {features.showPropertyStatistics && (
        <TabsContent value="statistics">
          <FeatureGatedContent
            isEnabled={features.showPropertyStatistics}
            fallbackMessage="För att se fastighetssammanställning, aktivera funktionen i inställningarna."
          >
            <PropertyStatisticsTab property={propertyDetail} />
          </FeatureGatedContent>
        </TabsContent>
      )}

      {features.showPropertyDocuments && (
        <TabsContent value="documents">
          <FeatureGatedContent
            isEnabled={features.showPropertyDocuments}
            fallbackMessage="För att se dokument, aktivera funktionen i inställningarna."
          >
            <PropertyDocumentsTab />
          </FeatureGatedContent>
        </TabsContent>
      )}

      {features.showPropertyPlanning && (
        <TabsContent value="planning">
          <FeatureGatedContent
            isEnabled={features.showPropertyPlanning}
            fallbackMessage="För att se planerat underhåll, aktivera funktionen i inställningarna."
          >
            <PropertyPlanningTab />
          </FeatureGatedContent>
        </TabsContent>
      )}

      {features.showPropertyBuildings && (
        <TabsContent value="buildings">
          <FeatureGatedContent
            isEnabled={features.showPropertyBuildings}
            fallbackMessage="För att se byggnader, aktivera funktionen i inställningarna."
          >
            <PropertyBuildingsTab buildings={propertyDetail.buildings} />
          </FeatureGatedContent>
        </TabsContent>
      )}

      {features.showPropertyMaintenance && (
        <TabsContent value="maintenance">
          <FeatureGatedContent
            isEnabled={features.showPropertyMaintenance}
            fallbackMessage="För att se underhållsenheter, aktivera funktionen i inställningarna."
          >
            <PropertyMaintenanceUnitsTab maintenanceUnits={propertyDetail.maintenanceUnits} />
          </FeatureGatedContent>
        </TabsContent>
      )}

      {features.showPropertyOrders && (
        <TabsContent value="orders">
          <FeatureGatedContent
            isEnabled={features.showPropertyOrders}
            fallbackMessage="För att se ärenden, aktivera funktionen i inställningarna."
          >
            <PropertyOrdersTab propertyDetail={propertyDetail} />
          </FeatureGatedContent>
        </TabsContent>
      )}

      {features.showPropertyAccess && (
        <TabsContent value="access">
          <FeatureGatedContent
            isEnabled={features.showPropertyAccess}
            fallbackMessage="För att se lås & passage, aktivera funktionen i inställningarna."
          >
            <PropertyAccessTab />
          </FeatureGatedContent>
        </TabsContent>
      )}

      {features.showPropertyMap && (
        <TabsContent value="map">
          <FeatureGatedContent
            isEnabled={features.showPropertyMap}
            fallbackMessage="För att se ritningar, aktivera funktionen i inställningarna."
          >
            <PropertyMapTab propertyDetail={propertyDetail} />
          </FeatureGatedContent>
        </TabsContent>
      )}
    </Tabs>
  );
};

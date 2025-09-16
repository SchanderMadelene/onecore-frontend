
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
            Fastighet
          </TabsTrigger>
        )}
        {features.showPropertyStatistics && (
          <TabsTrigger value="statistics">
            Fastighetssammanställning
          </TabsTrigger>
        )}
        {features.showPropertyDocuments && (
          <TabsTrigger value="documents">
            Dokument
          </TabsTrigger>
        )}
        {features.showPropertyPlanning && (
          <TabsTrigger value="planning">
            Planerat underhåll
          </TabsTrigger>
        )}
        {features.showPropertyBuildings && (
          <TabsTrigger value="buildings">
            Byggnader
          </TabsTrigger>
        )}
        {features.showPropertyMaintenance && (
          <TabsTrigger value="maintenance">
            Underhållsenheter
          </TabsTrigger>
        )}
        {features.showPropertyOrders && (
          <TabsTrigger value="orders">
            Ärenden
          </TabsTrigger>
        )}
        {features.showPropertyAccess && (
          <TabsTrigger value="access">
            Lås & passage
          </TabsTrigger>
        )}
        {features.showPropertyMap && (
          <TabsTrigger value="map">
            Ritningar
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

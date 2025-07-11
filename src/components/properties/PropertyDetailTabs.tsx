
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
import type { PropertyDetail } from "@/types/api";

interface PropertyDetailTabsProps {
  propertyDetail: PropertyDetail;
}

export const PropertyDetailTabs = ({ propertyDetail }: PropertyDetailTabsProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <PropertyDetailTabsMobile propertyDetail={propertyDetail} />;
  }

  return (
    <Tabs defaultValue="info" className="space-y-6">
      <TabsList className="bg-slate-100/70 p-1 rounded-lg overflow-x-auto">
        <TabsTrigger value="info">
          <span className="hidden sm:inline">Fastighet</span>
          <span className="sm:hidden">Info</span>
        </TabsTrigger>
        <TabsTrigger value="statistics">
          <span className="hidden sm:inline">Fastighetssammanställning</span>
          <span className="sm:hidden">Sammanst.</span>
        </TabsTrigger>
        <TabsTrigger value="documents">
          <span className="hidden sm:inline">Dokument</span>
          <span className="sm:hidden">Dok</span>
        </TabsTrigger>
        <TabsTrigger value="planning">
          <span className="hidden sm:inline">Planerat underhåll</span>
          <span className="sm:hidden">Plan</span>
        </TabsTrigger>
        <TabsTrigger value="buildings">
          <span className="hidden sm:inline">Byggnader</span>
          <span className="sm:hidden">Bygg</span>
        </TabsTrigger>
        <TabsTrigger value="maintenance">
          <span className="hidden sm:inline">Underhållsenheter</span>
          <span className="sm:hidden">Underhåll</span>
        </TabsTrigger>
        <TabsTrigger value="orders">
          <span className="hidden sm:inline">Ärenden</span>
          <span className="sm:hidden">Ärende</span>
        </TabsTrigger>
        <TabsTrigger value="access">
          <span className="hidden sm:inline">Lås & passage</span>
          <span className="sm:hidden">Lås</span>
        </TabsTrigger>
        <TabsTrigger value="map">
          <span>Ritningar</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="info">
        <PropertyInfoTab property={propertyDetail} />
      </TabsContent>

      <TabsContent value="statistics">
        <PropertyStatisticsTab property={propertyDetail} />
      </TabsContent>

      <TabsContent value="documents">
        <PropertyDocumentsTab />
      </TabsContent>

      <TabsContent value="planning">
        <PropertyPlanningTab />
      </TabsContent>

      <TabsContent value="buildings">
        <PropertyBuildingsTab buildings={propertyDetail.buildings} />
      </TabsContent>

      <TabsContent value="maintenance">
        <PropertyMaintenanceUnitsTab maintenanceUnits={propertyDetail.maintenanceUnits} />
      </TabsContent>

      <TabsContent value="orders">
        <PropertyOrdersTab propertyDetail={propertyDetail} />
      </TabsContent>

      <TabsContent value="access">
        <PropertyAccessTab />
      </TabsContent>

      <TabsContent value="map">
        <PropertyMapTab propertyDetail={propertyDetail} />
      </TabsContent>
    </Tabs>
  );
};

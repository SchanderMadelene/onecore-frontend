
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyInfoTab } from "./PropertyInfoTab";
import { PropertyDocumentsTab } from "./PropertyDocumentsTab";
import { PropertyPlanningTab } from "./PropertyPlanningTab";
import { PropertyBuildingsTab } from "./PropertyBuildingsTab";
import { PropertyMapTab } from "./PropertyMapTab";
import { PropertyApartmentsTab } from "./PropertyApartmentsTab";
import { PropertyStatisticsTab } from "./PropertyStatisticsTab";
import { PropertyMaintenanceUnitsTab } from "./PropertyMaintenanceUnitsTab";
import type { PropertyDetail } from "@/types/api";

interface PropertyDetailTabsProps {
  propertyDetail: PropertyDetail;
}

export const PropertyDetailTabs = ({ propertyDetail }: PropertyDetailTabsProps) => {
  return (
    <Tabs defaultValue="info" className="space-y-6">
      <TabsList>
        <TabsTrigger value="info">
          <span className="hidden sm:inline">Fastighet</span>
          <span className="sm:hidden">Info</span>
        </TabsTrigger>
        <TabsTrigger value="documents">
          <span className="hidden sm:inline">Dokument</span>
          <span className="sm:hidden">Dok</span>
        </TabsTrigger>
        <TabsTrigger value="planning">
          <span className="hidden sm:inline">Planering</span>
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
        <TabsTrigger value="map">
          <span>Ritningar</span>
        </TabsTrigger>
        <TabsTrigger value="apartments">
          <span className="hidden sm:inline">Lägenheter</span>
          <span className="sm:hidden">Läg</span>
        </TabsTrigger>
        <TabsTrigger value="statistics">
          <span className="hidden sm:inline">Fastighetssammanställning</span>
          <span className="sm:hidden">Sammanst.</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="info">
        <PropertyInfoTab property={propertyDetail} />
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

      <TabsContent value="map">
        <PropertyMapTab propertyDetail={propertyDetail} />
      </TabsContent>

      <TabsContent value="apartments">
        <PropertyApartmentsTab buildings={propertyDetail.buildings} />
      </TabsContent>

      <TabsContent value="statistics">
        <PropertyStatisticsTab property={propertyDetail} />
      </TabsContent>
    </Tabs>
  );
};

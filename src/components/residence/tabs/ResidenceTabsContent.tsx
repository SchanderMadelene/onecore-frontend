
import { TabsContent } from "@/components/ui/tabs";
import { ResidenceInfo } from "@/components/residence/ResidenceInfo";
import { ResidenceFloorplan } from "@/components/residence/ResidenceFloorplan";
import { ResidenceInspection } from "@/components/residence/ResidenceInspection";
import { ResidenceDocuments } from "@/components/residence/ResidenceDocuments";
import { TenantInformation } from "@/components/residence/inspection/form/TenantInformation";
import { OrdersManagement } from "@/components/residence/OrdersManagement";
import { ResidenceAccessControl } from "@/components/residence/ResidenceAccessControl";
import { NotesSimple } from "@/components/shared/Notes";
import { TabLayout } from "@/components/ui/tab-layout";
import { StickyNote } from "lucide-react";
import { FeatureGatedContent } from "./FeatureGatedContent";
import type { Room } from "@/types/api";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

interface ResidenceTabsContentProps {
  roomsData: Room[];
  getOrientationText: (orientation: number) => string;
  getTenantData: () => any;
  residenceId?: string;
}

export const ResidenceTabsContent = ({ 
  roomsData, 
  getOrientationText, 
  getTenantData, 
  residenceId 
}: ResidenceTabsContentProps) => {
  const { features } = useFeatureToggles();

  return (
    <>
      <TabsContent value="info">
        <FeatureGatedContent
          isEnabled={features.showRoomInformation}
          fallbackMessage="För att se rumsinformation, aktivera funktionen i inställningarna."
        >
          <ResidenceInfo 
            rooms={roomsData}
            getOrientationText={getOrientationText}
          />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="floorplan">
        <FeatureGatedContent
          isEnabled={features.showFloorplan}
          fallbackMessage="För att se planritning, aktivera funktionen i inställningarna."
        >
          <ResidenceFloorplan />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="documents">
        <FeatureGatedContent
          isEnabled={features.showDocuments}
          fallbackMessage="För att se dokument, aktivera funktionen i inställningarna."
        >
          <ResidenceDocuments />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="inspections">
        <FeatureGatedContent
          isEnabled={features.showInspections}
          fallbackMessage="För att se besiktningar, aktivera funktionen i inställningarna."
        >
          <ResidenceInspection rooms={roomsData} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="tenant">
        <FeatureGatedContent
          isEnabled={features.showTenantInfo}
          fallbackMessage="För att se hyresgästinformation, aktivera funktionen i inställningarna."
        >
          <TenantInformation tenant={getTenantData()} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="issues">
        <FeatureGatedContent
          isEnabled={features.showApartmentIssues}
          fallbackMessage="För att se felanmälningar, aktivera funktionen i inställningarna."
        >
          <OrdersManagement residenceId={residenceId} />
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="notes">
        <FeatureGatedContent
          isEnabled={features.showResidenceNotes}
          fallbackMessage="För att se noteringar, aktivera funktionen i inställningarna."
        >
          <TabLayout 
            title="Noteringar" 
            icon={StickyNote}
            showCard={true}
          >
            <NotesSimple 
              entityType="residence"
              entityId={residenceId || ""}
              placeholder="Skriv en notering om lägenheten..."
              emptyMessage="Inga noteringar har lagts till för denna lägenhet ännu."
            />
          </TabLayout>
        </FeatureGatedContent>
      </TabsContent>

      <TabsContent value="access">
        <FeatureGatedContent
          isEnabled={features.showResidenceAccess}
          fallbackMessage="För att se lås och passage, aktivera funktionen i inställningarna."
        >
          <ResidenceAccessControl />
        </FeatureGatedContent>
      </TabsContent>
    </>
  );
};

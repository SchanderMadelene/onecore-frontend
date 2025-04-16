
import { ResidenceInfo } from "@/components/residence/ResidenceInfo";
import { ResidenceBasicInfo } from "@/components/residence/ResidenceBasicInfo";
import { ResidenceInspection } from "@/components/residence/ResidenceInspection";
import { TenantInformation } from "@/components/residence/inspection/form/TenantInformation";
import { CreateIssue } from "@/components/residence/CreateIssue";
import { getOrientationText } from "./RoomOrientation";
import type { Residence, Room } from "@/types/api";
import { mockTenant } from "@/data/tenants";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Info, ClipboardList, Users, MessageSquare } from "lucide-react";

interface ResidenceContentProps {
  residenceData: Residence;
  roomsData: Room[];
  property?: string;
  district?: string;
}

export const ResidenceContent = ({ 
  residenceData, 
  roomsData, 
  property, 
  district 
}: ResidenceContentProps) => {
  const { features } = useFeatureToggles();
  
  return (
    <div className="w-full">
      <ResidenceBasicInfo
        residence={residenceData}
        property={property}
        district={district}
      />

      <div className="mt-6">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="info" className="flex items-center gap-1.5">
              <Info className="h-4 w-4" />
              Rumsinformation
            </TabsTrigger>
            <TabsTrigger value="inspections" className="flex items-center gap-1.5">
              <ClipboardList className="h-4 w-4" />
              Besiktningar
            </TabsTrigger>
            <TabsTrigger value="tenant" className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              Hyresgäst
            </TabsTrigger>
            <TabsTrigger value="issues" className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              Felanmälan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            {features.showRoomInformation && (
              <ResidenceInfo 
                rooms={roomsData}
                getOrientationText={getOrientationText}
              />
            )}
          </TabsContent>

          <TabsContent value="inspections">
            {features.showInspections && (
              <ResidenceInspection
                rooms={roomsData}
              />
            )}
          </TabsContent>

          <TabsContent value="tenant">
            {features.showTenantInfo && (
              <Card>
                <CardContent className="pt-6">
                  <TenantInformation tenant={mockTenant} />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="issues">
            {features.showApartmentIssues && (
              <Card>
                <CardContent className="pt-6">
                  <CreateIssue />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

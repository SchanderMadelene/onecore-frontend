
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ClipboardList, Users, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileAccordion } from "./MobileAccordion";

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
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full space-y-6">
      <ResidenceBasicInfo
        residence={residenceData}
        property={property}
        district={district}
      />

      {isMobile ? (
        <MobileAccordion 
          rooms={roomsData}
          getOrientationText={getOrientationText}
        />
      ) : (
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-4 bg-slate-100/70 p-1 rounded-lg">
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
              Ärenden
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            {features.showRoomInformation ? (
              <Card>
                <CardContent className="p-4">
                  <ResidenceInfo 
                    rooms={roomsData}
                    getOrientationText={getOrientationText}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-4">
                  <p className="text-slate-500">
                    För att se rumsinformation, aktivera funktionen i inställningarna.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="inspections">
            {features.showInspections ? (
              <Card>
                <CardContent className="p-4">
                  <ResidenceInspection
                    rooms={roomsData}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-4">
                  <p className="text-slate-500">
                    För att se besiktningar, aktivera funktionen i inställningarna.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tenant">
            {features.showTenantInfo ? (
              <Card>
                <CardContent className="p-4">
                  <TenantInformation tenant={mockTenant} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-4">
                  <p className="text-slate-500">
                    För att se hyresgästinformation, aktivera funktionen i inställningarna.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="issues">
            {features.showApartmentIssues ? (
              <Card>
                <CardContent className="p-4">
                  <CreateIssue />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-4">
                  <p className="text-slate-500">
                    För att se felanmälningar, aktivera funktionen i inställningarna.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

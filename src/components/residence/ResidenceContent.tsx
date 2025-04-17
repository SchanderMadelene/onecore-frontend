
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

      <Tabs defaultValue="info" className="w-full">
        <TabsList className={`mb-4 ${isMobile ? 'w-full flex overflow-x-auto' : ''}`}>
          <TabsTrigger value="info" className="flex items-center gap-1.5">
            <Info className="h-4 w-4" />
            {!isMobile && "Rumsinformation"}
          </TabsTrigger>
          <TabsTrigger value="inspections" className="flex items-center gap-1.5">
            <ClipboardList className="h-4 w-4" />
            {!isMobile && "Besiktningar"}
          </TabsTrigger>
          <TabsTrigger value="tenant" className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {!isMobile && "Hyresgäst"}
          </TabsTrigger>
          <TabsTrigger value="issues" className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            {!isMobile && "Ärenden"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          {features.showRoomInformation ? (
            <ResidenceInfo 
              rooms={roomsData}
              getOrientationText={getOrientationText}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Rumsinformation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  För att se rumsinformation, aktivera funktionen i inställningarna.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="inspections">
          {features.showInspections ? (
            <ResidenceInspection
              rooms={roomsData}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Besiktningar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  För att se besiktningar, aktivera funktionen i inställningarna.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="tenant">
          {features.showTenantInfo ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Hyresgästinformation</CardTitle>
              </CardHeader>
              <CardContent>
                <TenantInformation tenant={mockTenant} />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Hyresgästinformation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  För att se hyresgästinformation, aktivera funktionen i inställningarna.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="issues">
          {features.showApartmentIssues ? (
            <CreateIssue />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Felanmälan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  För att se felanmälningar, aktivera funktionen i inställningarna.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

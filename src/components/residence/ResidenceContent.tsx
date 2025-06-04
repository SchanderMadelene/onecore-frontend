import { ResidenceInfo } from "@/components/residence/ResidenceInfo";
import { ResidenceFloorplan } from "@/components/residence/ResidenceFloorplan";
import { ResidenceBasicInfo } from "@/components/residence/ResidenceBasicInfo";
import { ResidenceInspection } from "@/components/residence/ResidenceInspection";
import { TenantInformation } from "@/components/residence/inspection/form/TenantInformation";
import { OrdersManagement } from "@/components/residence/OrdersManagement";
import { ResidenceDocuments } from "@/components/residence/ResidenceDocuments";
import { getOrientationText } from "./RoomOrientation";
import type { Residence, Room } from "@/types/api";
import { mockTenant, mockMultipleTenants, mockSecondHandTenants } from "@/data/tenants";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ClipboardList, Users, MessageSquare, FileImage, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileAccordion } from "./MobileAccordion";
import { useParams } from "react-router-dom";

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
  const { id } = useParams<{ id: string }>();
  
  // Välj tenant data baserat på lägenhets-ID
  const getTenantData = () => {
    switch(id) {
      case "lgh-1001":
        return mockMultipleTenants;
      case "lgh-1002":
        return mockSecondHandTenants;
      default:
        return mockTenant;
    }
  };
  
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
            <TabsTrigger value="floorplan" className="flex items-center gap-1.5">
              <FileImage className="h-4 w-4" />
              Planritning
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              Dokument
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
              <Card className="w-full">
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      För att se rumsinformation, aktivera funktionen i inställningarna.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="floorplan">
            {features.showFloorplan ? (
              <Card>
                <CardContent className="p-4">
                  <ResidenceFloorplan />
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full">
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      För att se planritning, aktivera funktionen i inställningarna.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="documents">
            {features.showDocuments ? (
              <Card>
                <CardContent className="p-4">
                  <ResidenceDocuments />
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full">
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      För att se dokument, aktivera funktionen i inställningarna.
                    </p>
                  </div>
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
              <Card className="w-full">
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      För att se besiktningar, aktivera funktionen i inställningarna.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tenant">
            {features.showTenantInfo ? (
              <Card>
                <CardContent className="p-4">
                  <TenantInformation tenant={getTenantData()} />
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full">
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      För att se hyresgästinformation, aktivera funktionen i inställningarna.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="issues">
            {features.showApartmentIssues ? (
              <Card>
                <CardContent className="p-4">
                  <OrdersManagement residenceId={id} />
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full">
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      För att se felanmälningar, aktivera funktionen i inställningarna.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

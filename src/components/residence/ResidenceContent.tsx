
import { ResidenceBasicInfo } from "@/components/residence/ResidenceBasicInfo";
import { ResidenceTabsList } from "@/components/residence/tabs/ResidenceTabsList";
import { ResidenceTabsContent } from "@/components/residence/tabs/ResidenceTabsContent";
import { getOrientationText } from "./RoomOrientation";
import type { Residence, Room } from "@/types/api";
import { mockTenant, mockMultipleTenants, mockSecondHandTenants } from "@/data/tenants";
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
        <ResidenceTabsList defaultValue="info">
          <ResidenceTabsContent
            roomsData={roomsData}
            getOrientationText={getOrientationText}
            getTenantData={getTenantData}
            residenceId={id}
          />
        </ResidenceTabsList>
      )}
    </div>
  );
};

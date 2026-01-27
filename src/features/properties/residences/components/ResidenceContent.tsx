
import { ResidenceBasicInfo } from "./ResidenceBasicInfo";
import { ResidenceTabsList } from "./tabs/ResidenceTabsList";
import { ResidenceTabsContent } from "./tabs/ResidenceTabsContent";
import { PropertyBreadcrumb } from "@/features/navigation/components";
import { getOrientationText } from "./RoomOrientation";
import type { Residence, Room, Building, PropertyDetail } from "@/types/api";
import { mockTenant, mockMultipleTenants, mockSecondHandTenants } from "@/data/tenants";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileAccordion } from "./MobileAccordion";
import { useParams } from "react-router-dom";

interface ResidenceContentProps {
  residenceData: Residence;
  roomsData: Room[];
  property?: string;
  district?: string;
  buildingDetail?: Building;
  propertyDetail?: PropertyDetail;
}

export const ResidenceContent = ({ 
  residenceData, 
  roomsData, 
  property, 
  district,
  buildingDetail,
  propertyDetail
}: ResidenceContentProps) => {
  const isMobile = useIsMobile();
  const { id } = useParams<{ id: string }>();
  
  // Välj tenant data baserat på lägenhets-ID
  const getTenantData = () => {
    switch(id) {
      case "lgh-1001":
        return mockMultipleTenants;
      case "lgh-1002":
      case "lgh-002":
        return mockSecondHandTenants;
      default:
        return mockTenant;
    }
  };
  
  return (
    <div className="w-full space-y-6">
      <PropertyBreadcrumb />
      
      <ResidenceBasicInfo
        residence={residenceData}
        property={property}
        district={district}
        buildingDetail={buildingDetail}
        propertyDetail={propertyDetail}
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

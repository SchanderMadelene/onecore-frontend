
import { ResidenceInfo } from "@/components/residence/ResidenceInfo";
import { ResidenceBasicInfo } from "@/components/residence/ResidenceBasicInfo";
import { ResidenceInspection } from "@/components/residence/ResidenceInspection";
import { TenantInformation } from "@/components/residence/inspection/form/TenantInformation";
import { CreateIssue } from "@/components/residence/CreateIssue";
import { getOrientationText } from "./RoomOrientation";
import type { Residence, Room } from "@/types/api";
import { mockTenant } from "@/data/tenants";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

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
    <>
      <ResidenceBasicInfo
        residence={residenceData}
        property={property}
        district={district}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.showTenantInfo && (
          <TenantInformation tenant={mockTenant} />
        )}
        {features.showApartmentIssues && (
          <CreateIssue />
        )}
      </div>
      
      {roomsData && features.showRoomInformation && (
        <ResidenceInfo 
          rooms={roomsData}
          getOrientationText={getOrientationText}
        />
      )}

      {roomsData && features.showInspections && (
        <ResidenceInspection
          rooms={roomsData}
        />
      )}
    </>
  );
};

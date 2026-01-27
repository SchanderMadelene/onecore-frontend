import { Order } from "../types";
import type { Room } from "@/types/api";
import { useResidenceData } from "@/features/residences";
import { useParams } from "react-router-dom";
import { mockTenant, mockMultipleTenants, mockSecondHandTenants } from "@/features/tenants";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useOrderForm } from "../hooks/useOrderForm";
import { Form } from "@/components/ui/form";
import { MaintenanceUnit } from "@/types/api";
import { useIsMobile } from "@/hooks/use-mobile";

// Importing the form components
import { TenantInfoSection } from "./form-rhf/TenantInfoSection";
import { CategorySelectionSection } from "./form-rhf/CategorySelectionSection";
import { RoomSelectionSection } from "./form-rhf/RoomSelectionSection";
import { ComponentSelectionSection } from "./form-rhf/ComponentSelectionSection";
import { MasterKeySection } from "./form-rhf/MasterKeySection";
import { OrderDetailsSection } from "./form-rhf/OrderDetailsSection";
import { DateSelectionSection } from "./form-rhf/DateSelectionSection";
import { FormActions } from "./form/FormActions";

type OrderFormProps = {
  onSubmit: (orderData: Omit<Order, "id" | "status" | "reportedDate">) => void;
  onCancel: () => void;
  contextType?: "tenant" | "residence" | "building";
  rooms?: Room[];
  tenant?: any;
  residenceId?: string;
  maintenanceUnit?: MaintenanceUnit;
};

// Function to get tenant data based on residence ID
const getTenantDataByResidenceId = (residenceId?: string) => {
  switch(residenceId) {
    case "lgh-1001":
      return mockMultipleTenants;
    case "lgh-1002":
      return mockSecondHandTenants;
    default:
      return mockTenant;
  }
};

export function OrderForm({
  onSubmit,
  onCancel,
  contextType = "tenant",
  rooms = [],
  tenant,
  residenceId,
  maintenanceUnit
}: OrderFormProps) {
  const { id } = useParams();
  const { roomsData } = useResidenceData(id);
  const isMobile = useIsMobile();
  const availableRooms = rooms.length > 0 ? rooms : roomsData || [];
  
  const effectiveResidenceId = residenceId || id;
  const tenantData = tenant || getTenantDataByResidenceId(effectiveResidenceId);

  const { form, handleSubmit } = useOrderForm({
    onSubmit,
    contextType,
    rooms: availableRooms,
    residenceId: effectiveResidenceId,
    maintenanceUnit
  });

  return (
    <FormWrapper>
      <Form {...form}>
        <form onSubmit={handleSubmit} className={`space-y-4 ${isMobile ? 'space-y-6' : 'space-y-6'}`}>
          <div className={isMobile ? "space-y-4" : ""}>
            <TenantInfoSection tenant={tenantData} />
          </div>
          
          {contextType === "residence" && (
            <div className={`space-y-4 ${isMobile ? 'space-y-4' : 'space-y-6'}`}>
              <CategorySelectionSection />
              <RoomSelectionSection availableRooms={availableRooms} />
              <ComponentSelectionSection />
            </div>
          )}
          
          <div className={`space-y-4 ${isMobile ? 'space-y-4' : 'space-y-6'}`}>
            <MasterKeySection />
            <OrderDetailsSection />
            <DateSelectionSection />
          </div>
          
          <div className={isMobile ? "pt-4 border-t" : ""}>
            <FormActions onCancel={onCancel} />
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

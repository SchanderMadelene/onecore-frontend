
import { Order } from "@/hooks/useOrdersService";
import type { Room } from "@/types/api";
import { useResidenceData } from "@/hooks/useResidenceData";
import { useParams } from "react-router-dom";
import { mockTenant, mockMultipleTenants, mockSecondHandTenants } from "@/data/tenants";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useOrderForm } from "@/hooks/useOrderForm";
import { Form } from "@/components/ui/form";

// Importing the new form components
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
  contextType?: "tenant" | "residence";
  rooms?: Room[];
  tenant?: any;
  residenceId?: string;
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
  residenceId
}: OrderFormProps) {
  const { id } = useParams();
  const { roomsData } = useResidenceData(id);
  const availableRooms = rooms.length > 0 ? rooms : roomsData || [];
  
  const effectiveResidenceId = residenceId || id;
  const tenantData = tenant || getTenantDataByResidenceId(effectiveResidenceId);

  const { form, handleSubmit } = useOrderForm({
    onSubmit,
    contextType,
    rooms: availableRooms,
    residenceId: effectiveResidenceId
  });

  return (
    <FormWrapper>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TenantInfoSection tenant={tenantData} />
          
          {contextType === "residence" && (
            <>
              <CategorySelectionSection />
              <RoomSelectionSection availableRooms={availableRooms} />
              <ComponentSelectionSection />
            </>
          )}
          
          <MasterKeySection />
          <OrderDetailsSection />
          <DateSelectionSection />
          <FormActions onCancel={onCancel} />
        </form>
      </Form>
    </FormWrapper>
  );
}

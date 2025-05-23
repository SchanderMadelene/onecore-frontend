
import { Order } from "@/hooks/useOrdersService";
import type { Room } from "@/types/api";
import { useResidenceData } from "@/hooks/useResidenceData";
import { useParams } from "react-router-dom";
import { mockTenant, mockMultipleTenants, mockSecondHandTenants } from "@/data/tenants";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useOrderForm } from "@/hooks/useOrderForm";

// Importing the component sections
import { TenantInfoSection } from "./form/TenantInfoSection";
import { CategorySelectionSection } from "./form/CategorySelectionSection";
import { RoomSelectionSection } from "./form/RoomSelectionSection";
import { ComponentSelectionSection } from "./form/ComponentSelectionSection";
import { MasterKeySection } from "./form/MasterKeySection";
import { OrderDetailsSection } from "./form/OrderDetailsSection";
import { DateSelectionSection } from "./form/DateSelectionSection";
import { FormActions } from "./form/FormActions";

type OrderFormProps = {
  onSubmit: (orderData: Omit<Order, "id" | "status" | "reportedDate">) => void;
  onCancel: () => void;
  contextType?: "tenant" | "residence";
  rooms?: Room[];
  tenant?: any; // Optional tenant prop
  residenceId?: string; // Added residenceId prop
};

// Function to get tenant data based on residence ID - samma logik som i ResidenceContent
const getTenantDataByResidenceId = (residenceId?: string) => {
  switch(residenceId) {
    case "lgh-1001":
      return mockMultipleTenants; // Sambos
    case "lgh-1002":
      return mockSecondHandTenants; // Andrahandsuthyrning
    default:
      return mockTenant; // Enskild hyresgäst
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
  
  // Get the effective residence ID and corresponding tenant data
  const effectiveResidenceId = residenceId || id;
  const tenantData = tenant || getTenantDataByResidenceId(effectiveResidenceId);

  const { 
    formState, 
    setters, 
    handleSubmit 
  } = useOrderForm({
    onSubmit,
    contextType,
    rooms: availableRooms,
    residenceId: effectiveResidenceId
  });

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {/* Tenant information section */}
      <TenantInfoSection tenant={tenantData} />
      
      {/* Category selection section - only shown in residence context */}
      {contextType === "residence" && (
        <CategorySelectionSection 
          selectedCategory={formState.selectedCategory}
          setSelectedCategory={setters.setSelectedCategory}
        />
      )}
      
      {/* Room selection section - only shown in residence context */}
      {contextType === "residence" && (
        <RoomSelectionSection 
          selectedRoom={formState.selectedRoom}
          setSelectedRoom={setters.setSelectedRoom}
          availableRooms={availableRooms}
        />
      )}
      
      {/* Component selection section - only shown in residence context */}
      {contextType === "residence" && (
        <ComponentSelectionSection
          selectedComponent={formState.selectedComponent}
          setSelectedComponent={setters.setSelectedComponent}
        />
      )}
      
      {/* Master Key section */}
      <MasterKeySection
        needsMasterKey={formState.needsMasterKey}
        setNeedsMasterKey={setters.setNeedsMasterKey}
      />
      
      {/* Order details section */}
      <OrderDetailsSection
        title={formState.title}
        setTitle={setters.setTitle}
        description={formState.description}
        setDescription={setters.setDescription}
        priority={formState.priority}
        setPriority={setters.setPriority}
        assignedTo={formState.assignedTo}
        setAssignedTo={setters.setAssignedTo}
      />
      
      {/* Date selection section */}
      <DateSelectionSection
        plannedExecutionDate={formState.plannedExecutionDate}
        setPlannedExecutionDate={setters.setPlannedExecutionDate}
        dueDate={formState.dueDate}
        setDueDate={setters.setDueDate}
      />
      
      {/* Form actions section */}
      <FormActions onCancel={onCancel} />
    </FormWrapper>
  );
}

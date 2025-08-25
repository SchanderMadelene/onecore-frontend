
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, OrderFormData, transformFormDataToOrder } from "./useOrderFormValidation";
import { Order } from "./useOrdersService";
import { Room, MaintenanceUnit } from "@/types/api";

type UseOrderFormProps = {
  onSubmit: (orderData: Omit<Order, "id" | "status" | "reportedDate">) => void;
  contextType: "tenant" | "residence" | "building";
  rooms: Room[];
  residenceId?: string;
  maintenanceUnit?: MaintenanceUnit;
};

export const useOrderForm = ({ onSubmit, contextType, rooms, residenceId, maintenanceUnit }: UseOrderFormProps) => {
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      assignedTo: "",
      selectedCategory: "",
      selectedRoom: "",
      selectedComponent: "",
      needsMasterKey: "nej",
      plannedExecutionDate: undefined,
      dueDate: undefined,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const orderData = transformFormDataToOrder(
      data,
      residenceId || "",
      contextType,
      maintenanceUnit
    );
    onSubmit(orderData);
  });

  return {
    form,
    handleSubmit,
  };
};

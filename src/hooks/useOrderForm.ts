
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, OrderFormData, transformFormDataToOrder } from "./useOrderFormValidation";
import { Order } from "./useOrdersService";
import { Room } from "@/types/api";

type UseOrderFormProps = {
  onSubmit: (orderData: Omit<Order, "id" | "status" | "reportedDate">) => void;
  contextType: "tenant" | "residence";
  rooms: Room[];
  residenceId?: string;
};

export const useOrderForm = ({ onSubmit, contextType, rooms, residenceId }: UseOrderFormProps) => {
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
      contextType
    );
    onSubmit(orderData);
  });

  return {
    form,
    handleSubmit,
  };
};

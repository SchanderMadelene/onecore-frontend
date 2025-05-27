
import { z } from "zod";

export const orderFormSchema = z.object({
  title: z.string().min(1, "Titel krävs"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Prioritet krävs",
  }),
  assignedTo: z.string().min(1, "Handläggare krävs"),
  selectedCategory: z.string().optional(),
  selectedRoom: z.string().optional(),
  selectedComponent: z.string().optional(),
  needsMasterKey: z.enum(["ja", "nej"]),
  plannedExecutionDate: z.date().optional(),
  dueDate: z.date().optional(),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;

// Transform function to convert form data to order data
export const transformFormDataToOrder = (
  formData: OrderFormData,
  residenceId: string,
  contextType: "tenant" | "residence"
) => {
  return {
    title: formData.title,
    description: formData.description || "",
    priority: formData.priority,
    assignedTo: formData.assignedTo,
    category: formData.selectedCategory,
    roomId: formData.selectedRoom,
    needsMasterKey: formData.needsMasterKey === "ja",
    plannedExecutionDate: formData.plannedExecutionDate?.toISOString().split('T')[0],
    dueDate: formData.dueDate?.toISOString().split('T')[0],
    residenceId,
  };
};


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@/hooks/useOrdersService";
import { Room } from "@/types/api";
import { format } from "date-fns";
import { orderFormSchema, OrderFormData } from "./useOrderFormValidation";

type UseOrderFormProps = {
  onSubmit: (orderData: Omit<Order, "id" | "status" | "reportedDate">) => void;
  contextType?: "tenant" | "residence";
  rooms?: Room[];
  residenceId?: string;
};

export function useOrderForm({ 
  onSubmit, 
  contextType = "tenant",
  rooms = [],
  residenceId 
}: UseOrderFormProps) {
  const { toast } = useToast();
  
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      assignedTo: "Johan Andersson",
      selectedCategory: "",
      selectedRoom: "",
      selectedComponent: "",
      needsMasterKey: "nej",
      plannedExecutionDate: undefined,
      dueDate: undefined,
    },
  });

  const { watch, setValue } = form;
  const selectedRoom = watch("selectedRoom");
  const selectedCategory = watch("selectedCategory");
  const selectedComponent = watch("selectedComponent");
  
  // Update title when room, category and component are selected
  useEffect(() => {
    if (selectedRoom && contextType === "residence") {
      const roomName = rooms.find(room => room.id === selectedRoom)?.name || "";
      if (roomName) {
        let newTitle = `Problem i ${roomName}`;
        
        if (selectedCategory && selectedComponent) {
          newTitle = `${selectedCategory}: Problem med ${selectedComponent.toLowerCase()} i ${roomName}`;
        } else if (selectedCategory) {
          newTitle = `${selectedCategory}: Problem i ${roomName}`;
        } else if (selectedComponent) {
          newTitle = `Problem med ${selectedComponent.toLowerCase()} i ${roomName}`;
        }
        
        setValue("title", newTitle);
      }
    }
  }, [selectedRoom, selectedCategory, selectedComponent, rooms, contextType, setValue]);

  const handleFormSubmit = (data: OrderFormData) => {
    // Add room, category and component information to the description if selected
    let finalDescription = data.description || "";
    if (contextType === "residence") {
      let locationInfo = "";
      
      if (data.selectedCategory) {
        locationInfo += `Kategori: ${data.selectedCategory}\n`;
      }
      
      if (data.selectedRoom) {
        const roomName = rooms.find(room => room.id === data.selectedRoom)?.name || "";
        if (roomName) {
          locationInfo += `Rum: ${roomName}\n`;
        }
      }
      
      if (data.selectedComponent) {
        locationInfo += `Komponent: ${data.selectedComponent}\n`;
      }

      // Lägg till information om huvudnyckel
      locationInfo += `Huvudnyckel behövs: ${data.needsMasterKey}\n`;
      
      if (locationInfo) {
        finalDescription = `${locationInfo}\n${finalDescription}`;
      }
    }

    onSubmit({
      title: data.title,
      description: finalDescription,
      priority: data.priority,
      assignedTo: data.assignedTo,
      category: data.selectedCategory,
      roomId: contextType === "residence" ? data.selectedRoom : undefined,
      needsMasterKey: data.needsMasterKey === "ja",
      plannedExecutionDate: data.plannedExecutionDate ? format(data.plannedExecutionDate, 'yyyy-MM-dd') : undefined,
      dueDate: data.dueDate ? format(data.dueDate, 'yyyy-MM-dd') : undefined,
      residenceId: residenceId
    });
    
    toast({
      title: "Ärende skapat",
      description: "Ditt ärende har skapats framgångsrikt."
    });
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleFormSubmit),
  };
}

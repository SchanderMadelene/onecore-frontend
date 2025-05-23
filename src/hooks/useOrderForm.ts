
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@/hooks/useOrdersService";
import { Room } from "@/types/api";
import { format } from "date-fns";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("Johan Andersson");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("");
  const [needsMasterKey, setNeedsMasterKey] = useState("nej");
  const [plannedExecutionDate, setPlannedExecutionDate] = useState<Date | undefined>(undefined);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  
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
        
        setTitle(newTitle);
      }
    }
  }, [selectedRoom, selectedCategory, selectedComponent, rooms, contextType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({
        title: "Titel krävs",
        description: "Vänligen ange en titel för ärendet.",
        variant: "destructive"
      });
      return;
    }

    // Add room, category and component information to the description if selected
    let finalDescription = description;
    if (contextType === "residence") {
      let locationInfo = "";
      
      if (selectedCategory) {
        locationInfo += `Kategori: ${selectedCategory}\n`;
      }
      
      if (selectedRoom) {
        const roomName = rooms.find(room => room.id === selectedRoom)?.name || "";
        if (roomName) {
          locationInfo += `Rum: ${roomName}\n`;
        }
      }
      
      if (selectedComponent) {
        locationInfo += `Komponent: ${selectedComponent}\n`;
      }

      // Lägg till information om huvudnyckel
      locationInfo += `Huvudnyckel behövs: ${needsMasterKey}\n`;
      
      if (locationInfo) {
        finalDescription = `${locationInfo}\n${description}`;
      }
    }

    onSubmit({
      title,
      description: finalDescription,
      priority,
      assignedTo,
      category: selectedCategory,
      roomId: contextType === "residence" ? selectedRoom : undefined,
      needsMasterKey: needsMasterKey === "ja",
      plannedExecutionDate: plannedExecutionDate ? format(plannedExecutionDate, 'yyyy-MM-dd') : undefined,
      dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : undefined,
      residenceId: residenceId
    });
    
    toast({
      title: "Ärende skapat",
      description: "Ditt ärende har skapats framgångsrikt."
    });
  };

  return {
    formState: {
      title,
      description,
      priority,
      assignedTo,
      selectedCategory,
      selectedRoom,
      selectedComponent,
      needsMasterKey,
      plannedExecutionDate,
      dueDate
    },
    setters: {
      setTitle,
      setDescription,
      setPriority,
      setAssignedTo,
      setSelectedCategory,
      setSelectedRoom,
      setSelectedComponent,
      setNeedsMasterKey,
      setPlannedExecutionDate,
      setDueDate
    },
    handleSubmit
  };
}


import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Order } from "@/hooks/useOrdersService";
import type { Room } from "@/types/api";
import { useResidenceData } from "@/hooks/useResidenceData";
import { useParams } from "react-router-dom";
import { mockTenant, mockMultipleTenants, mockSecondHandTenants } from "@/data/tenants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

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
  
  const { id } = useParams();
  const { roomsData } = useResidenceData(id);
  const availableRooms = rooms.length > 0 ? rooms : roomsData || [];
  
  // Get the effective residence ID and corresponding tenant data
  const effectiveResidenceId = residenceId || id;
  const tenantData = tenant || getTenantDataByResidenceId(effectiveResidenceId);

  // Update title when room, category and component are selected
  useEffect(() => {
    if (selectedRoom && contextType === "residence") {
      const roomName = availableRooms.find(room => room.id === selectedRoom)?.name || "";
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
  }, [selectedRoom, selectedCategory, selectedComponent, availableRooms, contextType]);

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
        const roomName = availableRooms.find(room => room.id === selectedRoom)?.name || "";
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

  return (
    <ScrollArea className="max-h-[calc(95vh-10rem)]">
      <form onSubmit={handleSubmit} className="space-y-4 pr-4">
        {/* Tenant information section */}
        <TenantInfoSection tenant={tenantData} />
        
        {/* Category selection section - only shown in residence context */}
        {contextType === "residence" && (
          <CategorySelectionSection 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        
        {/* Room selection section - only shown in residence context */}
        {contextType === "residence" && (
          <RoomSelectionSection 
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            availableRooms={availableRooms}
          />
        )}
        
        {/* Component selection section - only shown in residence context */}
        {contextType === "residence" && (
          <ComponentSelectionSection
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
          />
        )}
        
        {/* Master Key section */}
        <MasterKeySection
          needsMasterKey={needsMasterKey}
          setNeedsMasterKey={setNeedsMasterKey}
        />
        
        {/* Order details section */}
        <OrderDetailsSection
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          priority={priority}
          setPriority={setPriority}
          assignedTo={assignedTo}
          setAssignedTo={setAssignedTo}
        />
        
        {/* Date selection section */}
        <DateSelectionSection
          plannedExecutionDate={plannedExecutionDate}
          setPlannedExecutionDate={setPlannedExecutionDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
        />
        
        {/* Form actions section */}
        <FormActions onCancel={onCancel} />
      </form>
    </ScrollArea>
  );
}

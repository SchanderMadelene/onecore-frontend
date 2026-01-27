import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderForm } from "./OrderForm";
import { useState } from "react";
import { useOrdersService } from "../hooks/useOrdersService";
import { Order } from "../types";
import { useParams } from "react-router-dom";
import { useResidenceData } from "@/features/residences";
import { MaintenanceUnit } from "@/types/api";

type CreateOrderDialogProps = {
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  contextType?: "tenant" | "residence" | "building";
  onOrderCreated?: () => void;
  tenant?: any;
  residenceId?: string;
  maintenanceUnit?: MaintenanceUnit;
};

export function CreateOrderDialog({ 
  buttonSize = "default", 
  buttonVariant = "default",
  contextType = "tenant",
  onOrderCreated,
  tenant,
  residenceId,
  maintenanceUnit
}: CreateOrderDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { createOrder } = useOrdersService();
  const { id } = useParams();
  const { roomsData } = useResidenceData(id);

  const effectiveResidenceId = residenceId || id;

  const handleCreateOrder = (orderData: Omit<Order, "id" | "status" | "reportedDate">) => {
    createOrder({
      ...orderData,
      reportedDate: new Date().toISOString().split('T')[0],
      status: "active"
    });

    setIsOpen(false);
    
    if (onOrderCreated) {
      onOrderCreated();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={buttonSize} variant={buttonVariant}>
          <FilePlus className="mr-2 h-4 w-4" />
          Skapa ärende
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {maintenanceUnit 
              ? `Skapa ärende för ${maintenanceUnit.type}` 
              : "Skapa nytt ärende"
            }
          </DialogTitle>
        </DialogHeader>
        <OrderForm 
          onSubmit={handleCreateOrder}
          onCancel={() => setIsOpen(false)} 
          contextType={contextType}
          rooms={contextType === "residence" ? roomsData : []}
          tenant={tenant}
          residenceId={effectiveResidenceId}
          maintenanceUnit={maintenanceUnit}
        />
      </DialogContent>
    </Dialog>
  );
}

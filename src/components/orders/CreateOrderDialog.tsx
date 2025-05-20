
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
import { useOrdersService, Order } from "@/hooks/useOrdersService";
import { useParams } from "react-router-dom";
import { useResidenceData } from "@/hooks/useResidenceData";
import { mockTenant, mockSecondHandTenants } from "@/data/tenants";

type CreateOrderDialogProps = {
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  contextType?: "tenant" | "residence";
  onOrderCreated?: () => void;
};

export function CreateOrderDialog({ 
  buttonSize = "default", 
  buttonVariant = "default",
  contextType = "tenant",
  onOrderCreated
}: CreateOrderDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { createOrder } = useOrdersService();
  const { id } = useParams();
  const { roomsData } = useResidenceData(id);

  // Use second-hand tenants for a better showcase when in design system
  const tenant = window.location.pathname.includes('design-system')
    ? mockSecondHandTenants
    : mockTenant;

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
          <DialogTitle>Skapa nytt ärende</DialogTitle>
        </DialogHeader>
        <OrderForm 
          onSubmit={handleCreateOrder}
          onCancel={() => setIsOpen(false)} 
          contextType={contextType}
          rooms={contextType === "residence" ? roomsData : []}
          tenant={tenant}
        />
      </DialogContent>
    </Dialog>
  );
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderCard } from "@/components/orders/OrderCard";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";
import { Button } from "@/components/ui/button";
import { InspectionReadOnly } from "@/components/residence/inspection/InspectionReadOnly";
import { useState } from "react";

// Example inspection data
const exampleInspection = {
  id: "i1",
  date: new Date().toISOString(),
  inspectedBy: "Anna Johansson",
  rooms: {
    "Room1": {
      conditions: {
        "walls": "good",
        "floor": "acceptable",
        "ceiling": "good",
        "windows": "poor"
      },
      actions: {
        "walls": [],
        "floor": [],
        "ceiling": [],
        "windows": ["Replace window seals", "Fix window latch"]
      },
      componentNotes: {
        "walls": "",
        "floor": "Some scratches near the entrance",
        "ceiling": "",
        "windows": "Window in north wall doesn't seal properly"
      }
    }
  }
};

export const OrdersShowcase = () => {
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);

  const sampleOrder = {
    id: "OD-123",
    title: "WEBB: Felanmäld Lägenhet - Tvättmaskin",
    description: "Väntar på handläggning",
    reportedDate: "2025-04-28",
    status: "pending",
    priority: "medium",
    assignedTo: "Johan Andersson"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Cards and Dialogs</CardTitle>
        <CardDescription>Cards and dialogs used for displaying and creating maintenance orders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <OrderCard orderItem={sampleOrder} />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dialog Examples</h3>
          <div className="flex flex-wrap gap-4">
            <CreateOrderDialog 
              buttonSize="default" 
              buttonVariant="outline"
              contextType="residence" 
            />
            
            <Button 
              variant="outline" 
              onClick={() => setIsInspectionOpen(true)}
            >
              Visa besiktningsprotokoll
            </Button>
            
            <InspectionReadOnly 
              inspection={exampleInspection} 
              isOpen={isInspectionOpen} 
              onClose={() => setIsInspectionOpen(false)} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

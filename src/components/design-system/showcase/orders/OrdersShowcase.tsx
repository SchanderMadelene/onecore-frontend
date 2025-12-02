
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderCard } from "@/components/orders/OrderCard";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";
import { Button } from "@/components/ui/button";
import { InspectionReadOnly } from "@/components/residence/inspection/InspectionReadOnly";
import { useState } from "react";
import type { Inspection, InspectionSubmitData } from "@/components/residence/inspection/types";
import { InspectionFormDialog } from "@/components/residence/inspection/InspectionFormDialog";
import { mockRoomsData } from "@/data/rooms";
import { mockTenant } from "@/data/tenants";

// Example inspection data
const exampleInspection: Inspection = {
  id: "i1",
  inspectionNumber: "B-2024-001",
  date: new Date().toISOString(),
  inspectedBy: "Anna Johansson",
  status: 'completed',
  residence: {
    id: "res-example",
    objectNumber: "LGH-001",
    address: "Exempelgatan 1",
    apartmentType: "Standard",
    size: 72
  },
  needsMasterKey: false,
  tenant: {
    name: "Erik Svensson",
    personalNumber: "19850101-1234",
    phone: "070-123 45 67",
    email: "erik.svensson@example.com"
  },
  rooms: {
    "Room1": {
      roomId: "Room1",
      conditions: {
        wall1: "good",
        wall2: "good",
        wall3: "good",
        wall4: "good",
        floor: "acceptable",
        ceiling: "good",
        details: "poor"
      },
      actions: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: ["Replace window seals", "Fix window latch"]
      },
      componentNotes: {
        wall1: "",
        wall2: "",
        wall3: "",
        wall4: "",
        floor: "Some scratches near the entrance",
        ceiling: "",
        details: "Window in north wall doesn't seal properly"
      },
      componentPhotos: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: []
      },
      photos: [],
      isApproved: false,
      isHandled: false
    }
  }
};

export const OrdersShowcase = () => {
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [isCreateInspectionOpen, setIsCreateInspectionOpen] = useState(false);

  const sampleOrder = {
    id: "OD-123",
    title: "WEBB: Felanmäld Lägenhet - Tvättmaskin",
    description: "Väntar på handläggning",
    reportedDate: "2025-04-28",
    status: "pending",
    priority: "medium",
    assignedTo: "Johan Andersson"
  };

  // Use proper Room data from our mock data
  const sampleRooms = mockRoomsData.content;

  const handleSubmitInspection = (
    inspectorName: string, 
    rooms: any, 
    status: 'draft' | 'completed',
    additionalData: InspectionSubmitData
  ) => {
    setIsCreateInspectionOpen(false);
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
              tenant={mockTenant}
            />
            
            <Button 
              variant="outline" 
              onClick={() => setIsInspectionOpen(true)}
            >
              Visa besiktningsprotokoll
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setIsCreateInspectionOpen(true)}
            >
              Skapa besiktning
            </Button>
            
            <InspectionReadOnly 
              inspection={exampleInspection} 
              isOpen={isInspectionOpen} 
              onClose={() => setIsInspectionOpen(false)} 
            />
            
            <InspectionFormDialog 
              isOpen={isCreateInspectionOpen}
              onClose={() => setIsCreateInspectionOpen(false)}
              onSubmit={handleSubmitInspection}
              rooms={sampleRooms}
              buttonSize="default"
              tenant={mockTenant}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

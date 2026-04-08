
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderCard, CreateOrderDialog } from "@/features/orders";
import { Button } from "@/components/ui/button";
import { InspectionReadOnly } from "@/features/residences/components/inspection/InspectionReadOnly";
import { useState } from "react";
import type { Inspection, InspectionSubmitData } from "@/features/residences/components/inspection/types";
import { InspectionFormDialog } from "@/features/residences/components/inspection/InspectionFormDialog";
import { mockRoomsData } from "@/features/residences/data/rooms";
import { mockTenant } from "@/features/tenants/data/tenants";

// Mockdata med anmärkningar och kostnadsansvar
const exampleInspection: Inspection = {
  id: "insp-demo-001",
  inspectionNumber: "B-2024-047",
  date: new Date().toISOString(),
  inspectedBy: "Anna Johansson",
  status: "completed",
  needsMasterKey: false,
  inspectionType: 'moveout_maintenance',
  residence: {
    id: "res-001",
    objectNumber: "LGH-3204",
    address: "Stallgatan 14B, lgh 1102",
    apartmentType: "3 rum och kök",
    size: 78,
  },
  tenant: {
    name: "Erik Svensson",
    personalNumber: "19850101-1234",
    phone: "070-123 45 67",
    email: "erik.svensson@example.com",
  },
  rooms: {
    kitchen: {
      roomId: "kitchen",
      conditions: {
        walls: "Skadad",
        floor: "Acceptabel",
        ceiling: "Bra",
        appliances: "Skadad",
        kitchenDoors: "Skadad",
      },
      actions: {
        walls: ["Målning", "Spackling"],
        floor: ["Slipning"],
        ceiling: [],
        appliances: ["Byte"],
        kitchenDoors: ["Byte", "Justering"],
      },
      componentNotes: {
        walls: "Stora sprickor vid fönster, troligen fuktskada.",
        floor: "Repor vid diskbänk.",
        ceiling: "",
        appliances: "Diskmaskin fungerar ej.",
        kitchenDoors: "Två köksluckor har lossnat och behöver bytas.",
      },
      componentPhotos: {
        walls: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&h=400&fit=crop",
        ],
        floor: [
          "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=400&fit=crop",
        ],
        ceiling: [],
        appliances: [],
        kitchenDoors: [
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=400&fit=crop",
        ],
      },
      costResponsibility: {
        walls: "tenant",
        floor: "tenant",
        ceiling: null,
        appliances: "tenant",
        kitchenDoors: "tenant",
      },
      photos: [],
      costs: {},
      customComponents: [],
      isApproved: true,
      isHandled: true,
    },
    livingRoom: {
      roomId: "livingRoom",
      conditions: {
        walls: "Skadad",
        floor: "Skadad",
        ceiling: "Bra",
        appliances: "Bra",
        kitchenDoors: "Bra",
      },
      actions: {
        walls: ["Målning"],
        floor: ["Byte av parkettbrädor"],
        ceiling: [],
        appliances: [],
        kitchenDoors: [],
      },
      componentNotes: {
        walls: "Hål efter upphängning som inte lagats korrekt.",
        floor: "Vattenskada vid balkongdörr. Tre brädor behöver bytas.",
        ceiling: "",
        appliances: "",
        kitchenDoors: "",
      },
      componentPhotos: {
        walls: [],
        floor: [],
        ceiling: [],
        appliances: [],
        kitchenDoors: [],
      },
      costResponsibility: {
        walls: "tenant",
        floor: "landlord",
        ceiling: null,
        appliances: null,
        kitchenDoors: null,
      },
      photos: [],
      costs: {},
      customComponents: [],
      isApproved: true,
      isHandled: true,
    },
    bathroom: {
      roomId: "bathroom",
      conditions: {
        walls: "Skadad",
        floor: "Bra",
        ceiling: "Acceptabel",
        appliances: "Skadad",
        kitchenDoors: "Bra",
      },
      actions: {
        walls: ["Fogning", "Byte av kakel"],
        floor: [],
        ceiling: ["Målning"],
        appliances: ["Byte av duschblandare", "Tätning runt handfat"],
        kitchenDoors: [],
      },
      componentNotes: {
        walls: "Tre kakelplattor är spruckna. Fogar lossnar vid duschvägg.",
        floor: "",
        ceiling: "Missfärgning från fukt.",
        appliances: "Duschblandaren läcker.",
        kitchenDoors: "",
      },
      componentPhotos: {
        walls: [
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=400&fit=crop",
        ],
        floor: [],
        ceiling: [],
        appliances: [
          "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=400&h=400&fit=crop",
        ],
        kitchenDoors: [],
      },
      costResponsibility: {
        walls: "tenant",
        floor: null,
        ceiling: "landlord",
        appliances: "tenant",
        kitchenDoors: null,
      },
      photos: [],
      costs: {},
      customComponents: [],
      isApproved: true,
      isHandled: true,
    },
  },
};

// Rumsnamn för visning
const roomNames: Record<string, string> = {
  kitchen: "Kök",
  livingRoom: "Vardagsrum",
  bathroom: "Badrum",
};

// Mock för inflyttande hyresgäst
const incomingTenant = {
  name: "Maria Andersson",
  email: "maria.andersson@example.com",
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
              roomNames={roomNames}
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

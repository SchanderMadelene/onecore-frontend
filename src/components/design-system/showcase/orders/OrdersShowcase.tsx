
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
        wall1: "Bra",
        wall2: "Skadad",
        wall3: "Bra",
        wall4: "Acceptabel",
        floor: "Acceptabel",
        ceiling: "Bra",
        details: "Skadad",
      },
      actions: {
        wall1: [],
        wall2: ["Målning", "Spackling"],
        wall3: [],
        wall4: ["Mindre reparation"],
        floor: ["Slipning"],
        ceiling: [],
        details: ["Byte av köksluckor", "Justering av gångjärn"],
      },
      componentNotes: {
        wall1: "",
        wall2: "Stora sprickor vid fönster, troligen fuktskada.",
        wall3: "",
        wall4: "",
        floor: "Repor vid diskbänk.",
        ceiling: "",
        details: "Två köksluckor har lossnat och behöver bytas.",
      },
      componentPhotos: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: [],
      },
      costResponsibility: {
        wall1: null,
        wall2: "tenant",
        wall3: null,
        wall4: "landlord",
        floor: "tenant",
        ceiling: null,
        details: "tenant",
      },
      photos: [],
      isApproved: true,
      isHandled: true,
    },
    livingRoom: {
      roomId: "livingRoom",
      conditions: {
        wall1: "Bra",
        wall2: "Bra",
        wall3: "Skadad",
        wall4: "Bra",
        floor: "Skadad",
        ceiling: "Bra",
        details: "Bra",
      },
      actions: {
        wall1: [],
        wall2: [],
        wall3: ["Målning"],
        wall4: [],
        floor: ["Byte av parkettbrädor"],
        ceiling: [],
        details: [],
      },
      componentNotes: {
        wall1: "",
        wall2: "",
        wall3: "Hål efter upphängning som inte lagats korrekt.",
        wall4: "",
        floor: "Vattenskada vid balkongdörr. Tre brädor behöver bytas.",
        ceiling: "",
        details: "",
      },
      componentPhotos: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: [],
      },
      costResponsibility: {
        wall1: null,
        wall2: null,
        wall3: "tenant",
        wall4: null,
        floor: "landlord",
        ceiling: null,
        details: null,
      },
      photos: [],
      isApproved: true,
      isHandled: true,
    },
    bathroom: {
      roomId: "bathroom",
      conditions: {
        wall1: "Acceptabel",
        wall2: "Skadad",
        wall3: "Bra",
        wall4: "Bra",
        floor: "Bra",
        ceiling: "Acceptabel",
        details: "Skadad",
      },
      actions: {
        wall1: ["Fogning"],
        wall2: ["Byte av kakel", "Fogning"],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: ["Målning"],
        details: ["Byte av duschblandare", "Tätning runt handfat"],
      },
      componentNotes: {
        wall1: "Några fogar har börjat lossna vid duschvägg.",
        wall2: "Tre kakelplattor är spruckna.",
        wall3: "",
        wall4: "",
        floor: "",
        ceiling: "Missfärgning från fukt.",
        details: "Duschblandaren läcker.",
      },
      componentPhotos: {
        wall1: [],
        wall2: [],
        wall3: [],
        wall4: [],
        floor: [],
        ceiling: [],
        details: [],
      },
      costResponsibility: {
        wall1: "landlord",
        wall2: "tenant",
        wall3: null,
        wall4: null,
        floor: null,
        ceiling: "landlord",
        details: "tenant",
      },
      photos: [],
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
              incomingTenant={incomingTenant}
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

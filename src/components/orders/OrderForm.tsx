
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Order } from "@/hooks/useOrdersService";
import type { Room } from "@/types/api";
import { useResidenceData } from "@/hooks/useResidenceData";
import { useParams } from "react-router-dom";
import { TenantInformation } from "@/components/residence/inspection/form/TenantInformation";
import { mockTenant } from "@/data/tenants";
import type { Tenant } from "@/components/residence/inspection/form/tenant/types";

type OrderFormProps = {
  onSubmit: (orderData: Omit<Order, "id" | "status" | "reportedDate">) => void;
  onCancel: () => void;
  contextType?: "tenant" | "residence";
  rooms?: Room[];
  tenant?: Tenant;
};

export function OrderForm({ onSubmit, onCancel, contextType = "tenant", rooms = [], tenant = mockTenant }: OrderFormProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("Johan Andersson");
  const [selectedRoom, setSelectedRoom] = useState("");
  const { id } = useParams();
  const { roomsData } = useResidenceData(id);
  
  const availableRooms = rooms.length > 0 ? rooms : roomsData || [];

  // Update title when room is selected
  useEffect(() => {
    if (selectedRoom && contextType === "residence") {
      const roomName = availableRooms.find(room => room.id === selectedRoom)?.name || "";
      if (roomName) {
        setTitle(`Problem i ${roomName}`);
      }
    }
  }, [selectedRoom, availableRooms, contextType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Titel krävs",
        description: "Vänligen ange en titel för ärendet.",
        variant: "destructive",
      });
      return;
    }
    
    // Add room information to the description if selected
    let finalDescription = description;
    if (selectedRoom && contextType === "residence") {
      const roomName = availableRooms.find(room => room.id === selectedRoom)?.name || "";
      if (roomName) {
        finalDescription = `Rum: ${roomName}\n\n${description}`;
      }
    }
    
    onSubmit({
      title,
      description: finalDescription,
      priority,
      assignedTo,
      roomId: contextType === "residence" ? selectedRoom : undefined
    });

    toast({
      title: "Ärende skapat",
      description: "Ditt ärende har skapats framgångsrikt.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Show tenant information when in residence context */}
      {contextType === "residence" && (
        <div className="bg-slate-50 rounded-lg border border-slate-200">
          <TenantInformation tenant={tenant} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {contextType === "residence" && availableRooms.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="room">Rum</Label>
            <Select 
              value={selectedRoom} 
              onValueChange={setSelectedRoom}
            >
              <SelectTrigger id="room">
                <SelectValue placeholder="Välj rum" />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.map(room => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="title">Titel</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Kort beskrivning av ärendet"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Beskrivning</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detaljerad beskrivning av ärendet"
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="priority">Prioritet</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Välj prioritet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Låg</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">Hög</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="assignedTo">Tilldela till</Label>
          <Select value={assignedTo} onValueChange={setAssignedTo}>
            <SelectTrigger id="assignedTo">
              <SelectValue placeholder="Välj handläggare" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Johan Andersson">Johan Andersson</SelectItem>
              <SelectItem value="Maria Nilsson">Maria Nilsson</SelectItem>
              <SelectItem value="Erik Svensson">Erik Svensson</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Avbryt
          </Button>
          <Button type="submit">Skapa ärende</Button>
        </div>
      </form>
    </div>
  );
}

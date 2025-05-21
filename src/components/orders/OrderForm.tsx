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
import { TenantInformationCard } from "@/components/tenants/TenantInformationCard";
import { mockTenant } from "@/data/tenants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Lista över möjliga komponenter för ett rum
const roomComponents = [
  "Golv",
  "Vägg",
  "Tak",
  "Dörr",
  "Fönster",
  "Kök",
  "Badrum",
  "Värme",
  "El",
  "Ventilation",
  "Tvättmaskin",
  "Torktumlare",
  "Diskmaskin",
  "Kyl/frys",
  "Spis",
  "Övrigt"
];

type OrderFormProps = {
  onSubmit: (orderData: Omit<Order, "id" | "status" | "reportedDate">) => void;
  onCancel: () => void;
  contextType?: "tenant" | "residence";
  rooms?: Room[];
  tenant?: any; // Optional tenant prop
};

export function OrderForm({ 
  onSubmit, 
  onCancel, 
  contextType = "tenant", 
  rooms = [],
  tenant = mockTenant // Default to mock tenant if not provided
}: OrderFormProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("Johan Andersson");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("");
  const [needsMasterKey, setNeedsMasterKey] = useState("nej"); // Ny state för huvudnyckel
  const { id } = useParams();
  const { roomsData } = useResidenceData(id);
  
  const availableRooms = rooms.length > 0 ? rooms : roomsData || [];

  // Update title when room and component are selected
  useEffect(() => {
    if (selectedRoom && contextType === "residence") {
      const roomName = availableRooms.find(room => room.id === selectedRoom)?.name || "";
      if (roomName) {
        let newTitle = `Problem i ${roomName}`;
        if (selectedComponent) {
          newTitle = `Problem med ${selectedComponent.toLowerCase()} i ${roomName}`;
        }
        setTitle(newTitle);
      }
    }
  }, [selectedRoom, selectedComponent, availableRooms, contextType]);

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
    
    // Add room and component information to the description if selected
    let finalDescription = description;
    if (contextType === "residence") {
      let locationInfo = "";
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
      roomId: contextType === "residence" ? selectedRoom : undefined,
      needsMasterKey: needsMasterKey === "ja" // Lägg till i ordern
    });

    toast({
      title: "Ärende skapat",
      description: "Ditt ärende har skapats framgångsrikt.",
    });
  };

  return (
    <ScrollArea className="max-h-[calc(95vh-10rem)]">
      <form onSubmit={handleSubmit} className="space-y-4 pr-4">
        {/* Tenant information section */}
        <TenantInformationCard tenant={tenant} />
        
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
        
        {/* Ny dropdown för komponent */}
        {contextType === "residence" && (
          <div className="space-y-2">
            <Label htmlFor="component">Komponent</Label>
            <Select 
              value={selectedComponent} 
              onValueChange={setSelectedComponent}
            >
              <SelectTrigger id="component">
                <SelectValue placeholder="Välj komponent" />
              </SelectTrigger>
              <SelectContent>
                {roomComponents.map(component => (
                  <SelectItem key={component} value={component}>
                    {component}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Ny radiogrupp för huvudnyckel */}
        <div className="space-y-2">
          <Label htmlFor="masterKey" className="block text-sm font-medium">
            Huvudnyckel?
          </Label>
          <RadioGroup
            id="masterKey"
            value={needsMasterKey}
            onValueChange={setNeedsMasterKey}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ja" id="masterKeyYes" />
              <Label htmlFor="masterKeyYes" className="cursor-pointer">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nej" id="masterKeyNo" />
              <Label htmlFor="masterKeyNo" className="cursor-pointer">Nej</Label>
            </div>
          </RadioGroup>
        </div>

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
    </ScrollArea>
  );
}

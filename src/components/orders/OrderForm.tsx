
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Order } from "@/hooks/useOrdersService";

type OrderFormProps = {
  onSubmit: (orderData: Omit<Order, "id" | "status" | "reportedDate">) => void;
  onCancel: () => void;
  contextType?: "tenant" | "residence";
};

export function OrderForm({ onSubmit, onCancel, contextType = "tenant" }: OrderFormProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("Johan Andersson");

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
    
    onSubmit({
      title,
      description,
      priority,
      assignedTo
    });

    toast({
      title: "Ärende skapat",
      description: "Ditt ärende har skapats framgångsrikt.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
  );
}

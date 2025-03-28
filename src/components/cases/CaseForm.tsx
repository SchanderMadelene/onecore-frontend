
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export interface Case {
  id: string;
  title: string;
  reportedDate: string;
  status: "active" | "resolved" | "pending";
  priority: "high" | "medium" | "low";
  description?: string;
  resolvedDate?: string;
  assignedTo?: string;
}

type CaseFormProps = {
  onSubmit: (caseData: Omit<Case, "id" | "status" | "reportedDate">) => void;
  onCancel: () => void;
  contextType?: "tenant" | "residence";
};

export function CaseForm({ onSubmit, onCancel, contextType = "tenant" }: CaseFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Case["priority"]>("medium");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      title,
      description,
      priority,
    });

    toast({
      title: "Ärende skapat",
      description: contextType === "tenant" 
        ? "Ditt ärende har registrerats och kommer att behandlas inom kort."
        : "Ärendet har registrerats och kommer att hanteras inom kort.",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titel</Label>
        <Input 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ange ärendets titel"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Beskrivning</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Beskriv ärendet mer detaljerat..."
          rows={4}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="priority">Prioritet</Label>
        <Select 
          value={priority} 
          onValueChange={(value) => setPriority(value as Case["priority"])}
        >
          <SelectTrigger id="priority">
            <SelectValue placeholder="Välj prioritet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">Hög</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Låg</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Avbryt
        </Button>
        <Button type="submit">Skapa ärende</Button>
      </div>
    </form>
  );
}

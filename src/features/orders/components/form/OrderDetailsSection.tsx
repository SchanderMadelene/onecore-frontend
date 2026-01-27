import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type OrderDetailsSectionProps = {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  assignedTo: string;
  setAssignedTo: (value: string) => void;
};

export function OrderDetailsSection({
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  assignedTo,
  setAssignedTo,
}: OrderDetailsSectionProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Titel</Label>
        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Kort beskrivning av ärendet" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Beskrivning</Label>
        <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Detaljerad beskrivning av ärendet" rows={4} />
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
        <Label htmlFor="assignedTo">Resursgrupp</Label>
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
    </>
  );
}

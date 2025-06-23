
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ParkingSpace } from "./types/parking";
import type { ParkingSpaceNote } from "./types/notes";

interface ParkingSpaceNotesDialogProps {
  parkingSpace: ParkingSpace;
}

// Mock data för demonstration
const mockNotes: ParkingSpaceNote[] = [
  {
    id: "1",
    parkingSpaceId: "123-123-123-0201",
    content: "Elhyttproblem rapporterat av hyresgäst. Tekniker kontaktad.",
    createdAt: "2024-01-15T10:30:00Z",
    createdBy: "Anna Andersson",
    category: "maintenance"
  },
  {
    id: "2", 
    parkingSpaceId: "123-123-123-0201",
    content: "Ny hyresgäst flyttar in nästa månad. Behöver kolla att allt är i ordning.",
    createdAt: "2024-01-10T14:15:00Z",
    createdBy: "Erik Nilsson",
    category: "rental"
  }
];

export const ParkingSpaceNotesDialog = ({ parkingSpace }: ParkingSpaceNotesDialogProps) => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<ParkingSpaceNote[]>(
    mockNotes.filter(note => note.parkingSpaceId === parkingSpace.id)
  );
  const [newNote, setNewNote] = useState("");
  const [category, setCategory] = useState<ParkingSpaceNote["category"]>("general");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const { toast } = useToast();

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setIsAddingNote(true);
    try {
      // Simulera API-anrop
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const note: ParkingSpaceNote = {
        id: Date.now().toString(),
        parkingSpaceId: parkingSpace.id,
        content: newNote.trim(),
        createdAt: new Date().toISOString(),
        createdBy: "Aktuell användare", // I verkliga applikationen skulle detta komma från användarens session
        category
      };

      setNotes(prev => [note, ...prev]);
      setNewNote("");
      setCategory("general");
      
      toast({
        title: "Notering tillagd",
        description: "Noteringen har sparats framgångsrikt",
      });
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte spara noteringen. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setIsAddingNote(false);
    }
  };

  const getCategoryLabel = (cat: ParkingSpaceNote["category"]) => {
    const labels = {
      general: "Allmänt",
      maintenance: "Underhåll",
      rental: "Uthyrning",
      issue: "Problem"
    };
    return labels[cat];
  };

  const getCategoryColor = (cat: ParkingSpaceNote["category"]) => {
    const colors = {
      general: "bg-gray-100 text-gray-800",
      maintenance: "bg-orange-100 text-orange-800",
      rental: "bg-blue-100 text-blue-800",
      issue: "bg-red-100 text-red-800"
    };
    return colors[cat];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>Noter ({notes.length})</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Noter för {parkingSpace.address}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lägg till ny notering */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Lägg till ny notering</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select value={category} onValueChange={(value) => setCategory(value as ParkingSpaceNote["category"])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Allmänt</SelectItem>
                    <SelectItem value="maintenance">Underhåll</SelectItem>
                    <SelectItem value="rental">Uthyrning</SelectItem>
                    <SelectItem value="issue">Problem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="note">Notering</Label>
                <Textarea
                  id="note"
                  placeholder="Skriv din notering här..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
              </div>
              <Button 
                onClick={handleAddNote}
                disabled={!newNote.trim() || isAddingNote}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {isAddingNote ? "Sparar..." : "Lägg till notering"}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Befintliga noteringar */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Befintliga noteringar ({notes.length})</h3>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {notes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Inga noteringar ännu</p>
                  </div>
                ) : (
                  notes.map((note) => (
                    <div key={note.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={getCategoryColor(note.category)}>
                          {getCategoryLabel(note.category)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.createdAt).toLocaleDateString('sv-SE')} {new Date(note.createdAt).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{note.content}</p>
                      <p className="text-xs text-muted-foreground">
                        Av: {note.createdBy}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

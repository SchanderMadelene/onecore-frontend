
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Simple in-memory storage for notes (would be replaced by a real API in production)
const notesStorage: Record<string, Array<{ id: string; content: string; date: string }>> = {};

interface TenantNotesTabProps {
  tenantId: string;
}

export function TenantNotesTab({ tenantId }: TenantNotesTabProps) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState(notesStorage[tenantId] || []);

  const handleAddNote = () => {
    if (noteContent.trim()) {
      const newNote = {
        id: `note-${Date.now()}`,
        content: noteContent,
        date: new Date().toLocaleDateString('sv-SE', { 
          year: 'numeric', 
          month: 'numeric', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      notesStorage[tenantId] = updatedNotes; // Update in-memory storage
      
      setNoteContent("");
      setIsAddingNote(false);
    }
  };

  return (
    <div className="space-y-4">
      {!isAddingNote ? (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => setIsAddingNote(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Lägg till notering
        </Button>
      ) : (
        <div className="border rounded-md p-3 space-y-3">
          <Textarea 
            placeholder="Skriv din notering här..." 
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setIsAddingNote(false);
                setNoteContent("");
              }}
            >
              Avbryt
            </Button>
            <Button 
              size="sm"
              onClick={handleAddNote}
            >
              <Save className="h-4 w-4 mr-2" />
              Spara
            </Button>
          </div>
        </div>
      )}
      
      {notes.length > 0 ? (
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="border rounded-md p-3">
                <p className="text-xs text-muted-foreground mb-1">{note.date}</p>
                <p className="text-sm">{note.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center py-4 text-sm text-muted-foreground">
          Inga noteringar än
        </div>
      )}
    </div>
  );
}

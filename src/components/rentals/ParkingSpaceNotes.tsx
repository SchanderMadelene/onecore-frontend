
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Simple in-memory storage for notes (would be replaced by a real API in production)
const notesStorage: Record<string, Array<{ id: string; content: string; date: string; author: string }>> = {};

interface ParkingSpaceNotesProps {
  parkingSpaceId: string;
}

export function ParkingSpaceNotes({ parkingSpaceId }: ParkingSpaceNotesProps) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState(notesStorage[parkingSpaceId] || []);

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
        }),
        author: "Aktuell användare" // Would be replaced with actual user data
      };
      
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      notesStorage[parkingSpaceId] = updatedNotes; // Update in-memory storage
      
      setNoteContent("");
      setIsAddingNote(false);
    }
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-4">Noteringar</h3>
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
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">Tidigare noteringar</h4>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {notes.map((note) => (
                  <div key={note.id} className="border rounded-md p-3 bg-card">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-muted-foreground">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="text-center py-4 text-sm text-muted-foreground">
            Inga noteringar än
          </div>
        )}
      </div>
    </section>
  );
}


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, Save, Trash2, Pin, PinOff } from "lucide-react";

// Mock data for notes
const initialNotes = [
  {
    id: "note-1",
    content: "Hyresgästen har framfört önskemål om renovering av badrum.",
    createdAt: "2023-11-15T14:30:00",
    createdBy: "Maria Svensson",
    isPinned: false
  },
  {
    id: "note-2",
    content: "Uppföljning av vattenläcka. Allt åtgärdat enligt hyresgästen.",
    createdAt: "2023-12-02T09:15:00",
    createdBy: "Johan Karlsson",
    isPinned: false
  }
];

export function TenantNotes() {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      const currentDate = new Date();
      const newNoteObj = {
        id: `note-${Date.now()}`,
        content: newNote,
        createdAt: currentDate.toISOString(),
        createdBy: "Användare",
        isPinned: false
      };
      
      setNotes([newNoteObj, ...notes]);
      setNewNote("");
      setIsAddingNote(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleTogglePin = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('sv-SE', options);
  };

  // Sort notes: pinned notes first, then by creation date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Noteringar
          </CardTitle>
          {!isAddingNote && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setIsAddingNote(true)}
            >
              <Plus className="h-4 w-4" />
              Ny notering
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isAddingNote && (
            <div className="mb-6 border p-4 rounded-md bg-muted/20">
              <Textarea 
                placeholder="Skriv din notering här..." 
                className="mb-4 min-h-[100px]"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setIsAddingNote(false);
                    setNewNote("");
                  }}
                >
                  Avbryt
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleAddNote}
                  className="flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  Spara
                </Button>
              </div>
            </div>
          )}
          
          {sortedNotes.length > 0 ? (
            <div className="space-y-4">
              {sortedNotes.map((note) => (
                <div 
                  key={note.id} 
                  className={`border rounded-md p-4 ${note.isPinned ? 'bg-amber-50 border-amber-200' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {note.isPinned && (
                        <Pin className="h-4 w-4 text-amber-600" />
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDate(note.createdAt)} av {note.createdBy}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-muted-foreground hover:text-amber-600"
                        onClick={() => handleTogglePin(note.id)}
                        title={note.isPinned ? "Ta bort pin" : "Pinna notering"}
                      >
                        {note.isPinned ? (
                          <PinOff className="h-4 w-4" />
                        ) : (
                          <Pin className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteNote(note.id)}
                        title="Ta bort notering"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-6">
              Inga noteringar har lagts till för denna hyresgäst ännu.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

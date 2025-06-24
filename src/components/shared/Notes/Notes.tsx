
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, Save, Trash2, Pin, PinOff } from "lucide-react";
import type { Note, NotesProps, NotesState } from "./types";

// Mock initial data - this would typically come from API based on entityType and entityId
const getInitialNotes = (entityType: string, entityId: string): Note[] => {
  if (entityType === "tenant") {
    return [
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
      },
      {
        id: "note-3",
        content: "Hyresgästen ringer ofta på kvällstid. Försök att ta kontakt på dagtid om möjligt.",
        createdAt: "2023-10-22T16:45:00",
        createdBy: "Lisa Andersson",
        isPinned: true
      }
    ];
  } else if (entityType === "parkingSpace") {
    return [
      {
        id: "parking-note-1",
        content: "Bilplatsen har problem med dränering efter regn. Bör ses över.",
        createdAt: "2023-11-20T10:30:00",
        createdBy: "Erik Johansson",
        isPinned: true,
        category: "Underhåll"
      },
      {
        id: "parking-note-2",
        content: "Hyresgäst rapporterade att grannbilplats blockerar ibland. Pratat med granne.",
        createdAt: "2023-12-01T14:15:00",
        createdBy: "Anna Petersson",
        isPinned: false,
        category: "Klagomål"
      }
    ];
  }
  return [];
};

export function Notes({ 
  entityType, 
  entityId, 
  title = "Noteringar",
  placeholder = "Skriv din notering här...",
  emptyMessage = "Inga noteringar har lagts till ännu.",
  categories = [],
  showCategory = false
}: NotesProps) {
  const [state, setState] = useState<NotesState>({
    notes: getInitialNotes(entityType, entityId),
    newNote: "",
    selectedCategory: categories[0] || undefined,
    isAddingNote: false
  });

  const handleAddNote = () => {
    if (state.newNote.trim()) {
      const currentDate = new Date();
      const newNoteObj: Note = {
        id: `${entityType}-note-${Date.now()}`,
        content: state.newNote,
        createdAt: currentDate.toISOString(),
        createdBy: "Användare",
        isPinned: false,
        category: showCategory ? state.selectedCategory : undefined
      };
      
      setState(prev => ({
        ...prev,
        notes: [newNoteObj, ...prev.notes],
        newNote: "",
        isAddingNote: false
      }));
    }
  };

  const handleDeleteNote = (id: string) => {
    setState(prev => ({
      ...prev,
      notes: prev.notes.filter(note => note.id !== id)
    }));
  };

  const handleTogglePin = (id: string) => {
    setState(prev => ({
      ...prev,
      notes: prev.notes.map(note => 
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    }));
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
  const sortedNotes = [...state.notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          {title}
        </CardTitle>
        {!state.isAddingNote && (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setState(prev => ({ ...prev, isAddingNote: true }))}
          >
            <Plus className="h-4 w-4" />
            Ny notering
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {state.isAddingNote && (
          <div className="mb-6 border p-4 rounded-md bg-muted/20">
            {showCategory && categories.length > 0 && (
              <div className="mb-4">
                <Select 
                  value={state.selectedCategory} 
                  onValueChange={(value) => setState(prev => ({ ...prev, selectedCategory: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Välj kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <Textarea 
              placeholder={placeholder}
              className="mb-4 min-h-[100px]"
              value={state.newNote}
              onChange={(e) => setState(prev => ({ ...prev, newNote: e.target.value }))}
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setState(prev => ({ 
                  ...prev, 
                  isAddingNote: false, 
                  newNote: "",
                  selectedCategory: categories[0] || undefined
                }))}
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
                    <div className="flex flex-col">
                      <p className="text-xs text-muted-foreground">
                        {formatDate(note.createdAt)} av {note.createdBy}
                      </p>
                      {note.category && (
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md mt-1 w-fit">
                          {note.category}
                        </span>
                      )}
                    </div>
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
            {emptyMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}


import { Card, CardContent } from "@/components/ui/card";
import { NotesHeader } from "./components/NotesHeader";
import { AddNoteForm } from "./components/AddNoteForm";
import { NotesList } from "./components/NotesList";
import { useNotesState } from "./hooks/useNotesState";
import type { NotesProps } from "./types";

export function Notes({ 
  entityType, 
  entityId, 
  title = "Noteringar",
  placeholder = "Skriv din notering här...",
  emptyMessage = "Inga noteringar har lagts till ännu.",
  categories = [],
  showCategory = false
}: NotesProps) {
  const {
    state,
    sortedNotes,
    handleAddNote,
    handleDeleteNote,
    handleTogglePin,
    startAddingNote,
    cancelAddingNote,
    updateNewNote,
    updateSelectedCategory
  } = useNotesState(entityType, entityId, categories);

  return (
    <Card>
      <NotesHeader 
        title={title}
        isAddingNote={state.isAddingNote}
        onStartAddingNote={startAddingNote}
      />
      <CardContent>
        {state.isAddingNote && (
          <AddNoteForm
            newNote={state.newNote}
            selectedCategory={state.selectedCategory}
            categories={categories}
            showCategory={showCategory}
            placeholder={placeholder}
            onUpdateNote={updateNewNote}
            onUpdateCategory={updateSelectedCategory}
            onAddNote={handleAddNote}
            onCancel={cancelAddingNote}
          />
        )}
        
        <NotesList
          notes={sortedNotes}
          emptyMessage={emptyMessage}
          onTogglePin={handleTogglePin}
          onDeleteNote={handleDeleteNote}
        />
      </CardContent>
    </Card>
  );
}

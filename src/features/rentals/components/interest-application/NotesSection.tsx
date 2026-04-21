
import { Label } from "@/components/ui/label";

interface NotesSectionProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

export const NotesSection = ({ notes, onNotesChange }: NotesSectionProps) => {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="notes">Interna anteckningar (valfritt)</Label>
        <p className="text-xs text-muted-foreground">
          Syns endast internt för uthyrningspersonal, inte för den sökande.
        </p>
      </div>
      <textarea
        id="notes"
        placeholder="Lägg till eventuella anteckningar..."
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="w-full p-3 border rounded-md min-h-[80px] resize-none"
      />
    </div>
  );
};


import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

interface NotesHeaderProps {
  title: string;
  isAddingNote: boolean;
  onStartAddingNote: () => void;
}

export function NotesHeader({ title, isAddingNote, onStartAddingNote }: NotesHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <FileText className="h-5 w-5 text-muted-foreground" />
        {title}
      </CardTitle>
      {!isAddingNote && (
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onStartAddingNote}
        >
          <Plus className="h-4 w-4" />
          Ny notering
        </Button>
      )}
    </CardHeader>
  );
}

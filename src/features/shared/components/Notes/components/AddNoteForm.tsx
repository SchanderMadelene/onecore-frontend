
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";

interface AddNoteFormProps {
  newNote: string;
  selectedCategory?: string;
  categories: string[];
  showCategory: boolean;
  placeholder: string;
  onUpdateNote: (content: string) => void;
  onUpdateCategory: (category: string) => void;
  onAddNote: () => void;
  onCancel: () => void;
}

export function AddNoteForm({
  newNote,
  selectedCategory,
  categories,
  showCategory,
  placeholder,
  onUpdateNote,
  onUpdateCategory,
  onAddNote,
  onCancel
}: AddNoteFormProps) {
  return (
    <div className="mb-6 border p-4 rounded-md bg-muted/20">
      {showCategory && categories.length > 0 && (
        <div className="mb-4">
          <Select 
            value={selectedCategory} 
            onValueChange={onUpdateCategory}
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
        value={newNote}
        onChange={(e) => onUpdateNote(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onCancel}
        >
          Avbryt
        </Button>
        <Button 
          size="sm" 
          onClick={onAddNote}
          className="flex items-center gap-1"
        >
          <Save className="h-4 w-4" />
          Spara
        </Button>
      </div>
    </div>
  );
}

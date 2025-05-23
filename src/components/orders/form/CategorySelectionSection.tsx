
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategorySelectionSectionProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export function CategorySelectionSection({
  selectedCategory,
  setSelectedCategory,
}: CategorySelectionSectionProps) {
  const categories = [
    "Inomhus",
    "Utomhus", 
    "VVS",
    "El",
    "Ventilation",
    "Vitvaror",
    "Övrigt"
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="category" className="font-medium">Kategori</Label>
      <Select
        value={selectedCategory}
        onValueChange={setSelectedCategory}
      >
        <SelectTrigger id="category" className="w-full">
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
  );
}

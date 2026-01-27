import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

export function CategorySelectionSection() {
  const form = useFormContext();
  
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
    <FormField
      control={form.control}
      name="selectedCategory"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kategori</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Välj kategori" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}


import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const roomComponents = [
  "Golv", "Vägg", "Tak", "Dörr", "Fönster", "Kök", "Badrum", 
  "Värme", "El", "Ventilation", "Tvättmaskin", "Torktumlare", 
  "Diskmaskin", "Kyl/frys", "Spis", "Övrigt"
];

export function ComponentSelectionSection() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="selectedComponent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Komponent</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Välj komponent" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {roomComponents.map(component => (
                <SelectItem key={component} value={component}>
                  {component}
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

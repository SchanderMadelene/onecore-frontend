import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePicker } from "@/shared/common";
import { useFormContext } from "react-hook-form";

export function DateSelectionSection() {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="plannedExecutionDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Planerat utförande</FormLabel>
            <FormControl>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="dueDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Förfallodatum</FormLabel>
            <FormControl>
              <DatePicker
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

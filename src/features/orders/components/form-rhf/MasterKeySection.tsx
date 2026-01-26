
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export function MasterKeySection() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="needsMasterKey"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Huvudnyckel?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ja" id="masterKeyYes" />
                <Label htmlFor="masterKeyYes" className="cursor-pointer">Ja</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nej" id="masterKeyNo" />
                <Label htmlFor="masterKeyNo" className="cursor-pointer">Nej</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

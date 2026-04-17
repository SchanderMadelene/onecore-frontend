
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { Control, useWatch } from "react-hook-form";
import { DatePicker } from "@/shared/common";
import type { EditHousingFormData } from "./types";

interface EditableFormSectionProps {
  control: Control<EditHousingFormData>;
}

export function EditableFormSection({ control }: EditableFormSectionProps) {
  const untilFurtherNotice = useWatch({ control, name: "publishUntilFurtherNotice" });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="publishFrom"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-medium">Publicera från</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} placeholder="Välj startdatum" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="publishTo"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-medium">Publicera till</FormLabel>
              <FormControl>
                <DatePicker
                  value={untilFurtherNotice ? undefined : field.value}
                  onChange={field.onChange}
                  placeholder={untilFurtherNotice ? "Tillsvidare" : "Välj slutdatum"}
                  disabled={untilFurtherNotice}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 -mt-2">
        <div />
        <FormField
          control={control}
          name="publishUntilFurtherNotice"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="text-sm font-normal cursor-pointer">
                Publicera tillsvidare (inget slutdatum)
              </FormLabel>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="housingObjectType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Hyresobjektstyp</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Standard, Poängfri, Korttidskontrakt, Lätt att ..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="poangfri">Poängfri</SelectItem>
                <SelectItem value="korttid">Korttidskontrakt</SelectItem>
                <SelectItem value="latt">Lätt att...</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="moveIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Inflyttning</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Omgående" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="omgående">Omgående</SelectItem>
                  <SelectItem value="datum">Specifikt datum</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="moveInDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Inflyttning</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} placeholder="dd-mm-yy" className="h-12 pr-10" />
                  <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="availableFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Tillgänglig från</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} placeholder="dd-mm-yy" className="h-12 pr-10" />
                  <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="eventuallyAvailableFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Eventuellt tillgänglig från</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} placeholder="dd-mm-yy" className="h-12 pr-10" />
                  <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="queue"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Spärra</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Ingen spärr" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="ingen">Ingen spärr</SelectItem>
                <SelectItem value="temporar">Temporär spärr</SelectItem>
                <SelectItem value="permanent">Permanent spärr</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="standardNote"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Standardnotering</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Ej visningsbar pga renovering fram till dd-mm-yy"
                className="min-h-[80px] resize-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

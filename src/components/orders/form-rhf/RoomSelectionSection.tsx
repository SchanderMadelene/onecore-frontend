
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Room } from "@/types/api";

type RoomSelectionSectionProps = {
  availableRooms: Room[];
};

export function RoomSelectionSection({ availableRooms }: RoomSelectionSectionProps) {
  const form = useFormContext();
  
  if (availableRooms.length === 0) return null;

  return (
    <FormField
      control={form.control}
      name="selectedRoom"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Rum</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Välj rum" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableRooms.map(room => (
                <SelectItem key={room.id} value={room.id}>
                  {room.name}
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

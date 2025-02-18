
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import type { Room } from "@/types/api";
import { RoomInspectionForm } from "./RoomInspectionForm";

interface InspectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rooms?: Room[];
  onSubmit: (data: any) => void;
}

export const InspectionDialog = ({
  open,
  onOpenChange,
  rooms,
  onSubmit,
}: InspectionDialogProps) => {
  const form = useForm({
    defaultValues: {
      inspector: "",
      notes: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Nytt besiktningsprotokoll</DialogTitle>
          <DialogDescription>
            Skapa ett nytt besiktningsprotokoll för lägenheten. Fyll i grundläggande information nedan.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="inspector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Besiktningsman</FormLabel>
                    <FormControl>
                      <Input placeholder="Ange namn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Generella anteckningar</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Generella anteckningar om besiktningen"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <RoomInspectionForm rooms={rooms} />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Avbryt
              </Button>
              <Button type="submit">
                Spara protokoll
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

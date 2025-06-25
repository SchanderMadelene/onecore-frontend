
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Edit } from "lucide-react";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";
import { toast } from "sonner";

interface EditHousingDialogProps {
  housingSpace: UnpublishedHousingSpace;
}

interface EditHousingFormData {
  // Form fields will be added in next prompt
}

export function EditHousingDialog({ housingSpace }: EditHousingDialogProps) {
  const [open, setOpen] = useState(false);
  
  const form = useForm<EditHousingFormData>({
    defaultValues: {
      // Default values will be added when form fields are implemented
    },
  });

  const onSubmit = (data: EditHousingFormData) => {
    console.log('Saving housing space:', data);
    toast.success("Bostadsannonsen har sparats");
    setOpen(false);
  };

  const handlePublish = () => {
    console.log('Publishing housing space:', housingSpace.id);
    toast.success("Bostadsannonsen har publicerats");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Edit className="h-4 w-4" />
          Redigera
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Redigera bostadsannons</DialogTitle>
          <DialogDescription>
            Redigera detaljer för {housingSpace.address}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Form content will be added in next prompt */}
            <div className="p-8 border rounded-md text-center text-muted-foreground">
              Formulärfält kommer att läggas till i nästa steg
            </div>
          </form>
        </Form>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>
              Spara ändringar
            </Button>
          </div>
          <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
            Publicera
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

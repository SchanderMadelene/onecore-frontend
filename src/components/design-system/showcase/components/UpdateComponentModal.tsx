import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const updateComponentSchema = z.object({
  ekonomiskLivslangd: z.string().optional(),
  tekniskLivslangd: z.string().optional(),
  startar: z.string().optional(),
  mangd: z.string().optional(),
  marke: z.string().optional(),
  modell: z.string().optional(),
  comment: z.string().optional(),
});

type UpdateComponentFormData = z.infer<typeof updateComponentSchema>;

interface UpdateComponentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdateComponentModal = ({
  open,
  onOpenChange,
}: UpdateComponentModalProps) => {
  const { toast } = useToast();

  const form = useForm<UpdateComponentFormData>({
    resolver: zodResolver(updateComponentSchema),
    defaultValues: {
      ekonomiskLivslangd: "12 år",
      tekniskLivslangd: "15 år",
      startar: "2019",
      mangd: "1 st",
      marke: "Electrolux",
      modell: "ESF5555LOX",
      comment: "",
    },
  });

  const onSubmit = (data: UpdateComponentFormData) => {
    console.log("Component update data:", data);
    toast({
      title: "Komponent uppdaterad",
      description: "Diskmaskinen har uppdaterats.",
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Uppdatera komponent efter ärende
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Ärende: <span className="font-semibold">ORD-2025-0445</span>
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Uppdatera komponent */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Uppdatera komponent</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ekonomisk livslängd */}
                <div className="space-y-2">
                  <Label htmlFor="ekonomiskLivslangd">Ekonomisk livslängd</Label>
                  <p className="text-sm text-muted-foreground italic">Tidigare: 12 år</p>
                  <Input
                    id="ekonomiskLivslangd"
                    {...form.register("ekonomiskLivslangd")}
                  />
                </div>

                {/* Teknisk livslängd */}
                <div className="space-y-2">
                  <Label htmlFor="tekniskLivslangd">Teknisk livslängd</Label>
                  <p className="text-sm text-muted-foreground italic">Tidigare: 15 år</p>
                  <Input
                    id="tekniskLivslangd"
                    {...form.register("tekniskLivslangd")}
                  />
                </div>

                {/* Startår */}
                <div className="space-y-2">
                  <Label htmlFor="startar">Startår</Label>
                  <p className="text-sm text-muted-foreground italic">Tidigare: 2019</p>
                  <Input
                    id="startar"
                    {...form.register("startar")}
                  />
                </div>

                {/* Mängd */}
                <div className="space-y-2">
                  <Label htmlFor="mangd">Mängd</Label>
                  <p className="text-sm text-muted-foreground italic">Tidigare: 1 st</p>
                  <Input
                    id="mangd"
                    {...form.register("mangd")}
                  />
                </div>

                {/* Märke */}
                <div className="space-y-2">
                  <Label htmlFor="marke">Märke</Label>
                  <p className="text-sm text-muted-foreground italic">Tidigare: Electrolux</p>
                  <Input
                    id="marke"
                    {...form.register("marke")}
                  />
                </div>

                {/* Modell */}
                <div className="space-y-2">
                  <Label htmlFor="modell">Modell</Label>
                  <p className="text-sm text-muted-foreground italic">Tidigare: ESF5555LOX</p>
                  <Input
                    id="modell"
                    {...form.register("modell")}
                  />
                </div>
              </div>

              {/* Kommentar */}
              <div className="space-y-2">
                <Label htmlFor="comment">Kommentar</Label>
                <Textarea
                  id="comment"
                  placeholder="Lägg till ytterligare information om uppdateringen..."
                  rows={4}
                  {...form.register("comment")}
                />
              </div>

              {/* Bilder */}
              <div className="space-y-2">
                <Label>Bilder</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Klicka för att ladda upp bilder av den nya komponenten
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Max 5 bilder, 10MB per bild
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Avbryt
          </Button>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Spara ändringar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

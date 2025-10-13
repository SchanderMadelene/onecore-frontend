import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const updateComponentSchema = z.object({
  status: z.enum(["active", "maintenance", "out_of_service"], {
    required_error: "Status måste väljas",
  }),
  action: z.enum(["repaired", "replaced", "adjusted", "other"], {
    required_error: "Åtgärd måste väljas",
  }),
  installationDate: z.date({
    required_error: "Installationsdatum måste väljas",
  }),
  make: z.string().optional(),
  model: z.string().optional(),
  energyClass: z.string().optional(),
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
  const [selectedDate, setSelectedDate] = useState<Date>();

  const form = useForm<UpdateComponentFormData>({
    resolver: zodResolver(updateComponentSchema),
    defaultValues: {
      status: undefined,
      action: undefined,
      installationDate: new Date(),
      make: "",
      model: "",
      energyClass: "",
      comment: "",
    },
  });

  const onSubmit = (data: UpdateComponentFormData) => {
    console.log("Component update data:", data);
    toast({
      title: "Komponent uppdaterad",
      description: "Diskmaskinen har uppdaterats och kopplats till ärendet.",
    });
    onOpenChange(false);
    form.reset();
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Aktiv", className: "bg-green-100 text-green-800" },
      maintenance: {
        label: "Under underhåll",
        className: "bg-yellow-100 text-yellow-800",
      },
      out_of_service: {
        label: "Ur funktion",
        className: "bg-red-100 text-red-800",
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
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
          {/* Sektion A: Komponentinformation (före) */}
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">
                Komponentinformation (före uppdatering)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Rum</Label>
                  <p className="font-medium">Kök</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Typ</Label>
                  <p className="font-medium">Vitvaror - Diskmaskin</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    {getStatusBadge("maintenance")}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">
                    Installationsdatum
                  </Label>
                  <p className="font-medium">2017-05-20</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Märke</Label>
                  <p className="font-medium">Bosch</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Modell</Label>
                  <p className="font-medium">SMV46KX00E</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Energiklass</Label>
                  <p className="font-medium">A++</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Sektion C: Uppdatera komponent */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Uppdatera komponent</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">
                    Status <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("status", value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Välj status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktiv</SelectItem>
                      <SelectItem value="maintenance">
                        Under underhåll
                      </SelectItem>
                      <SelectItem value="out_of_service">
                        Ur funktion
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.status && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.status.message}
                    </p>
                  )}
                </div>

                {/* Åtgärd */}
                <div className="space-y-2">
                  <Label htmlFor="action">
                    Åtgärd <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("action", value as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Välj åtgärd" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="repaired">Reparerad</SelectItem>
                      <SelectItem value="replaced">Utbytt</SelectItem>
                      <SelectItem value="adjusted">
                        Justerad/Service
                      </SelectItem>
                      <SelectItem value="other">Övrigt</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.action && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.action.message}
                    </p>
                  )}
                </div>

                {/* Installationsdatum */}
                <div className="space-y-2">
                  <Label>
                    Installationsdatum <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span>Välj datum</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          if (date) {
                            form.setValue("installationDate", date);
                          }
                        }}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.installationDate && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.installationDate.message}
                    </p>
                  )}
                </div>

                {/* Energiklass */}
                <div className="space-y-2">
                  <Label htmlFor="energyClass">Energiklass</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("energyClass", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Välj energiklass" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+++">A+++</SelectItem>
                      <SelectItem value="A++">A++</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Märke */}
                <div className="space-y-2">
                  <Label htmlFor="make">Märke</Label>
                  <Input
                    id="make"
                    placeholder="t.ex. Siemens"
                    {...form.register("make")}
                  />
                </div>

                {/* Modell */}
                <div className="space-y-2">
                  <Label htmlFor="model">Modell</Label>
                  <Input
                    id="model"
                    placeholder="t.ex. SN63HX60CE"
                    {...form.register("model")}
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

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { ComponentLocation } from "@/types/api";

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
  location: ComponentLocation;
  component?: {
    id: string;
    name: string;
    type: string;
  };
  orderId?: string;
}

const generateBreadcrumb = (location: ComponentLocation): string => {
  const parts = [location.propertyName];
  
  if (location.buildingName) parts.push(location.buildingName);
  if (location.entranceName) parts.push(location.entranceName);
  if (location.residenceName) parts.push(location.residenceName);
  
  if (location.level === "room" && location.currentRoom) {
    parts.push(location.currentRoom.name);
  } else if (location.level === "entrance" && location.currentEntrance) {
    parts.push(location.currentEntrance.name);
  } else if (location.level === "building-space" && location.currentSpace) {
    parts.push(`${location.currentSpace.type} - ${location.currentSpace.name}`);
  } else if (location.level === "building" && location.currentBuilding) {
    parts.push(location.currentBuilding.name);
  }
  
  return parts.join(" > ");
};

export const UpdateComponentModal = ({
  open,
  onOpenChange,
  location,
  component,
  orderId,
}: UpdateComponentModalProps) => {
  const { toast } = useToast();
  
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>(
    location.currentRoom?.id || 
    location.currentEntrance?.id || 
    location.currentSpace?.id || 
    location.currentBuilding?.id
  );

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
    console.log("Selected location ID:", selectedLocationId);
    toast({
      title: "Komponent uppdaterad",
      description: `${component?.name || "Komponenten"} har uppdaterats på vald plats.`,
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
          {orderId && (
            <p className="text-sm text-muted-foreground">
              Ärende: <span className="font-semibold">{orderId}</span>
            </p>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Breadcrumb - Read-only location context */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <Label className="text-xs text-muted-foreground mb-1 block">Plats</Label>
            <div className="overflow-x-auto">
              <p className="text-sm font-medium whitespace-nowrap">
                {generateBreadcrumb(location)}
              </p>
            </div>
          </div>

          {/* Dynamic location selection */}
          {location.level === "room" && location.availableRooms && (
            <div className="space-y-2">
              <Label htmlFor="target-room">Välj rum</Label>
              <Select 
                value={selectedLocationId} 
                onValueChange={setSelectedLocationId}
              >
                <SelectTrigger id="target-room">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {location.availableRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                      {room.id === location.currentRoom?.id && " (nuvarande)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                En ny komponent kommer att skapas i det valda rummet
              </p>
            </div>
          )}

          {location.level === "entrance" && location.availableEntrances && (
            <div className="space-y-2">
              <Label htmlFor="target-entrance">Välj uppgång</Label>
              <Select 
                value={selectedLocationId} 
                onValueChange={setSelectedLocationId}
              >
                <SelectTrigger id="target-entrance">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {location.availableEntrances.map((entrance) => (
                    <SelectItem key={entrance.id} value={entrance.id}>
                      {entrance.name}
                      {entrance.id === location.currentEntrance?.id && " (nuvarande)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                En ny komponent kommer att skapas på den valda uppgången
              </p>
            </div>
          )}

          {location.level === "building-space" && location.availableSpaces && (
            <div className="space-y-2">
              <Label htmlFor="target-space">Välj utrymme</Label>
              <Select 
                value={selectedLocationId} 
                onValueChange={setSelectedLocationId}
              >
                <SelectTrigger id="target-space">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {location.availableSpaces.map((space) => (
                    <SelectItem key={space.id} value={space.id}>
                      {space.type} - {space.name}
                      {space.id === location.currentSpace?.id && " (nuvarande)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                En ny komponent kommer att skapas i det valda utrymmet
              </p>
            </div>
          )}

          {location.level === "building" && location.availableBuildings && (
            <div className="space-y-2">
              <Label htmlFor="target-building">Välj byggnad</Label>
              <Select 
                value={selectedLocationId} 
                onValueChange={setSelectedLocationId}
              >
                <SelectTrigger id="target-building">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {location.availableBuildings.map((building) => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.name}
                      {building.id === location.currentBuilding?.id && " (nuvarande)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                En ny komponent kommer att skapas på den valda byggnaden
              </p>
            </div>
          )}

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

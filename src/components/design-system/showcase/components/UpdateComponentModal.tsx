import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Sparkles, X } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import type { ComponentLocation } from "@/types/api";
import type { AIAnalysisResult } from "@/components/shared/PhotoAnalyzeModal";

const updateComponentSchema = z.object({
  ekonomiskLivslangd: z.string().optional(),
  tekniskLivslangd: z.string().optional(),
  startar: z.string().optional(),
  mangd: z.string().optional(),
  marke: z.string().optional(),
  modell: z.string().optional(),
  serienummer: z.string().optional(),
  tekniskaSpec: z.string().optional(),
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
  aiSuggestedValues?: AIAnalysisResult;
  attachedImage?: string;
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

const getConfidenceColor = (confidence?: "high" | "medium" | "low") => {
  switch (confidence) {
    case "high":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "low":
      return "text-orange-500";
    default:
      return "text-muted-foreground";
  }
};

interface AIIndicatorProps {
  confidence?: "high" | "medium" | "low";
}

const AIIndicator = ({ confidence }: AIIndicatorProps) => {
  if (!confidence) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Sparkles className={`h-3.5 w-3.5 ${getConfidenceColor(confidence)} cursor-help`} />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Föreslaget av AI - granska värdet</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const UpdateComponentModal = ({
  open,
  onOpenChange,
  location,
  component,
  orderId,
  aiSuggestedValues,
  attachedImage,
}: UpdateComponentModalProps) => {
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState<string | undefined>(attachedImage);
  
  const [selectedLocationId, setSelectedLocationId] = useState<string | undefined>(
    location.currentRoom?.id || 
    location.currentEntrance?.id || 
    location.currentSpace?.id || 
    location.currentBuilding?.id
  );

  // Track which fields have AI values
  const [aiFields, setAiFields] = useState<Record<string, "high" | "medium" | "low">>({});

  const form = useForm<UpdateComponentFormData>({
    resolver: zodResolver(updateComponentSchema),
    defaultValues: {
      ekonomiskLivslangd: "12 år",
      tekniskLivslangd: "15 år",
      startar: "2019",
      mangd: "1 st",
      marke: "Electrolux",
      modell: "ESF5555LOX",
      serienummer: "",
      tekniskaSpec: "",
      comment: "",
    },
  });

  // Apply AI suggested values when they change
  useEffect(() => {
    if (aiSuggestedValues) {
      const newAiFields: Record<string, "high" | "medium" | "low"> = {};
      
      if (aiSuggestedValues.fabrikat) {
        form.setValue("marke", aiSuggestedValues.fabrikat.value);
        newAiFields.marke = aiSuggestedValues.fabrikat.confidence;
      }
      if (aiSuggestedValues.modell) {
        form.setValue("modell", aiSuggestedValues.modell.value);
        newAiFields.modell = aiSuggestedValues.modell.confidence;
      }
      if (aiSuggestedValues.serienummer) {
        form.setValue("serienummer", aiSuggestedValues.serienummer.value);
        newAiFields.serienummer = aiSuggestedValues.serienummer.confidence;
      }
      if (aiSuggestedValues.tillverkningsar) {
        form.setValue("startar", aiSuggestedValues.tillverkningsar.value);
        newAiFields.startar = aiSuggestedValues.tillverkningsar.confidence;
      }
      if (aiSuggestedValues.tekniska_specifikationer) {
        form.setValue("tekniskaSpec", aiSuggestedValues.tekniska_specifikationer.value);
        newAiFields.tekniskaSpec = aiSuggestedValues.tekniska_specifikationer.confidence;
      }
      
      setAiFields(newAiFields);
    }
  }, [aiSuggestedValues, form]);

  // Update current image when attachedImage prop changes
  useEffect(() => {
    setCurrentImage(attachedImage);
  }, [attachedImage]);

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
                  <div className="flex items-center gap-2">
                    <Label htmlFor="marke">Märke</Label>
                    <AIIndicator confidence={aiFields.marke} />
                  </div>
                  <p className="text-sm text-muted-foreground italic">Tidigare: Electrolux</p>
                  <Input
                    id="marke"
                    {...form.register("marke")}
                  />
                </div>

                {/* Modell */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="modell">Modell</Label>
                    <AIIndicator confidence={aiFields.modell} />
                  </div>
                  <p className="text-sm text-muted-foreground italic">Tidigare: ESF5555LOX</p>
                  <Input
                    id="modell"
                    {...form.register("modell")}
                  />
                </div>

                {/* Serienummer */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="serienummer">Serienummer</Label>
                    <AIIndicator confidence={aiFields.serienummer} />
                  </div>
                  <p className="text-sm text-muted-foreground italic">Tidigare: -</p>
                  <Input
                    id="serienummer"
                    {...form.register("serienummer")}
                  />
                </div>

                {/* Tekniska specifikationer */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="tekniskaSpec">Tekniska spec.</Label>
                    <AIIndicator confidence={aiFields.tekniskaSpec} />
                  </div>
                  <p className="text-sm text-muted-foreground italic">Tidigare: -</p>
                  <Input
                    id="tekniskaSpec"
                    {...form.register("tekniskaSpec")}
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
                {currentImage ? (
                  <div className="relative">
                    <div className="rounded-lg overflow-hidden bg-muted">
                      <img
                        src={currentImage}
                        alt="Bifogad bild"
                        className="w-full h-48 object-contain"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => setCurrentImage(undefined)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Bild bifogad från "Fota & analysera"
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Klicka för att ladda upp bilder av den nya komponenten
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Max 5 bilder, 10MB per bild
                    </p>
                  </div>
                )}
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

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Favorite, FavoriteVisibility } from "@/types/favorites";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EditFavoriteDialogProps {
  favorite: Favorite | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, updates: Partial<Omit<Favorite, 'id' | 'createdAt'>>) => void;
}

export function EditFavoriteDialog({
  favorite,
  open,
  onOpenChange,
  onSave,
}: EditFavoriteDialogProps) {
  const [name, setName] = useState(favorite?.name || "");
  const [description, setDescription] = useState(favorite?.description || "");
  const [visibility, setVisibility] = useState<FavoriteVisibility>(favorite?.visibility || "personal");
  const [parameters, setParameters] = useState(favorite?.parameters || {});

  // Update state when favorite changes
  useEffect(() => {
    if (favorite) {
      setName(favorite.name);
      setDescription(favorite.description || "");
      setVisibility(favorite.visibility);
      setParameters(favorite.parameters);
    }
  }, [favorite]);

  const handleSave = () => {
    if (!favorite) return;

    if (!name.trim()) {
      toast({
        title: "Namn krävs",
        description: "Favoritens namn kan inte vara tomt.",
        variant: "destructive",
      });
      return;
    }

    onSave(favorite.id, {
      name: name.trim(),
      description: description.trim() || undefined,
      visibility,
      parameters,
    });

    toast({
      title: "Favorit uppdaterad",
      description: "Ändringarna har sparats.",
    });

    onOpenChange(false);
  };

  const handleRemoveParameter = (key: string) => {
    const newParams = { ...parameters };
    delete newParams[key];
    setParameters(newParams);
  };

  const handleParameterValueChange = (key: string, value: string) => {
    setParameters({
      ...parameters,
      [key]: value,
    });
  };

  const formatParameterValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "boolean") {
      return value ? "Ja" : "Nej";
    }
    return String(value);
  };

  const parameterEntries = Object.entries(parameters);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Redigera favorit</DialogTitle>
          <DialogDescription>
            Ändra namn, beskrivning, synlighet och parametrar för denna favorit.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Namn</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Min favorit"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beskrivning (valfritt)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beskrivning av favoriten..."
              rows={2}
              maxLength={250}
            />
          </div>

          <div className="space-y-2">
            <Label>Synlighet</Label>
            <RadioGroup value={visibility} onValueChange={(v) => setVisibility(v as FavoriteVisibility)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal" className="font-normal cursor-pointer">
                  Personlig - Endast du kan se denna favorit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="team" id="team" />
                <Label htmlFor="team" className="font-normal cursor-pointer">
                  Team - Alla i teamet kan se denna favorit
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Parametrar</Label>
            <div className="text-sm text-muted-foreground mb-2">
              Dessa parametrar används när du öppnar favoriten
            </div>
            {parameterEntries.length > 0 ? (
              <div className="space-y-3">
                {parameterEntries.map(([key, value]) => (
                  <div key={key} className="flex gap-2 items-start p-3 border rounded-lg bg-muted/30">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {key}
                        </Badge>
                      </div>
                      <Input
                        value={formatParameterValue(value)}
                        onChange={(e) => handleParameterValueChange(key, e.target.value)}
                        placeholder="Värde"
                        className="bg-background"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveParameter(key)}
                      className="mt-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground p-4 border rounded-lg text-center">
                Inga parametrar sparade
              </div>
            )}
          </div>

          {favorite && (
            <div className="space-y-2 pt-4 border-t">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skapad:</span>
                  <span>{new Date(favorite.createdAt).toLocaleDateString("sv-SE")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Senast använd:</span>
                  <span>{new Date(favorite.lastUsed).toLocaleDateString("sv-SE")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Antal användningar:</span>
                  <span>{favorite.useCount} gånger</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Målsida:</span>
                  <span className="font-mono text-xs">{favorite.targetUrl}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button onClick={handleSave}>
            Spara ändringar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Save, Copy } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { Favorite, FavoriteParameters } from "@/types/favorites";
import { toast } from "@/hooks/use-toast";

interface UpdateFavoriteDialogProps {
  favorite: Favorite;
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateFavoriteDialog({ favorite, isOpen, onClose }: UpdateFavoriteDialogProps) {
  const [action, setAction] = useState<"update" | "new">("update");
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { updateFavorite, createFavorite, clearActiveFavorite } = useFavorites();
  const location = useLocation();

  const handleSave = () => {
    // Parse current URL parameters
    const searchParams = new URLSearchParams(location.search);
    const parameters: FavoriteParameters = {};
    
    searchParams.forEach((value, key) => {
      const existing = parameters[key];
      if (existing) {
        parameters[key] = Array.isArray(existing) 
          ? [...existing, value] 
          : [String(existing), value];
      } else {
        parameters[key] = value;
      }
    });

    if (action === "update") {
      // Update existing favorite
      updateFavorite(favorite.id, {
        parameters,
      });
      
      toast({
        title: "Favorit uppdaterad",
        description: `"${favorite.name}" har uppdaterats med nya filter.`,
      });
    } else {
      // Create new favorite
      if (!newName.trim()) {
        toast({
          title: "Namn krävs",
          description: "Ange ett namn för den nya favoriten.",
          variant: "destructive",
        });
        return;
      }

      createFavorite(
        newName.trim(),
        newDescription.trim() || undefined,
        favorite.category,
        favorite.metadata.pageTitle,
        favorite.visibility,
        favorite.metadata.icon
      );

      // Clear active favorite since we created a new one
      clearActiveFavorite();

      toast({
        title: "Ny favorit skapad",
        description: `"${newName}" har sparats som en ny favorit.`,
      });
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uppdatera favorit</DialogTitle>
          <DialogDescription>
            Du har ändrat filter eller parametrar. Vill du uppdatera den befintliga favoriten eller skapa en ny?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-3">
            <div className="text-sm font-medium">{favorite.name}</div>
            {favorite.description && (
              <div className="text-xs text-muted-foreground mt-1">{favorite.description}</div>
            )}
          </div>

          <RadioGroup value={action} onValueChange={(value) => setAction(value as "update" | "new")}>
            <div className="flex items-start space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent" onClick={() => setAction("update")}>
              <RadioGroupItem value="update" id="update" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="update" className="cursor-pointer font-medium flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Uppdatera befintlig favorit
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Ersätt de sparade filtren med dina nuvarande inställningar
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent" onClick={() => setAction("new")}>
              <RadioGroupItem value="new" id="new" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="new" className="cursor-pointer font-medium flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Spara som ny favorit
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Skapa en ny favorit och behåll den ursprungliga
                </p>
              </div>
            </div>
          </RadioGroup>

          {action === "new" && (
            <div className="space-y-3 pt-2">
              <div className="space-y-2">
                <Label htmlFor="new-name">Namn *</Label>
                <Input
                  id="new-name"
                  placeholder="Ge den nya favoriten ett namn"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-description">Beskrivning (valfritt)</Label>
                <Textarea
                  id="new-description"
                  placeholder="Beskriv vad denna favorit visar..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button onClick={handleSave}>
            {action === "update" ? "Uppdatera" : "Skapa ny"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

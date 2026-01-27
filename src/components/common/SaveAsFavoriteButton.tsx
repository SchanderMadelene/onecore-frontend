
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star, Users, User } from "lucide-react";
import { useFavorites } from "@/features/favorites";
import { FavoriteCategory, FavoriteVisibility } from "@/types/favorites";
import { toast } from "@/hooks/use-toast";

interface SaveAsFavoriteButtonProps {
  category: FavoriteCategory;
  pageTitle: string;
  defaultName?: string;
  icon?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function SaveAsFavoriteButton({
  category,
  pageTitle,
  defaultName,
  icon,
  variant = "outline",
  size = "sm",
  className
}: SaveAsFavoriteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(defaultName || "");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<FavoriteVisibility>("personal");
  const { createFavorite } = useFavorites();

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Namn krävs",
        description: "Ange ett namn för favoriten.",
        variant: "destructive",
      });
      return;
    }

    createFavorite(
      name.trim(),
      description.trim() || undefined,
      category,
      pageTitle,
      visibility,
      icon
    );

    const visibilityText = visibility === "team" ? "och delad med ditt team" : "som personlig favorit";
    toast({
      title: "Favorit sparad",
      description: `"${name}" har lagts till ${visibilityText}.`,
    });

    // Reset and close
    setName(defaultName || "");
    setDescription("");
    setVisibility("personal");
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <Star className="h-4 w-4 mr-2" />
        Spara som favorit
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Spara som favorit</DialogTitle>
            <DialogDescription>
              Spara nuvarande filter och sökning som en återanvändbar genväg.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Namn *</Label>
              <Input
                id="name"
                placeholder="T.ex. Vakanta bilplatser område A"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beskrivning (valfritt)</Label>
              <Textarea
                id="description"
                placeholder="Beskriv vad denna favorit visar..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Synlighet</Label>
              <RadioGroup value={visibility} onValueChange={(value) => setVisibility(value as FavoriteVisibility)}>
                <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent" onClick={() => setVisibility("personal")}>
                  <RadioGroupItem value="personal" id="personal" />
                  <div className="flex items-center gap-2 flex-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="personal" className="cursor-pointer font-medium">
                        Personlig favorit
                      </Label>
                      <p className="text-sm text-muted-foreground">Endast synlig för dig</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-accent" onClick={() => setVisibility("team")}>
                  <RadioGroupItem value="team" id="team" />
                  <div className="flex items-center gap-2 flex-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label htmlFor="team" className="cursor-pointer font-medium">
                        Dela med mitt team
                      </Label>
                      <p className="text-sm text-muted-foreground">Synlig för alla i ditt team</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="text-sm text-muted-foreground">
              <div className="font-medium mb-1">Detta sparas:</div>
              <ul className="list-disc list-inside space-y-1">
                <li>Nuvarande sida: {pageTitle}</li>
                <li>Alla aktiva filter och parametrar</li>
                <li>Kategori: {category}</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Avbryt
            </Button>
            <Button onClick={handleSave}>
              <Star className="h-4 w-4 mr-2" />
              Spara favorit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

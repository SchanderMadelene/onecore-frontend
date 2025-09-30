import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { FavoriteCategory } from "@/types/favorites";
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
      icon
    );

    toast({
      title: "Favorit sparad",
      description: `"${name}" har lagts till i dina favoriter.`,
    });

    // Reset and close
    setName(defaultName || "");
    setDescription("");
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

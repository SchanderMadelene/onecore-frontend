import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FavoriteCategory, FavoriteVisibility, FavoriteParameters } from "@/types/favorites";
import { Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CreateFavoriteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateFavorite: (
    name: string,
    description: string | undefined,
    category: FavoriteCategory,
    targetUrl: string,
    parameters: FavoriteParameters,
    pageTitle: string,
    visibility: FavoriteVisibility,
    icon?: string
  ) => void;
}

export function CreateFavoriteDialog({
  open,
  onOpenChange,
  onCreateFavorite,
}: CreateFavoriteDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<FavoriteCategory>("general");
  const [targetUrl, setTargetUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [visibility, setVisibility] = useState<FavoriteVisibility>("personal");
  const [icon, setIcon] = useState("");
  const [parameters, setParameters] = useState<Array<{ key: string; value: string }>>([]);

  const handleAddParameter = () => {
    setParameters([...parameters, { key: "", value: "" }]);
  };

  const handleRemoveParameter = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const handleParameterChange = (index: number, field: "key" | "value", value: string) => {
    const newParams = [...parameters];
    newParams[index][field] = value;
    setParameters(newParams);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Namn saknas",
        description: "Du måste ange ett namn för favoriten.",
        variant: "destructive",
      });
      return;
    }

    if (!targetUrl.trim()) {
      toast({
        title: "URL saknas",
        description: "Du måste ange en målsida (URL) för favoriten.",
        variant: "destructive",
      });
      return;
    }

    // Convert parameters array to object
    const paramObj: FavoriteParameters = {};
    parameters.forEach(param => {
      if (param.key.trim()) {
        paramObj[param.key] = param.value;
      }
    });

    onCreateFavorite(
      name.trim(),
      description.trim() || undefined,
      category,
      targetUrl.trim(),
      paramObj,
      pageTitle.trim() || name.trim(),
      visibility,
      icon.trim() || undefined
    );

    // Reset form
    setName("");
    setDescription("");
    setCategory("general");
    setTargetUrl("");
    setPageTitle("");
    setVisibility("personal");
    setIcon("");
    setParameters([]);
    
    onOpenChange(false);
    
    toast({
      title: "Favorit skapad",
      description: `"${name}" har lagts till i dina favoriter.`,
    });
  };

  const getCategoryLabel = (cat: FavoriteCategory): string => {
    const labels: Record<FavoriteCategory, string> = {
      rentals: "Uthyrning",
      properties: "Fastigheter",
      tenants: "Kunder",
      barriers: "Spärrar",
      turnover: "In- och utflytt",
      inspections: "Besiktningar",
      general: "Allmänt"
    };
    return labels[cat];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Skapa ny favorit</DialogTitle>
          <DialogDescription>
            Skapa en anpassad genväg till en specifik sida och filter.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Namn *</Label>
            <Input
              id="name"
              placeholder="T.ex. 'Lediga lägenheter i centrum'"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Beskrivning</Label>
            <Textarea
              id="description"
              placeholder="Valfri beskrivning av favoriten"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as FavoriteCategory)}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["rentals", "properties", "tenants", "barriers", "turnover", "inspections", "general"] as FavoriteCategory[]).map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {getCategoryLabel(cat)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Target URL */}
          <div className="space-y-2">
            <Label htmlFor="targetUrl">Målsida (URL) *</Label>
            <Input
              id="targetUrl"
              placeholder="/properties eller /rentals"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Ange sökvägen till sidan, t.ex. /properties, /rentals, /tenants
            </p>
          </div>

          {/* Page Title */}
          <div className="space-y-2">
            <Label htmlFor="pageTitle">Sidtitel</Label>
            <Input
              id="pageTitle"
              placeholder="Valfri sidtitel (används som namn om inte angiven)"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
            />
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <Label htmlFor="icon">Ikon (emoji)</Label>
            <Input
              id="icon"
              placeholder="🏠"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              maxLength={2}
            />
          </div>

          {/* Parameters */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>URL-parametrar</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddParameter}
              >
                <Plus className="h-4 w-4 mr-1" />
                Lägg till
              </Button>
            </div>
            {parameters.length > 0 ? (
              <div className="space-y-2 border rounded-md p-3">
                {parameters.map((param, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Nyckel (t.ex. 'status')"
                      value={param.key}
                      onChange={(e) => handleParameterChange(index, "key", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Värde (t.ex. 'available')"
                      value={param.value}
                      onChange={(e) => handleParameterChange(index, "value", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveParameter(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Inga parametrar tillagda. Klicka på "Lägg till" för att lägga till filter.
              </p>
            )}
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <Label>Synlighet</Label>
            <RadioGroup value={visibility} onValueChange={(value) => setVisibility(value as FavoriteVisibility)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal" className="font-normal cursor-pointer">
                  Personlig - Endast synlig för dig
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="team" id="team" />
                <Label htmlFor="team" className="font-normal cursor-pointer">
                  Team - Synlig för hela teamet
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button onClick={handleSubmit}>
            Skapa favorit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

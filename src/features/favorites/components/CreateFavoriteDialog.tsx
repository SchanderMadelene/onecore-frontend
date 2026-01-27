import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FavoriteCategory, FavoriteVisibility, FavoriteParameters } from "@/types/favorites";
import { toast } from "@/hooks/use-toast";
import { mockProperties } from "@/data/properties";

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
  const [category, setCategory] = useState<FavoriteCategory>("properties");
  const [pageTitle, setPageTitle] = useState("");
  const [visibility, setVisibility] = useState<FavoriteVisibility>("personal");
  const [icon, setIcon] = useState("");
  
  // Properties filters
  const [propertyDistrict, setPropertyDistrict] = useState<string>("all");
  const [propertyArea, setPropertyArea] = useState<string>("all");
  const [propertyPurpose, setPropertyPurpose] = useState<string>("all");
  
  // Rentals filters
  const [rentalType, setRentalType] = useState<string>("bostad");
  const [rentalStatus, setRentalStatus] = useState<string>("publicerade");

  // Get unique districts and areas from properties
  const allDistricts = [...new Set(mockProperties.map(p => p.district))];
  const allAreas = [...new Set(mockProperties.map(p => p.propertyManagerArea))];

  // Reset filters when category changes
  useEffect(() => {
    setPropertyDistrict("all");
    setPropertyArea("all");
    setPropertyPurpose("all");
    setRentalType("bostad");
    setRentalStatus("publicerade");
  }, [category]);

  const buildTargetUrlAndParameters = (): { url: string; params: FavoriteParameters } => {
    let url = "";
    const params: FavoriteParameters = {};

    switch (category) {
      case "properties":
        url = "/properties";
        if (propertyDistrict !== "all") params.district = propertyDistrict;
        if (propertyArea !== "all") params.area = propertyArea;
        if (propertyPurpose !== "all") params.purpose = propertyPurpose;
        break;
      
      case "rentals":
        url = `/rentals?tab=${rentalType}`;
        params.tab = rentalType;
        params.status = rentalStatus;
        break;
      
      case "tenants":
        url = "/tenants";
        break;
      
      case "barriers":
        url = "/barriers";
        break;
      
      case "turnover":
        url = "/turnover";
        break;
      
      case "inspections":
        url = "/inspections";
        break;
      
      default:
        url = "/";
    }

    return { url, params };
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

    const { url, params } = buildTargetUrlAndParameters();

    onCreateFavorite(
      name.trim(),
      description.trim() || undefined,
      category,
      url,
      params,
      pageTitle.trim() || name.trim(),
      visibility,
      icon.trim() || undefined
    );

    // Reset form
    setName("");
    setDescription("");
    setCategory("properties");
    setPageTitle("");
    setVisibility("personal");
    setIcon("");
    setPropertyDistrict("all");
    setPropertyArea("all");
    setPropertyPurpose("all");
    setRentalType("bostad");
    setRentalStatus("publicerade");
    
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

          {/* Category-specific filters */}
          {category === "properties" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="propertyDistrict">Distrikt</Label>
                <Select value={propertyDistrict} onValueChange={setPropertyDistrict}>
                  <SelectTrigger id="propertyDistrict">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla distrikt</SelectItem>
                    {allDistricts.map(district => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyArea">Område</Label>
                <Select value={propertyArea} onValueChange={setPropertyArea}>
                  <SelectTrigger id="propertyArea">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla områden</SelectItem>
                    {allAreas.map(area => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyPurpose">Ändamål</Label>
                <Select value={propertyPurpose} onValueChange={setPropertyPurpose}>
                  <SelectTrigger id="propertyPurpose">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alla ändamål</SelectItem>
                    <SelectItem value="Bostad">Bostad</SelectItem>
                    <SelectItem value="Kontor">Kontor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {category === "rentals" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="rentalType">Typ</Label>
                <Select value={rentalType} onValueChange={setRentalType}>
                  <SelectTrigger id="rentalType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bostad">Bostad</SelectItem>
                    <SelectItem value="bilplats">Bilplats</SelectItem>
                    <SelectItem value="forrad">Förråd</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rentalStatus">Status</Label>
                <Select value={rentalStatus} onValueChange={setRentalStatus}>
                  <SelectTrigger id="rentalStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="publicerade">Publicerade</SelectItem>
                    <SelectItem value="klaraForErbjudande">Klara för erbjudande</SelectItem>
                    <SelectItem value="erbjudna">Erbjudna</SelectItem>
                    <SelectItem value="historik">Historik</SelectItem>
                    <SelectItem value="behovAvPublicering">Behov av publicering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Page Title */}
          <div className="space-y-2">
            <Label htmlFor="pageTitle">Sidtitel (valfritt)</Label>
            <Input
              id="pageTitle"
              placeholder="Valfri sidtitel (används som namn om inte angiven)"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
            />
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <Label htmlFor="icon">Ikon (valfritt)</Label>
            <Input
              id="icon"
              placeholder="🏠"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              maxLength={2}
            />
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

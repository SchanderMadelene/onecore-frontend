import { useState } from "react";
import { PageLayout } from "@/layouts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFavorites, EditFavoriteDialog, CreateFavoriteDialog } from "@/features/favorites";
import { Favorite, FavoriteCategory, FavoriteParameters, FavoriteVisibility } from "@/types/favorites";
import { Star, Search, Trash2, Clock, TrendingUp, ExternalLink, Upload, Download, Share2, User, Users, Pencil, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";


export default function FavoritesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const {
    favorites,
    navigateToFavorite,
    deleteFavorite,
    updateFavorite,
    shareFavorite,
    exportFavorites,
    importFavorites,
    createCustomFavorite,
  } = useFavorites();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FavoriteCategory | "all">("all");
  const [editingFavorite, setEditingFavorite] = useState<Favorite | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const formatLastUsed = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Idag";
    if (diffDays === 1) return "Igår";
    if (diffDays < 7) return `${diffDays} dagar sedan`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} veckor sedan`;
    return `${Math.floor(diffDays / 30)} månader sedan`;
  };

  const getCategoryLabel = (category: FavoriteCategory): string => {
    const labels: Record<FavoriteCategory, string> = {
      rentals: "Uthyrning",
      properties: "Fastigheter",
      "property-areas": "Förvaltningsområden",
      tenants: "Kunder",
      barriers: "Spärrar",
      turnover: "In- och utflytt",
      inspections: "Besiktningar",
      general: "Allmänt"
    };
    return labels[category];
  };

  const getCategoryIcon = (category: FavoriteCategory): string => {
    const icons: Record<FavoriteCategory, string> = {
      rentals: "🔑",
      properties: "🏢",
      "property-areas": "📍",
      tenants: "👤",
      barriers: "🚫",
      turnover: "🔄",
      inspections: "📋",
      general: "⭐"
    };
    return icons[category];
  };

  const handleUseFavorite = (favorite: Favorite) => {
    navigateToFavorite(favorite);
    toast({
      title: "Navigerar till favorit",
      description: `Öppnar "${favorite.name}".`
    });
  };

  const handleEditFavorite = (favorite: Favorite) => {
    setEditingFavorite(favorite);
    setIsEditDialogOpen(true);
  };

  const handleCreateFavorite = (
    name: string,
    description: string | undefined,
    category: FavoriteCategory,
    targetUrl: string,
    parameters: FavoriteParameters,
    pageTitle: string,
    visibility: FavoriteVisibility,
    icon?: string
  ) => {
    createCustomFavorite(
      name,
      description,
      category,
      targetUrl,
      parameters,
      pageTitle,
      visibility,
      icon
    );
  };

  const handleDeleteFavorite = (id: string, name: string) => {
    deleteFavorite(id);
    toast({
      title: "Favorit borttagen",
      description: `"${name}" har tagits bort.`
    });
  };

  const handleShareFavorite = async (id: string, name: string) => {
    try {
      const shareUrl = shareFavorite(id);
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Länk kopierad",
        description: `Delningslänk för "${name}" har kopierats till urklipp.`
      });
    } catch (error) {
      toast({
        title: "Kunde inte dela",
        description: "Försök igen senare.",
        variant: "destructive"
      });
    }
  };

  const handleExport = () => {
    try {
      const json = exportFavorites();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mimer-favoriter-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export lyckades",
        description: "Dina favoriter har exporterats."
      });
    } catch (error) {
      toast({
        title: "Export misslyckades",
        description: "Kunde inte exportera favoriter.",
        variant: "destructive"
      });
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          const count = importFavorites(text);
          toast({
            title: "Import lyckades",
            description: `${count} favoriter har importerats.`
          });
        } catch (error) {
          toast({
            title: "Import misslyckades",
            description: "Ogiltig fil eller format.",
            variant: "destructive"
          });
        }
      }
    };
    input.click();
  };

  // Filter favorites based on search query and category
  const filteredFavorites = favorites.filter(fav => {
    const matchesSearch = fav.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (fav.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesCategory = selectedCategory === "all" || fav.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group favorites by category
  const groupedByCategory = filteredFavorites.reduce((acc, fav) => {
    if (!acc[fav.category]) acc[fav.category] = [];
    acc[fav.category].push(fav);
    return acc;
  }, {} as Record<FavoriteCategory, Favorite[]>);

  // Calculate statistics
  const totalFavorites = favorites.length;
  const totalUsage = favorites.reduce((sum, fav) => sum + fav.useCount, 0);
  const mostUsed = [...favorites].sort((a, b) => b.useCount - a.useCount).slice(0, 3);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Favoriter</h1>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Skapa ny
          </Button>
        </div>
        <p className="text-muted-foreground mb-6">
          Hantera dina sparade genvägar och filter
        </p>

        <div className="space-y-6">
        {/* Statistics and Actions Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Totalt antal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{totalFavorites}</span>
                <span className="text-sm text-muted-foreground">sparade</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Totala användningar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{totalUsage}</span>
                <span className="text-sm text-muted-foreground">gånger</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Mest använda</CardTitle>
            </CardHeader>
            <CardContent>
              {mostUsed.length > 0 ? (
                <div className="text-sm">
                  <div className="font-medium truncate">{mostUsed[0].name}</div>
                  <div className="text-muted-foreground">{mostUsed[0].useCount} användningar</div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Ingen data ännu</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Hantera</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport} disabled={favorites.length === 0}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleImport}>
                <Upload className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sök bland dina favoriter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  Alla
                </Button>
                {(["rentals", "properties", "tenants", "barriers", "turnover", "inspections", "general"] as FavoriteCategory[]).map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {getCategoryLabel(cat)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Favorites List */}
        {filteredFavorites.length > 0 ? (
          <div className="space-y-4">
            {isMobile ? (
              // Mobile: Single column list
              filteredFavorites.map((favorite) => (
                <Card key={favorite.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{getCategoryIcon(favorite.category)}</span>
                            <h3 className="font-medium truncate">{favorite.name}</h3>
                          </div>
                          {favorite.description && (
                            <p className="text-sm text-muted-foreground mt-1">{favorite.description}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">{favorite.metadata.pageTitle}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditFavorite(favorite)}
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShareFavorite(favorite.id, favorite.name)}
                          >
                            <Share2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFavorite(favorite.id, favorite.name)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatLastUsed(favorite.lastUsed)}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {favorite.useCount} gånger
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {favorite.visibility === "team" ? (
                            <>
                              <Users className="h-3 w-3 mr-1" />
                              Team
                            </>
                          ) : (
                            <>
                              <User className="h-3 w-3 mr-1" />
                              Personlig
                            </>
                          )}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(favorite.category)}
                        </Badge>
                      </div>

                      <Button
                        onClick={() => handleUseFavorite(favorite)}
                        className="w-full"
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Öppna favorit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Desktop: Grid layout
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredFavorites.map((favorite) => (
                  <Card key={favorite.id} className="hover:shadow-md transition-shadow group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{getCategoryIcon(favorite.category)}</span>
                            <CardTitle className="text-base truncate">{favorite.name}</CardTitle>
                          </div>
                          {favorite.description && (
                            <CardDescription className="mt-1">{favorite.description}</CardDescription>
                          )}
                          <CardDescription className="text-xs mt-1">
                            {favorite.metadata.pageTitle}
                          </CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditFavorite(favorite)}
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShareFavorite(favorite.id, favorite.name)}
                          >
                            <Share2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFavorite(favorite.id, favorite.name)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatLastUsed(favorite.lastUsed)}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {favorite.useCount} gånger
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {favorite.visibility === "team" ? (
                            <>
                              <Users className="h-3 w-3 mr-1" />
                              Team
                            </>
                          ) : (
                            <>
                              <User className="h-3 w-3 mr-1" />
                              Personlig
                            </>
                          )}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(favorite.category)}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleUseFavorite(favorite)}
                        className="w-full"
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Öppna favorit
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {searchQuery || selectedCategory !== "all" 
                    ? "Inga favoriter hittades" 
                    : "Inga sparade favoriter än"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || selectedCategory !== "all"
                    ? "Försök med andra sökkriterier eller kategorier"
                    : "Använd 'Spara som favorit'-knappen på olika listsidor för att skapa genvägar"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        </div>

        <EditFavoriteDialog
          favorite={editingFavorite}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={updateFavorite}
        />

        <CreateFavoriteDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateFavorite={handleCreateFavorite}
        />
      </div>
    </PageLayout>
  );
}
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { SavedSearch, SearchResultType } from "@/types/search";
import { Star, Search, Trash2, Clock, Filter, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export default function FavoritesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const {
    favorites,
    useSavedSearch,
    deleteSavedSearch,
    openSearch
  } = useGlobalSearch();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<SearchResultType | "all">("all");

  const formatLastUsed = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Idag";
    if (diffDays === 1) return "Igår";
    if (diffDays < 7) return `${diffDays} dagar sedan`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} veckor sedan`;
    return `${Math.floor(diffDays / 30)} månader sedan`;
  };

  const getTypeLabel = (type: SearchResultType): string => {
    const labels: Record<SearchResultType, string> = {
      customer: "Kunder",
      residence: "Lägenheter",
      case: "Ärenden",
      invoice: "Fakturor",
      key: "Nycklar",
      document: "Dokument"
    };
    return labels[type];
  };

  const handleUseFavorite = (favorite: SavedSearch) => {
    useSavedSearch(favorite);
    openSearch();
    toast({
      title: "Sökning aktiverad",
      description: `"${favorite.name}" har laddats.`
    });
  };

  const handleDeleteFavorite = (id: string, name: string) => {
    deleteSavedSearch(id);
    toast({
      title: "Favorit borttagen",
      description: `"${name}" har tagits bort.`
    });
  };

  // Filter favorites based on search query and type
  const filteredFavorites = favorites.filter(fav => {
    const matchesSearch = fav.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fav.query.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || fav.filters.includes(selectedType);
    return matchesSearch && matchesType;
  });

  // Group favorites by filter type
  const groupedByType = filteredFavorites.reduce((acc, fav) => {
    if (fav.filters.length === 0) {
      if (!acc["all"]) acc["all"] = [];
      acc["all"].push(fav);
    } else {
      fav.filters.forEach(type => {
        if (!acc[type]) acc[type] = [];
        acc[type].push(fav);
      });
    }
    return acc;
  }, {} as Record<string, SavedSearch[]>);

  // Calculate statistics
  const totalFavorites = favorites.length;
  const totalUsage = favorites.reduce((sum, fav) => sum + fav.useCount, 0);
  const mostUsed = [...favorites].sort((a, b) => b.useCount - a.useCount).slice(0, 3);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">Favoriter</h1>
        <p className="text-muted-foreground mb-6">
          Hantera dina sparade sökningar
        </p>

        <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  variant={selectedType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType("all")}
                >
                  Alla
                </Button>
                {(["customer", "residence", "case", "invoice", "key", "document"] as SearchResultType[]).map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                  >
                    {getTypeLabel(type)}
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
                          <h3 className="font-medium truncate">{favorite.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{favorite.query}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFavorite(favorite.id, favorite.name)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatLastUsed(favorite.lastUsed)}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {favorite.useCount} gånger
                        </Badge>
                        {favorite.filters.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            <Filter className="h-3 w-3 mr-1" />
                            {favorite.filters.length} filter
                          </Badge>
                        )}
                      </div>

                      <Button
                        onClick={() => handleUseFavorite(favorite)}
                        className="w-full"
                        size="sm"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Använd sökning
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
                          <CardTitle className="text-base truncate">{favorite.name}</CardTitle>
                          <CardDescription className="mt-1">{favorite.query}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFavorite(favorite.id, favorite.name)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
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
                        {favorite.filters.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            <Filter className="h-3 w-3 mr-1" />
                            {favorite.filters.map(f => getTypeLabel(f)).join(", ")}
                          </Badge>
                        )}
                      </div>
                      <Button
                        onClick={() => handleUseFavorite(favorite)}
                        className="w-full"
                        size="sm"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Använd sökning
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
                  {searchQuery || selectedType !== "all" 
                    ? "Inga favoriter hittades" 
                    : "Inga sparade favoriter än"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery || selectedType !== "all"
                    ? "Försök med andra sökkriterier eller filter"
                    : "Använd globalsökningen och spara dina mest använda sökningar"}
                </p>
                <Button onClick={openSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Öppna sökning
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </PageLayout>
  );
}
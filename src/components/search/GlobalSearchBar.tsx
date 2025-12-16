import { useState, useRef, useEffect } from "react";
import { Search, X, Filter, Star, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { SearchResultsList } from "./SearchResultsList";
import { SearchFavorites } from "./SearchFavorites";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface GlobalSearchBarProps {
  className?: string;
  placeholder?: string;
}

export function GlobalSearchBar({ 
  className, 
  placeholder = "Sök efter kunder, lägenheter, ärenden..." 
}: GlobalSearchBarProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate();

  const {
    query,
    results,
    suggestions,
    groupedResults,
    isLoading,
    isOpen,
    favorites,
    history,
    hasActiveFilters,
    filters,
    identifierMatch,
    exactMatch,
    isQuickSearchMode,
    setQuery,
    toggleFilter,
    clearFilters,
    openSearch,
    closeSearch,
    clearSearch,
    saveCurrentSearch,
    useSavedSearch,
    deleteSavedSearch
  } = useGlobalSearch();

  // Handle clicks outside the search container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeSearch();
        setShowFavorites(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSearch]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
        setShowFavorites(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        openSearch();
      }
      // Enter to navigate to exact match
      if (e.key === "Enter" && exactMatch && isOpen) {
        e.preventDefault();
        navigate(exactMatch.path);
        closeSearch();
        clearSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeSearch, openSearch, exactMatch, navigate, isOpen, clearSearch]);

  const handleInputFocus = () => {
    openSearch();
    setShowFavorites(false);
  };

  const handleClearSearch = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  const handleExactMatchClick = () => {
    if (exactMatch) {
      navigate(exactMatch.path);
      closeSearch();
      clearSearch();
    }
  };

  const showDropdown = isOpen && (
    query.length > 0 || 
    suggestions.length > 0 || 
    showFavorites || 
    (query.length === 0 && (favorites.length > 0 || history.length > 0))
  );

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      {/* Main search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground pointer-events-none -translate-y-1/2" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          className="w-full pl-9 pr-20 h-10 bg-background border-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
        />
        
        {/* Right side controls */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* Identifier type badge */}
          {identifierMatch && (
            <Badge variant="secondary" className="h-5 text-xs bg-primary/10 text-primary">
              {identifierMatch.label}
            </Badge>
          )}
          
          {/* Active filters indicator (only in exploration mode) */}
          {!isQuickSearchMode && hasActiveFilters && (
            <Badge variant="secondary" className="h-5 text-xs">
              {filters.filter(f => f.active).length}
            </Badge>
          )}

          {/* Favorites button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => {
              setShowFavorites(!showFavorites);
            }}
          >
            <Star className="h-3 w-3" />
          </Button>

          {/* Clear button */}
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={handleClearSearch}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Search dropdown */}
      {showDropdown && (
        <div className={cn(
          "absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-xl overflow-hidden z-50",
          isQuickSearchMode && query.length > 0 ? "max-w-md" : "max-w-2xl"
        )}>
          {/* QUICK SEARCH MODE - Compact dropdown when identifier detected */}
          {isQuickSearchMode && query.length > 0 ? (
            <div className="p-3">
              {/* Identifier type indicator */}
              <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" />
                <span>Söker efter {identifierMatch?.label.toLowerCase()}</span>
              </div>

              {/* Exact match - prominent display */}
              {exactMatch ? (
                <button
                  onClick={handleExactMatchClick}
                  className="w-full text-left p-3 rounded-md bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="h-5 text-xs bg-green-600">
                          Exakt träff
                        </Badge>
                        <span className="font-medium">{exactMatch.title}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {exactMatch.subtitle}
                      </div>
                      {exactMatch.description && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {exactMatch.description}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">Enter</kbd>
                    <span>för att gå direkt</span>
                  </div>
                </button>
              ) : isLoading ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Söker...
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Ingen exakt träff hittades
                </div>
              )}

              {/* Related results (collapsed, minimal) */}
              {results.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <div className="text-xs text-muted-foreground mb-2">
                    Relaterade resultat ({results.length})
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {results.slice(0, 3).map((result) => (
                      <button
                        key={result.id}
                        onClick={() => {
                          navigate(result.path);
                          closeSearch();
                          clearSearch();
                        }}
                        className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-md transition-colors"
                      >
                        {result.title}
                        <span className="text-xs text-muted-foreground ml-2">
                          {result.subtitle}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* EXPLORATION MODE - Full dropdown with filters */
            <div className="flex flex-col max-h-[80vh]">
              {/* Filter section - only show when there's a query */}
              {query.length > 0 && (
                <div className="p-3 border-b bg-accent/5">
                  <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                    Filtrera
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {filters.map((filter) => (
                      <button
                        key={filter.type}
                        onClick={() => toggleFilter(filter.type)}
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 text-xs rounded-md transition-colors",
                          filter.active 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-accent border border-border"
                        )}
                      >
                        <span>{filter.icon}</span>
                        <span>{filter.label}</span>
                      </button>
                    ))}
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-xs text-muted-foreground hover:text-foreground px-2"
                      >
                        Rensa
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Content area */}
              <div className="overflow-y-auto flex-1">
                {query.length > 0 ? (
                  <>
                    {/* Suggestions */}
                    {suggestions.length > 0 && results.length === 0 && !isLoading && (
                      <div className="p-3 border-b">
                        <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                          Sökförslag
                        </div>
                        <div className="space-y-1">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <Search className="h-3 w-3 text-muted-foreground" />
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Search results */}
                    <SearchResultsList
                      query={query}
                      groupedResults={groupedResults}
                      isLoading={isLoading}
                      onResultClick={() => {
                        closeSearch();
                        clearSearch();
                      }}
                    />
                  </>
                ) : (
                  <div className="p-3 space-y-4">
                    {/* Saved searches */}
                    {favorites.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                          Sparade sökningar
                        </div>
                        <div className="space-y-1">
                          {favorites.slice(0, 5).map((favorite) => (
                            <button
                              key={favorite.id}
                              className="w-full text-left px-2 py-1.5 hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                              onClick={() => useSavedSearch(favorite)}
                            >
                              <Star className="h-3 w-3 text-primary" />
                              <div>
                                <div className="text-sm font-medium">{favorite.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {favorite.query}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent searches */}
                    {history.length > 0 && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                          Senaste sökningar
                        </div>
                        <div className="space-y-1">
                          {history.slice(0, 5).map((item, index) => (
                            <button
                              key={index}
                              className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded-md transition-colors flex items-center gap-2"
                              onClick={() => setQuery(item)}
                            >
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Keyboard hint */}
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      Snabbsök: skriv personnummer, telefonnummer eller fakturanummer för direkt träff
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Favorites overlay */}
          {showFavorites && (
            <div className="absolute inset-0 bg-background">
              <div className="p-4">
                <SearchFavorites
                  favorites={favorites}
                  onUseFavorite={useSavedSearch}
                  onDeleteFavorite={deleteSavedSearch}
                  onSaveCurrentSearch={saveCurrentSearch}
                  currentQuery={query}
                  hasActiveFilters={hasActiveFilters}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFavorites(false)}
                  className="mt-3"
                >
                  Stäng
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
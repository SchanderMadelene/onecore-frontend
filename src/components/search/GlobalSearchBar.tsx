import { useState, useRef, useEffect } from "react";
import { Search, X, Filter, Star, Clock, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { SearchResultsList } from "./SearchResultsList";
import { SearchFilters } from "./SearchFilters";
import { SearchFavorites } from "./SearchFavorites";
import { cn } from "@/lib/utils";

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
  const [showFilters, setShowFilters] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

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
        setShowFilters(false);
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
        setShowFilters(false);
        setShowFavorites(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        openSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeSearch, openSearch]);

  const handleInputFocus = () => {
    openSearch();
    setShowFavorites(false);
    setShowFilters(false);
  };

  const handleClearSearch = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  const showDropdown = isOpen && (
    query.length > 0 || 
    suggestions.length > 0 || 
    showFavorites || 
    showFilters ||
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
          className="w-full pl-9 pr-24 h-10 bg-background border-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
        />
        
        {/* Right side controls */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {/* Active filters indicator */}
          {hasActiveFilters && (
            <Badge variant="secondary" className="h-6 text-xs">
              {filters.filter(f => f.active).length}
            </Badge>
          )}
          
          {/* Filter button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => {
              setShowFilters(!showFilters);
              setShowFavorites(false);
            }}
          >
            <Filter className="h-3 w-3" />
          </Button>

          {/* Favorites button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => {
              setShowFavorites(!showFavorites);
              setShowFilters(false);
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
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg max-h-[70vh] overflow-hidden z-50">
          {/* Filter panel */}
          {showFilters && (
            <div className="p-4 border-b">
              <SearchFilters
                filters={filters}
                onToggleFilter={toggleFilter}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          )}

          {/* Favorites panel */}
          {showFavorites && (
            <div className="p-4 border-b">
              <SearchFavorites
                favorites={favorites}
                onUseFavorite={useSavedSearch}
                onDeleteFavorite={deleteSavedSearch}
                onSaveCurrentSearch={saveCurrentSearch}
                currentQuery={query}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          )}

          {/* Main content area */}
          <div className="max-h-96 overflow-y-auto">
            {/* Show suggestions when typing */}
            {query.length > 0 && suggestions.length > 0 && results.length === 0 && !isLoading && (
              <div className="p-3">
                <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                  <Search className="h-3 w-3" />
                  FÖRSLAG
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-2 py-1 text-sm hover:bg-accent rounded"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Search results */}
            {query.length > 0 && (
              <SearchResultsList
                query={query}
                groupedResults={groupedResults}
                isLoading={isLoading}
                onResultClick={closeSearch}
              />
            )}

            {/* Show favorites and history when no query */}
            {query.length === 0 && !showFavorites && !showFilters && (
              <div className="p-3 space-y-4">
                {/* Recent searches */}
                {history.length > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      SENASTE SÖKNINGAR
                    </div>
                    {history.slice(0, 5).map((item, index) => (
                      <button
                        key={index}
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-accent rounded"
                        onClick={() => setQuery(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick access to favorites */}
                {favorites.length > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      FAVORITER
                    </div>
                    {favorites.slice(0, 3).map((favorite) => (
                      <button
                        key={favorite.id}
                        className="block w-full text-left px-2 py-1 text-sm hover:bg-accent rounded"
                        onClick={() => useSavedSearch(favorite)}
                      >
                        <div className="font-medium">{favorite.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {favorite.query} • Använd {favorite.useCount} gånger
                        </div>
                      </button>
                    ))}
                    
                    {favorites.length > 3 && (
                      <button
                        className="w-full text-left px-2 py-1 text-xs text-muted-foreground hover:bg-accent rounded flex items-center gap-1"
                        onClick={() => setShowFavorites(true)}
                      >
                        Visa alla favoriter <ChevronDown className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
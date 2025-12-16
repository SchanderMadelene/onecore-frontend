import { useRef, useEffect } from "react";
import { Search, X, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface GlobalSearchBarProps {
  className?: string;
  placeholder?: string;
}

export function GlobalSearchBar({ 
  className, 
  placeholder = "Sök personnummer, telefon, fakturanummer..." 
}: GlobalSearchBarProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const {
    query,
    isLoading,
    isOpen,
    history,
    identifierMatch,
    exactMatch,
    setQuery,
    openSearch,
    closeSearch,
    clearSearch,
  } = useGlobalSearch();

  // Handle clicks outside the search container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeSearch();
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
  };

  const handleClearSearch = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  const handleExactMatchClick = () => {
    if (exactMatch) {
      navigate(exactMatch.path);
      closeSearch();
      clearSearch();
    }
  };

  const showDropdown = isOpen && (query.length > 0 || history.length > 0);

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      {/* Main search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground pointer-events-none -translate-y-1/2" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          className="w-full pl-9 pr-16 h-10 bg-background border-input focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
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
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-xl overflow-hidden z-50 max-w-md">
          <div className="p-3">
            {query.length > 0 ? (
              <>
                {/* Identifier type indicator */}
                {identifierMatch && (
                  <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span>Söker efter {identifierMatch.label.toLowerCase()}</span>
                  </div>
                )}

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
                    {identifierMatch ? "Ingen exakt träff hittades" : "Skriv ett personnummer, telefonnummer eller fakturanummer"}
                  </div>
                )}
              </>
            ) : (
              /* Empty query - show history */
              <div className="space-y-3">
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
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] mr-1">Ctrl+K</kbd>
                  för att söka
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

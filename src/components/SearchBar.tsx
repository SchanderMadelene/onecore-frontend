import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { mockSearchResults, type SearchResult } from "@/data/search";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter search results based on the query
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filteredResults = mockSearchResults.filter(result => 
      result.name.toLowerCase().includes(query) || 
      result.address.toLowerCase().includes(query) ||
      (result.type === "tenant" && result.id.toLowerCase().includes(query))
    );
    
    setSearchResults(filteredResults);
  }, [searchQuery]);

  // Handle clicks outside the search container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementera ytterligare sökning här
  };

  const handleSearchItemClick = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  return (
    <div ref={searchRef} className="flex-1 w-full max-w-3xl relative">
      <form onSubmit={handleSearch}>
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Sök efter fastigheter, lägenheter..."
            className="w-full pl-9 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
        </div>
      </form>

      {/* Search results dropdown */}
      {isSearchFocused && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg max-h-[400px] overflow-y-auto z-50">
          <div className="p-2 text-xs text-muted-foreground font-semibold">
            {searchResults.length} TRÄFFAR
          </div>
          {searchResults.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              to={result.path}
              className="block px-4 py-2 hover:bg-accent/10 text-sm"
              onClick={handleSearchItemClick}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">{result.name}</div>
                {result.type === "apartment" && (
                  <div className={`text-xs px-2 py-0.5 rounded-full ${
                    result.tenant 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {result.tenant ? "Uthyrd" : "Vakant"}
                  </div>
                )}
                {result.type === "tenant" && (
                  <div className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    Kund
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{result.address}</div>
              {result.type !== "tenant" && result.tenant && (
                <div className="text-xs mt-1 text-primary">
                  Hyresgäst: {result.tenant.name}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

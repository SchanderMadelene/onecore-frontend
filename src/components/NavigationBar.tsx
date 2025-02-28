
import { Menu, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Mockdata för sökresultat
interface SearchResult {
  id: string;
  name: string;
  type: "property" | "building" | "apartment";
  address: string;
  path: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1001",
    name: "Lägenhet 1001",
    type: "apartment",
    address: "Odenplan 5, Vasastan",
    path: "/properties/stockholm/vasastan/odenplan-5/1001"
  },
  {
    id: "1002",
    name: "Lägenhet 1002",
    type: "apartment",
    address: "Odenplan 5, Vasastan",
    path: "/properties/stockholm/vasastan/odenplan-5/1002"
  },
  {
    id: "2001",
    name: "Lägenhet 2001",
    type: "apartment",
    address: "Odenplan 5, Vasastan",
    path: "/properties/stockholm/vasastan/odenplan-5/2001"
  },
  {
    id: "3001",
    name: "Lägenhet 3001",
    type: "apartment",
    address: "Götgatan 15, Södermalm",
    path: "/properties/stockholm/sodermalm/gotgatan-15/3001"
  },
  {
    id: "3002",
    name: "Lägenhet 3002",
    type: "apartment",
    address: "Götgatan 15, Södermalm",
    path: "/properties/stockholm/sodermalm/gotgatan-15/3002"
  },
  {
    id: "101",
    name: "Kontor 101",
    type: "apartment",
    address: "Sveavägen 10, Vasastan",
    path: "/properties/stockholm/vasastan/sveavagen-10/101"
  },
  {
    id: "odenplan-5",
    name: "Odenplan 5",
    type: "property",
    address: "Vasastan, Stockholm",
    path: "/properties/stockholm/vasastan/odenplan-5"
  },
  {
    id: "sveavagen-10",
    name: "Sveavägen 10",
    type: "property",
    address: "Vasastan, Stockholm",
    path: "/properties/stockholm/vasastan/sveavagen-10"
  },
  {
    id: "gotgatan-15",
    name: "Götgatan 15",
    type: "property",
    address: "Södermalm, Stockholm",
    path: "/properties/stockholm/sodermalm/gotgatan-15"
  }
];

export function NavigationBar({ onMenuClick }: { onMenuClick: () => void }) {
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

    const filteredResults = mockSearchResults.filter(result => 
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      result.address.toLowerCase().includes(searchQuery.toLowerCase())
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
    console.log("Searching for:", searchQuery);
    // Implementera ytterligare sökning här
  };

  const handleSearchItemClick = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  return (
    <nav className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 w-full z-50">
      <div className="flex h-14 items-center px-4 justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold">OneCore</span>
        </div>
        
        <div ref={searchRef} className="flex-1 max-w-md mx-4 hidden sm:block relative">
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
                  <div className="font-medium">{result.name}</div>
                  <div className="text-xs text-muted-foreground">{result.address}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Search className="h-5 w-5" />
          </Button>
          {/* Add more navigation items here */}
        </div>
      </div>
    </nav>
  );
}

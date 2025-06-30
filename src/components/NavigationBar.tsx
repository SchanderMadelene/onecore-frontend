
import { Button } from "./ui/button";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { Link } from "react-router-dom";
import { Settings, Menu, Search } from "lucide-react";

export function NavigationBar({
  onMenuClick
}: {
  onMenuClick: () => void;
}) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  return (
    <nav className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 w-full z-50">
      <div className="flex h-14 items-center justify-between mx-0 px-[16px]">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="min-h-[44px] min-w-[44px]">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <span className="font-semibold">OneCore</span>
        </div>
        
        <div className="mx-48 flex-1 hidden sm:block">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="sm:hidden min-h-[44px] min-w-[44px]" 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Toggle Search</span>
          </Button>
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="ml-2 min-h-[44px] min-w-[44px]">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Inställningar</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      {showMobileSearch && (
        <div className="px-4 py-2 bg-background sm:hidden">
          <SearchBar />
        </div>
      )}
    </nav>
  );
}

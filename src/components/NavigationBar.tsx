
import { Menu, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
export function NavigationBar({
  onMenuClick
}: {
  onMenuClick: () => void;
}) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  return <nav className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 w-full z-50">
      <div className="flex h-14 items-center justify-between mx-0 px-[16px]">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold">OneCore</span>
        </div>
        
        <div className="mx-48 flex-1 hidden sm:block">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setShowMobileSearch(!showMobileSearch)}>
            <Search className="h-5 w-5" />
          </Button>
          {/* Add more navigation items here */}
        </div>
      </div>

      {/* Mobile search bar */}
      {showMobileSearch && <div className="px-4 py-2 bg-background sm:hidden">
          <SearchBar />
        </div>}
    </nav>;
}


import { Button } from "./ui/button";
import { useState } from "react";
import { GlobalSearchBar } from "./search/GlobalSearchBar";
import { Link } from "react-router-dom";
import { Settings, Menu, Search } from "lucide-react";
import onecoreLogo from "@/assets/logos/simple/onecore_simple_black.svg";

export function NavigationBar({
  onMenuClick
}: {
  onMenuClick: () => void;
}) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMenuClick();
  };

  const handleMenuTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMenuClick();
  };

  const handleSearchToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMobileSearch(!showMobileSearch);
  };

  const handleSearchTouch = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMobileSearch(!showMobileSearch);
  };
  
  return (
    <nav className="h-14 border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/95 fixed top-0 w-full z-[70] shadow-sm">
      <div className="flex h-14 items-center justify-between mx-0 px-[16px]">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleMenuClick}
            onTouchStart={handleMenuTouch}
            className="min-h-[44px] min-w-[44px] relative z-[71] touch-manipulation active:scale-95 transition-transform lg:hidden"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Link 
            to="/" 
            className="hover:opacity-80 transition-opacity cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={onecoreLogo} alt="OneCore" className="h-6" />
          </Link>
        </div>
        
        <div className="mx-48 flex-1 hidden sm:block">
          <GlobalSearchBar />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="sm:hidden min-h-[44px] min-w-[44px] relative z-[71] touch-manipulation active:scale-95 transition-transform" 
            onClick={handleSearchToggle}
            onTouchStart={handleSearchTouch}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Toggle Search</span>
          </Button>
          <Link to="/settings">
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2 min-h-[44px] min-w-[44px] relative z-[71] touch-manipulation active:scale-95 transition-transform"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Inställningar</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      {showMobileSearch && (
        <div className="px-4 py-2 bg-background sm:hidden border-t relative z-[60]">
          <GlobalSearchBar />
        </div>
      )}
    </nav>
  );
}

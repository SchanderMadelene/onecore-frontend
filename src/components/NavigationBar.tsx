
import { Button } from "./ui/button";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

export interface NavigationBarProps {
  onMenuClick: () => void;
  showRentals?: boolean;
  showDesignSystem?: boolean;
}

export function NavigationBar({
  onMenuClick,
  showRentals,
  showDesignSystem
}: NavigationBarProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  return <nav className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 w-full z-50">
      <div className="flex h-14 items-center justify-between mx-0 px-[16px]">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <span className="font-semibold">OneCore</span>
        </div>
        
        <div className="mx-48 flex-1 hidden sm:block">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setShowMobileSearch(!showMobileSearch)}>
            <span className="sr-only">Toggle Search</span>
          </Button>
          
          {/* Top navigation menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/properties">
                  <NavigationMenuLink className="px-4 py-2 text-sm">
                    Fastigheter
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              {showRentals && (
                <NavigationMenuItem>
                  <Link to="/rentals">
                    <NavigationMenuLink className="px-4 py-2 text-sm">
                      Uthyrning
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
              
              {showDesignSystem && (
                <NavigationMenuItem>
                  <Link to="/design-system">
                    <NavigationMenuLink className="px-4 py-2 text-sm">
                      Design System
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="ml-2">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Inställningar</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      {showMobileSearch && <div className="px-4 py-2 bg-background sm:hidden">
          <SearchBar />
        </div>}
    </nav>;
}

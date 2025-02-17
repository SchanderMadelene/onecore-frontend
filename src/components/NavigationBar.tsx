
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

export function NavigationBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 w-full z-50">
      <div className="flex h-14 items-center px-4 justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold">OneCore</span>
        </div>
        <div className="flex items-center space-x-4">
          {/* Add more navigation items here */}
        </div>
      </div>
    </nav>
  );
}

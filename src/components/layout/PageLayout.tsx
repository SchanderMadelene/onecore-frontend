import { NavigationBar } from "@/components/NavigationBar";
import { TreeView } from "@/components/TreeView";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

interface PageLayoutProps {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export const PageLayout = ({ children, isSidebarOpen, setIsSidebarOpen }: PageLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { features } = useFeatureToggles();
  
  useEffect(() => {
    if (!isMobile) {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 3) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    }
  }, [location.pathname, setIsSidebarOpen, isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <NavigationBar 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex h-[calc(100vh-3.5rem)] mt-14 relative">
        {isSidebarOpen && features.showNavigation && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {features.showNavigation && (
          <aside
            className={`
              w-[350px] lg:w-[320px] 
              bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
              fixed lg:static 
              left-0 top-14 
              h-[calc(100vh-3.5rem)] 
              transition-transform duration-300 ease-in-out
              z-50 lg:z-0
              border-r
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <TreeView 
              onNavigate={() => isMobile && setIsSidebarOpen(false)}
              showRentals={features.showRentals}
              showDesignSystem={features.showDesignSystem}
              showProperties={features.showProperties}
              showTenants={features.showTenants}
              showBuildings={features.showBuildings}
              showApartments={features.showApartments}
            />
          </aside>
        )}

        <main
          className={`
            flex-1 
            p-4 sm:p-6 
            transition-all duration-300 
            overflow-y-auto
            w-full
          `}
        >
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


import { NavigationBar } from "@/widgets/navigation";
import { TreeView } from "@/widgets/navigation";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { motion, AnimatePresence } from "framer-motion";
import { PropertyBreadcrumb } from "@/shared/common/Breadcrumb";

const LG_BREAKPOINT = 1024;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

interface PageLayoutProps {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export const PageLayout = ({ children, isSidebarOpen, setIsSidebarOpen }: PageLayoutProps) => {
  const location = useLocation();
  const isDesktop = useIsDesktop();
  const { features } = useFeatureToggles();
  
  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(true);
    }
  }, [location.pathname, isDesktop]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        onMenuClick={handleSidebarToggle}
      />
      
      <div className="flex h-[calc(100vh-3.5rem)] mt-14 relative">
        {/* Backdrop overlay */}
        {isSidebarOpen && features.showNavigation && (
          <div 
            className="fixed inset-0 bg-black/20 z-[45] lg:hidden backdrop-blur-sm"
            onClick={() => {
              setIsSidebarOpen(false);
            }}
            style={{ top: '3.5rem' }}
          />
        )}

        {features.showNavigation && (
          <aside
            className={`
              w-[350px] lg:w-[320px] 
              bg-background backdrop-blur supports-[backdrop-filter]:bg-background/95
              fixed lg:static 
              left-0 top-14 
              h-[calc(100vh-3.5rem)] 
              transition-transform duration-300 ease-in-out
              z-[50] lg:z-0
              border-r
              shadow-lg lg:shadow-none
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
            style={{
              transform: isSidebarOpen || isDesktop 
                ? 'translateX(0)' 
                : 'translateX(-100%)',
              willChange: 'transform'
            }}
          >
            <TreeView 
              onNavigate={() => {
                if (!isDesktop) setIsSidebarOpen(false);
              }}
              showRentals={features.showRentals}
              showRentalsHousing={features.showRentalsHousing}
              showRentalsParking={features.showRentalsParking}
              showRentalsStorage={features.showRentalsStorage}
              showDesignSystem={features.showDesignSystem}
              showProperties={features.showProperties}
              showTenants={features.showTenants}
              showBarriers={features.showBarriers}
              showTurnover={features.showTurnover}
              showAllInspections={features.showAllInspections}
              showFavorites={features.showFavorites}
              showBuildings={features.showBuildings}
              showApartments={features.showApartments}
              showEntrances={features.showEntrances}
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
            relative
            z-10
          `}
        >
          <PropertyBreadcrumb />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

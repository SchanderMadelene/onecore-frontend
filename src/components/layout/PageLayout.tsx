
import { NavigationBar } from "@/components/NavigationBar";
import { TreeView } from "@/components/TreeView";

interface PageLayoutProps {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export const PageLayout = ({ children, isSidebarOpen, setIsSidebarOpen }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <NavigationBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex h-[calc(100vh-3.5rem)] mt-14 relative">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            w-[280px] lg:w-64 
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
          <TreeView onNavigate={() => setIsSidebarOpen(false)} />
        </aside>

        <main
          className={`
            flex-1 
            p-4 sm:p-6 lg:p-8 
            transition-all duration-300 
            w-full
            overflow-y-auto
            ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}
          `}
        >
          <div className="max-w-6xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

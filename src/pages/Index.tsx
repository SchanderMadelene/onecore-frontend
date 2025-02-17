
import { useState } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { TreeView } from "@/components/TreeView";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Stäng sidomenyn som standard på mobil

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <NavigationBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex h-[calc(100vh-3.5rem)] mt-14 relative">
        {/* Overlay för mobil när sidomenyn är öppen */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - responsiv */}
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
          <TreeView />
        </aside>

        {/* Main Content - responsiv */}
        <main
          className={`
            flex-1 
            p-4 sm:p-6 lg:p-8 
            transition-all duration-300 
            w-full
            ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}
          `}
        >
          <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8 fade-in">
            <header className="text-center space-y-3 lg:space-y-4">
              <span className="text-sm text-accent font-medium">FASTIGHETSFÖRVALTNING</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
                OneCore Design System
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
                Ett elegant och användarvänligt system för modern fastighetsförvaltning
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="glassmorphism hover-transform">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>Färger</CardTitle>
                  <CardDescription>Vårt färgschema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <div className="h-12 bg-primary rounded-md"></div>
                    <p className="text-sm text-muted-foreground">Primary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-12 bg-accent rounded-md"></div>
                    <p className="text-sm text-muted-foreground">Accent</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-12 bg-secondary rounded-md"></div>
                    <p className="text-sm text-muted-foreground">Secondary</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism hover-transform">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>Typografi</CardTitle>
                  <CardDescription>Text och rubriker</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-bold">Rubrik 1</h1>
                    <h2 className="text-xl sm:text-2xl font-semibold">Rubrik 2</h2>
                    <h3 className="text-lg sm:text-xl font-medium">Rubrik 3</h3>
                    <p className="text-base">Brödtext</p>
                    <p className="text-sm text-muted-foreground">Sekundär text</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism hover-transform">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>Knappar</CardTitle>
                  <CardDescription>Interaktiva element</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                  <div className="space-y-2">
                    <Button className="w-full">Primär knapp</Button>
                    <Button variant="secondary" className="w-full">Sekundär knapp</Button>
                    <Button variant="outline" className="w-full">Outline knapp</Button>
                    <Button variant="ghost" className="w-full">Ghost knapp</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

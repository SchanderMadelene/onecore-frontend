import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PropertyPage from "./pages/properties/PropertyPage";
import PropertyDetailPage from "./pages/properties/PropertyDetailPage";
import ResidencePage from "./pages/properties/ResidencePage";
import TenantDetailPage from "./pages/tenants/TenantDetailPage";
import AllTenantsPage from "./pages/tenants/AllTenantsPage";
import DesignSystemPage from "./pages/design-system/DesignSystemPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<AllPropertiesPage />} />
            <Route path="/properties/:city/:district" element={<PropertyPage />} />
            <Route path="/properties/:city/:district/:property" element={<PropertyDetailPage />} />
            <Route path="/properties/:city/:district/:property/:id" element={<ResidencePage />} />
            <Route path="/tenants/all" element={<AllTenantsPage />} />
            <Route path="/tenants/detail/:id" element={<TenantDetailPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;

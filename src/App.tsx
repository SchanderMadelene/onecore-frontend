import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FeatureTogglesProvider } from "@/contexts/FeatureTogglesContext";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import Index from "./pages/Index";
import PropertyPage from "./pages/properties/PropertyPage";
import PropertyDetailPage from "./pages/properties/PropertyDetailPage";
import BuildingDetailPage from "./pages/properties/BuildingDetailPage";
import ResidencePage from "./pages/properties/ResidencePage";
import TenantDetailPage from "./pages/tenants/TenantDetailPage";
import AllTenantsPage from "./pages/tenants/AllTenantsPage";
import DesignSystemPage from "./pages/design-system/DesignSystemPage";
import NotFound from "./pages/NotFound";
import AllPropertiesPage from "./pages/properties/AllPropertiesPage";
import RentalsPage from "./pages/rentals/RentalsPage";
import SettingsPage from "./pages/settings/SettingsPage";

const ProtectedRoute = ({ children, isEnabled }: { children: React.ReactNode, isEnabled: boolean }) => {
  if (!isEnabled) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  const { features } = useFeatureToggles();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/properties" element={<AllPropertiesPage />} />
      <Route path="/properties/:property" element={<PropertyDetailPage />} />
      <Route path="/properties/:property/:building" element={<BuildingDetailPage />} />
      <Route path="/properties/:property/:building/:id" element={<ResidencePage />} />
      
      <Route 
        path="/tenants/all" 
        element={
          <ProtectedRoute isEnabled={features.showTenants}>
            <AllTenantsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tenants/detail/:id" 
        element={
          <ProtectedRoute isEnabled={features.showTenants}>
            <TenantDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rentals" 
        element={
          <ProtectedRoute isEnabled={features.showRentals}>
            <RentalsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/design-system" 
        element={
          <ProtectedRoute isEnabled={features.showDesignSystem}>
            <DesignSystemPage />
          </ProtectedRoute>
        } 
      />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <FeatureTogglesProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </FeatureTogglesProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;

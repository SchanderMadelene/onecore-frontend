import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { FeatureTogglesProvider } from "@/contexts/FeatureTogglesContext";
import { HousingOffersProvider } from "@/contexts/HousingOffersContext";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { RoleProvider } from "@/contexts/RoleContext";
import Index from "./pages/Index";
import PropertyDetailPage from "./pages/properties/PropertyDetailPage";
import BuildingDetailPage from "./pages/properties/BuildingDetailPage";
import ResidencePage from "./pages/properties/ResidencePage";
import TenantDetailPage from "./pages/tenants/TenantDetailPage";
import AllTenantsPage from "./pages/tenants/AllTenantsPage";
import DesignSystemPage from "./pages/design-system/DesignSystemPage";
import NotFound from "./pages/NotFound";
import AllPropertiesPage from "./pages/properties/AllPropertiesPage";
import RentalsPage from "./pages/rentals/RentalsPage";
import CreateHousingAdPage from "./pages/rentals/CreateHousingAdPage";
import ParkingSpaceDetailPage from "./pages/rentals/ParkingSpaceDetailPage";
import HousingDetailPage from "./pages/rentals/HousingDetailPage";
import ResidenceProfilePage from "./pages/rentals/ResidenceProfilePage";
import TurnoverPage from "./pages/turnover/TurnoverPage";
import BarriersPage from "./pages/barriers/BarriersPage";
import AllInspectionsPage from "./pages/inspections/AllInspectionsPage";
import SettingsPage from "./pages/settings/SettingsPage";
// Import favorites page
import FavoritesPage from "./pages/favorites/FavoritesPage";

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
        path="/rentals/create-housing-ad" 
        element={
          <ProtectedRoute isEnabled={features.showRentals}>
            <CreateHousingAdPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rentals/parking/:parkingSpaceId" 
        element={
          <ProtectedRoute isEnabled={features.showRentals}>
            <ParkingSpaceDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rentals/housing/:housingId" 
        element={
          <ProtectedRoute isEnabled={features.showRentals}>
            <HousingDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/rentals/residence-profile" 
        element={
          <ProtectedRoute isEnabled={features.showRentals}>
            <ResidenceProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/barriers" 
        element={
          <ProtectedRoute isEnabled={features.showBarriers}>
            <BarriersPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/turnover" 
        element={
          <ProtectedRoute isEnabled={features.showTurnover}>
            <TurnoverPage />
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
      <Route 
        path="/inspections" 
        element={
          <ProtectedRoute isEnabled={features.showAllInspections}>
            <AllInspectionsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/favorites" 
        element={
          <ProtectedRoute isEnabled={features.showFavorites}>
            <FavoritesPage />
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <FeatureTogglesProvider>
            <RoleProvider>
              <HousingOffersProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </HousingOffersProvider>
            </RoleProvider>
          </FeatureTogglesProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
